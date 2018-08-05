import { defaultsDeep } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { colors } from '../../../styles/styled';

const defaultProps = {
  style: {
    marginRight: '9px',
    verticalAlign: 'middle',
    color: colors.b3,
    opacity: 0.7,
  },
};

export default class GIcon extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
  };

  render() {
    const extendedProps = defaultsDeep({}, this.props, defaultProps);
    const {
      icon,
      ...props
    } = extendedProps;

    return <i className={`gicons gicons-${icon}`} {...props}>{icon}</i>;
  }
}
