import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'reactstrap';
import React from 'react';
import styled from 'styled-components';

import Icon from '../modules/common/components/Icon';

const SNav = styled(Nav)`
  border-top: 1px solid #3d9df1;
  background: #278be3;
`;

const SNavItem = styled(NavItem)`
  padding: 2px 20px;
  width: 50%;
  box-sizing: border-box;
  &:first-child {
    border-right: 1px solid #3d9df1;
  }
  .nav-link {
    text-align: center;
    color: white;
  }
`;

const NavBar = () => (
  <div className="gnb">
    <Navbar>
      <SNav>
        <SNavItem>
          <Link to="/" className="nav-link">
            <Icon name="User" />
            <br/>
            Trainer
          </Link>
        </SNavItem>
        <SNavItem>
          <Link to="/catch" className="nav-link">
            <Icon name="Chrome" />
            <br/>
            Catch
          </Link>
        </SNavItem>
      </SNav>
    </Navbar>
  </div>
);

NavBar.propTypes = {
};

export default NavBar;
