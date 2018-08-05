import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as icons from 'react-feather';

import { colors } from '../../../styles/styled';

const defaultStyle = {
  marginRight: '9px',
  verticalAlign: 'middle',
  color: colors.b3,
  opacity: 0.7,
};

export default class Icon extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
  };

  render() {
    const {
      name,
      style = defaultStyle,
      className = '',
      ...props
    } = this.props;

    const Icon = icons[name];

    return <Icon className={`${className} icon icon-${name}`} style={style} {...props}/>;
  }
}
