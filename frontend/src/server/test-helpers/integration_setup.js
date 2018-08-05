import chai from 'chai';
import chaiHttp from 'chai-http';
import { ApolloClient } from 'apollo-client';

chai.use(chaiHttp);
chai.should();

var server;
var apollo;

before(async () => {
  server = require('../api_server').default;
  apollo = new ApolloClient();
});

after(() => {
  if (server) {
    server.close();
  }
});

export const getServer = () => server;
export const getApollo = () => apollo;
