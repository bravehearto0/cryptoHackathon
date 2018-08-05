import React from 'react';

import SidebarMainLink, {
  SidebarIcon,
} from '../common/components/SidebarMainLink';

class HomeSideBar extends React.Component {
  render() {
    return (
      <SidebarMainLink
        to="/"
        exact={true}
        activeClassName="active"
      >
        <SidebarIcon name="Home"/>
        Home
      </SidebarMainLink>
    );
  }
}

export default HomeSideBar;
