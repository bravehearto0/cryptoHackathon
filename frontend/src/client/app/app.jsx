import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Waypoint from 'react-waypoint';

import Footer from '../modules/common/components/Footer';
import NavBar from './nav_bar';
import Routes from './routes';
import ScrollToTop from '../modules/common/components/ScrollToTop';

const THROTTLE_TIME = 300;
const topNavVisibleTrhd = 400;

class App extends React.Component {
  state = {
    init: false,
    handleResize: throttle(this.handleResize.bind(this), THROTTLE_TIME),
    isScrollTop: true,
  }

  static propTypes = {
    sidebarOpen: PropTypes.bool,
    location: PropTypes.object,
  }

  handleResize() {
    if (!window) return;

    this.setState({
      width: window.innerWidth,
    });
  }

  componentDidMount() {
    if (!window) return;
    this.setState({ init: true });
    this.handleResize();
    window.addEventListener('resize', this.state.handleResize);
  }

  componentWillUnmount() {
    if (!window) return;
    window.removeEventListener('resize', this.state.handleResize);
  }

  handleWaypointEnter() {
    this.setState({
      isScrollTop: true,
    });
  }

  handleWaypointLeave() {
    this.setState({
      isScrollTop: false,
    });
  }

  render() {
    const { sidebarOpen, location: { pathname } } = this.props;
    const homes = ['/', '/home/tanks'];
    const isHome = !!homes.find(l => l === pathname);
    const theme = isHome ? 'dark' : 'light';

    const stateClasses = ['app-wrap', theme];
    if (isHome) stateClasses.push('home-page');
    if (sidebarOpen) stateClasses.push('sidebar-open');
    else stateClasses.push('sidebar-close');
    if (!this.state.isScrollTop) stateClasses.push('scroll-down');
    else stateClasses.push('scroll-top');

    return (
      <div className={stateClasses.join(' ')}>
        <header className='gnb'>
          <NavBar
            isNavVisible={this.state.width > topNavVisibleTrhd}
            handleClickNavBarMenu={(e) => {
              e.preventDefault();
              this.props.toggleSidebar();
            }}
          />
        </header>
        <Route exact path={`(${homes.join('|')})`}>
          {({ match }) => (match ?  <div className="header-overlay"/> : null)}
        </Route>
        <Waypoint
          onEnter={() => this.handleWaypointEnter()}
          onLeave={() => this.handleWaypointLeave()}
          onPositionChange={(arg) => {
            if (arg.currentPosition === 'above') {
              this.handleWaypointLeave();
            }
          }}
        />
        <div className="wrapper">
          <div onClick={() => {
          }}>
          <ScrollToTop>
            {
              isHome ? (
                <div className="full-size">{Routes}</div>
              ) : (
                <div className="content">
                  <div id="content">
                    {Routes}
                  </div>
                </div>
              )
            }
          </ScrollToTop>
        </div>
        <Footer />
      </div>
    </div>
    );
  }
}
export default connect(
  (state) => ({
    sidebarOpen: state.sidebarOpen,
  }),
  {
  }
)(App);
