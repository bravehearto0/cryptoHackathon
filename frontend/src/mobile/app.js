import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ApolloClient from 'apollo-client';

const client = new ApolloClient();
const store = createStore(
  combineReducers({
    apollo: client.reducer(),

    // ...modules.reducers,
  }),
  {}, // initial state
  composeWithDevTools(
    applyMiddleware(client.middleware()),
  ),
);

export default class Main extends Component {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
      </ApolloProvider>
    );
  }
}
