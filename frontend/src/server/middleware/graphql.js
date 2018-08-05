import 'isomorphic-fetch';

import { get } from 'lodash';
import { graphqlExpress } from 'graphql-server-express';

import log from '../../common/log';
import modules from '../modules';
import schema from '../api/schema';

export default graphqlExpress((req) => {
  try {
    return {
      schema,
      context: {
        ...modules.createContext(),
        req,
        user: get(req, 'user'),
      },
    };
  } catch (e) {
    log(e.stack);
  }
});
