import { endsWith } from 'lodash';

export const resetPasswordPath = '/change-password/';
export const emailVerifyPath = '/verify-email/';

export const removeTrailingSlash = (url) =>
  endsWith(url, '/') ? url.slice(0, -1) : url;

