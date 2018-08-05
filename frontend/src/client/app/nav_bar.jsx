import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'reactstrap';
import React from 'react';
import styled from 'styled-components';

const SNavItem = styled(NavItem)`
  padding: 20px;
`;

const NavBar = () => (
  <div className="gnb">
    <Navbar>
      <Nav>
        <SNavItem>
          <Link to="/" className="nav-link">Profile</Link>
        </SNavItem>
        <SNavItem>
          <Link to="/catch" className="nav-link">Catch</Link>
        </SNavItem>
      </Nav>
    </Navbar>
  </div>
);

NavBar.propTypes = {
};

export default NavBar;
