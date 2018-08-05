import React from 'react';
import { Route } from 'react-router-dom';

import './containers/Home.scss';
import Home from './containers/Home';
import reducer from './reducer';

import Feature from '../connector';

export default new Feature({
  route: [
    <Route exact path="/" component={Home}/>,
  ],
  reducer: { profile: reducer },
});
