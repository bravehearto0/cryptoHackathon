import PropTypes from 'prop-types';
import React from 'react';

import NavBar from './nav_bar';
import Routes from './routes';

class App extends React.Component {
  state = {
    isScrollTop: true,
  }

  static propTypes = {
    location: PropTypes.object,
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
    const theme = 'light';
    const stateClasses = ['app-wrap', theme];

    if (!this.state.isScrollTop) stateClasses.push('scroll-down');
    else stateClasses.push('scroll-top');

    return (
      <div className={stateClasses.join(' ')}>
        <div className="wrapper">
          <div className="full-size">{Routes}</div>
        </div>
        <NavBar/>
      </div>
    );
  }
}
export default App;
