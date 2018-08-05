import React from 'react';
import { Route } from 'react-router-dom';

import Post from './containers/Post';
import PostEdit from './containers/PostEdit';
import PostAdd from './containers/PostAdd';
import resources from './locales';
import resolvers from './resolvers';
import Feature from '../connector';

export default new Feature({
  route: [
    <Route exact path="/posts" component={Post} />,
    <Route exact path="/post/new" component={PostAdd} />,
    <Route path="/post/:id" component={PostEdit} />
  ],
  resolver: resolvers,
  localization: { ns: 'post', resources }
});
