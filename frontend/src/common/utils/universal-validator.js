import { get, keys } from 'lodash';

import * as validators from './validators';

const getValidatorSchema = name => get(validators, name);

// Server side validator
// apply validators to mongoose schema
export const applyValidator = (schema, schemaName) => {
  const validatorSchema = getValidatorSchema(schemaName);
  if (!validatorSchema) {
    return schema;
  }
  keys(validatorSchema).forEach(fieldKey => {
    const fieldRule = validatorSchema[fieldKey];
    const schemaField = schema.path(fieldKey);

    fieldRule.validators.forEach(v => {
      schemaField.validate(v.validator, v.message(fieldRule));
    });
  });

  return schema;
};

// client side validator for redux-form
export const getReduxFormValidator = schemaName => {
  const validatorSchema = getValidatorSchema(schemaName);
  if (!validatorSchema) {
    return () => ({});
  }

  // validator
  return values => {
    const paths = keys(validatorSchema);
    const errors = {};

    paths.forEach(path => {
      const fieldRule = validatorSchema[path];
      if (!fieldRule) {
        return;
      }

      const fieldValidators = fieldRule.validators;
      fieldValidators.forEach(v => {
        if (!v.validator(get(values, path))) {
          errors[path] = v.message(fieldRule);
        }
      });
    });

    return errors;
  };
};
