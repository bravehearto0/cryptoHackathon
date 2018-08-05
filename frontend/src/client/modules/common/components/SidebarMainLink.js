import { NavLink } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import { colors, sidebar } from '../../../styles/styled';
import Icon from './Icon';

const PureSidebarIcon = (props) =>
  <Icon {...props} style={{}} />;

export const SidebarIcon = styled(PureSidebarIcon)`
  width: 18px;
  margin-right: 20px;
  vertical-align: -5px;
`;

export default styled(NavLink)`
  cursor: pointer;
  display: block;
  color: ${colors.darkGray};
  font-size: 1.2em;
  padding: 10px ${sidebar.paddingLeft};

  :hover {
    background: ${colors.blurGray};
  }
  .icon {
    color: ${colors.darkGray};
  }

  &.active {
    font-weight: bold;
    background: white;
    .icon {
      color: ${colors.b3};
    }
  }
`;
