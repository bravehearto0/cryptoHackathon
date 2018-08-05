import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import * as actions from '../reducer.js';

const Wrapper = styled.div`
  padding: 20px;
`;

class Catch extends React.Component {
  static propTypes = {
    populatePokemon: PropTypes.func,
    releasePokemon: PropTypes.func,
    getAllPokemons: PropTypes.func,
  };

  state = {
  };

  componentDidMount() {
    // this.props.getProfile();
  }

  render() {
    return (
      <Wrapper>
        <Button
          onClick={() => {
            this.props.populatePokemon();
          }}
        >
          Populate Pokemons
        </Button>
        {' '}
        <Button
          onClick={() => {
            this.props.releasePokemon();
          }}
        >
          Release pokemons
        </Button>
        {' '}
        <Button
          onClick={() => {
            this.props.getAllPokemons();
          }}
        >
          Get all pokemons
        </Button>
      </Wrapper>
    );
  }
}

export default connect(
  state => ({
    newProp: state.newProp,
  }),
  actions,
)(Catch);
