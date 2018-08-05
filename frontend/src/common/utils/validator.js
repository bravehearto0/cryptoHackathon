import { isEmpty, isString } from 'lodash';
import Filter from 'bad-words';
import isLength from 'validator/lib/isLength';

const filter = new Filter();
export const hasBadWords = str => filter.isProfane(str);

// common validators
export const isValidString = (value) => {
  // if (hasBadWords(value)) {
  //   return false
  // }
  if (!isString(value)) {
    return false;
  }
  return true;
};

// field specific validators
export const lengthConstrains = {
  name: { min: 2, max: 15 },
  password: { min: 8 },
};

export const isPassword = (name, value) => {
  const passwordConstrains = lengthConstrains.password;
  if (
    !isLength(value, passwordConstrains) ||
    isEmpty(value.match(/[a-z]/)) ||
    isEmpty(value.match(/[A-Z]/))
  ) {
    return `${name} should be minium of 8 characters and including at least a 1 lowercase and uppercase.`;
  }
  if (!isValidString(value)) {
    return `${name} is not valid.`;
  }
  return '';
};

export const isName = (name, value = '') => {
  const nameConstrains = lengthConstrains.name;
  if (!isLength(value, nameConstrains)) {
    return `${name} should be in ${nameConstrains.min} to ${nameConstrains.max} characters.`;
  }
  if (!isValidString(value)) {
    return `${name} is not valid.`;
  }
  return '';
};
