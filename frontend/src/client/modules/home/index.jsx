import React from 'react';
import { Route } from 'react-router-dom';

import './containers/Home.scss';
import Home from './containers/Home';
import Catch from './containers/Catch';
import Admin from './containers/Admin';
import reducer from './reducer';

import Feature from '../connector';

export default new Feature({
  route: [
    <Route exact path="/" component={Home}/>,
    <Route exact path="/catch" component={Catch}/>,
    <Route exact path="/admin" component={Admin}/>,
  ],
  reducer: { profile: reducer },
});
