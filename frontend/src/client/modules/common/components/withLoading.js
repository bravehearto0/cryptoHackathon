import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import Loading from './Loading';

export default (Component) => {
  const withLoading = (props) => {
    if (props.loading || get(props, 'data.loading')) {
      return <Loading />;
    }

    return <Component {...props} />;
  };

  withLoading.propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.object,
  };

  return withLoading;
};
