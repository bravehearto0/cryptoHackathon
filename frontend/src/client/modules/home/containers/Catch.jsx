import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import ProgressButton from 'react-progress-button';

import {getProfile} from '../reducer.js';

const Wrapper = styled.div`
  height: 93vw;
  padding: 30vw 4vw;
`;

class Catch extends React.Component {
  static propTypes = {
    getProfile: PropTypes.func,
  };

  state = {
    buttonState: '',
  };

  componentDidMount() {
    // this.props.getProfile();
  }

  render() {
    return (
      <Wrapper>
        <ProgressButton
          onClick={() => {
            this.setState({buttonState: 'loading'});
          }}
          state={this.state.buttonState}
        >
          Find some pokemons!
        </ProgressButton>
      </Wrapper>
    );
  }
}

export default connect(
  state => ({
    newProp: state.newProp,
  }),
  {
    getProfile,
  },
)(Catch);
