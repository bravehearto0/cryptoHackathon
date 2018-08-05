import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'reactstrap';
import React from 'react';

const NavBar = () => (
  <Navbar light>
    <Nav>
      <NavItem>
        <Link to="/" className="nav-link">Profile</Link>
      </NavItem>
      <NavItem>
        <Link to="/catch" className="nav-link">Catch</Link>
      </NavItem>
    </Nav>
  </Navbar>
);

NavBar.propTypes = {
};

export default NavBar;
