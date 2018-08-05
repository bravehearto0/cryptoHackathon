import { get, trim } from 'lodash';

export const defaultFormat = v => trim(v);

export const getError = (props, name) => {
  if (get(props.formMeta, name)) {
    return get(props.formError, name) || '';
  }
  return '';
};
