import { get } from 'lodash';

export const authBy = {
  google: 'google',
  facebook: 'facebook',
  email: 'email',
};

export const getUserFromGQContext = context =>
  get(context, 'req.user');
