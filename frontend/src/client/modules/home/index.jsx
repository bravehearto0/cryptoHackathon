import React from 'react';
import { Route } from 'react-router-dom';

import Home from './containers/Home';
// import reducers from './reducers';

import Feature from '../connector';

const homes = ['/', '/home/.*'];

export default new Feature({
  route: [
    <Route exact path={`(${homes.join('|')})`} component={Home}/>,
  ],
});
