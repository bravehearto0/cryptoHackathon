import { pickBy, get } from 'lodash';

import { app as settings } from './app.json';

const envSettings = Object.assign(
  {},
  pickBy(settings, (v, k) => k !== 'env'),
  get(settings, "env." + process.env.NODE_ENV)
);

export default envSettings;
