import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line
import samplePokemon from '!file-loader!../assets/sample-pokemon.jpg';
import pokemons from './pokemon-sample.js';

const Wrapper = styled.ul`
  width: 100%;
`;

const Pokemon = styled.li`
  width: 50%;
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
  padding: 5px 10px;
  font-size: 5vw;

  img {
    margin: 0 auto;
    display: block;
    max-width: 90%;
  }
`;

class Pokemons extends React.Component {
  static propTypes = {
    newProp: PropTypes.string,
  };

  render() {
    return (
      <Wrapper>
        {
          pokemons.map((pokemon, idx) => (
            <Pokemon key={idx}>
              <img src={samplePokemon} />
              {pokemon.name}
            </Pokemon>
          ))
        }
      </Wrapper>
    );
  }
}

export default connect(
  state => ({
    newProp: state.newProp,
  }),
)(Pokemons);
