import './Home.scss';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

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
