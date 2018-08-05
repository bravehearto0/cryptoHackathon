import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import translate from '../../i18n';

import PaginationDemo from './containers/PaginationDemo.web';
import resources from './locales';
import Feature from '../connector';

export default new Feature({
  route: [<Route exact path="/pagination" component={PaginationDemo} />],
  localization: { ns: 'pagination', resources }
});
