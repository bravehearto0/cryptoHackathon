import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import TankSidebar from '../modules/tank/SideBar';
import HomeSidebar from '../modules/home/HomeSideBar';
import ProfileSidebar from '../modules/auth/components/Sidebar';

const SideBar = () => (
  <div className="sidebar-content">
    <div>
      <ProfileSidebar style={{ marginBottom: '14px' }}/>
      <HomeSidebar/>
      <TankSidebar/>
    </div>
  </div>
);

SideBar.propTypes = {
  sidebarOpen: PropTypes.bool,
};

export default withRouter(connect(
  state => ({
    sidebarOpen: state.sidebarOpen,
  }),
)(SideBar));
