import { trim } from 'lodash';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isLength';
import isNumericV from 'validator/lib/isNumeric';

const valid = (value) => trim(value);

export const isNumeric = value =>
  valid(value) && isNumericV(`${value}`);

export const required = value =>
  valid(value) && !isEmpty(trim(value));

export const maxLength = max => value =>
  valid(value) && isLength(trim(value), { max });

export const minLength = min => value =>
  valid(value) && isLength(trim(value), { min });

export const inLength = (min, max) => value =>
  valid(value) && isLength(trim(value), { min, max });

export const inLengthMsg = (min, max) =>
  `Must be in between ${min} and ${max} characters.`;
