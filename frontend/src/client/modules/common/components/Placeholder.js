import React from 'react';
import PropTypes from 'prop-types';

const Placeholder = ({src, ...props}) =>
  <img style={{ opacity: 0.1 }} {...props} src={src} />;

Placeholder.propTypes = {
  src: PropTypes.string,
};

export default Placeholder;
