import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';

import './Home.scss';

class Home extends React.Component {
  static propTypes = {
    newProp: PropTypes.string,
  };

  render() {
    return (
      <div>
        home
      </div>
    );
  }
}

export default connect(
  state => ({
    newProp: state.newProp,
  }),
)(Home);
