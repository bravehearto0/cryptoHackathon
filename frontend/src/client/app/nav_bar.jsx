import { Container, Row, Navbar, Nav, NavItem } from 'reactstrap';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import modules from '../modules';

const NavBar = ({ isNavVisible, handleClickNavBar, handleClickNavBarMenu }) => (
  <Navbar light>
    <Container fluid={true}>
      <Row className="align-items-center">
        <a className="sidebar-toggle" href="#" onClick={handleClickNavBarMenu}>
          <span className="navbar-toggler-icon"></span>
        </a>
        {
          isNavVisible &&
            <Nav>
              {modules.navItems.map(navItem =>
                React.cloneElement(navItem, { onClick: handleClickNavBar})
              )}
            </Nav>
        }
        {false && (!__PERSIST_GQL__ || __DEV__) && <Nav className="ml-auto" navbar>
          <NavItem>
            <a href="/graphiql">GraphiQL</a>
          </NavItem>
        </Nav>}
      </Row>
    </Container>
  </Navbar>
);

NavBar.propTypes = {
  handleClickNavBar: PropTypes.func,
  handleClickNavBarMenu: PropTypes.func,
  isNavVisible: PropTypes.bool,
};

export default NavBar;
