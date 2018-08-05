import React from 'react';
import { Container, Navbar, Nav } from 'reactstrap';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { MenuItem } from '../../../../../../modules/common/components/web';

const SNavbar = styled.div`
  box-shadow: 0 14px 10px -6px rgba(0,0,0,0.5), 0 22px 32px 22px rgba(0,0,0,0.5);
  position: fixed;
  bottom: 0;
  background: #4da8d5;
  width: 100%;
  color: white;
`;

const NavBar = () => (
  <SNavbar>
    <Navbar color="faded" light>
      <Container>
        <Nav>
          <MenuItem key="/">
            <NavLink to="/" exact className="nav-link" activeClassName="active">
              Profile
            </NavLink>
          </MenuItem>
          <MenuItem key="/catch">
            <NavLink to="/catch" className="nav-link" activeClassName="active">
              Catch
            </NavLink>
          </MenuItem>
        </Nav>
      </Container>
    </Navbar>
  </SNavbar>
);

export default NavBar;
