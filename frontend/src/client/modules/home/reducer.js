import { createAction, handleAction } from 'redux-actions';
import * as api from './api.js';

const defaultState = { pokemons: null };

// export actions
export const getProfile = createAction('getProfile',
  async () => {
    const result = await api.getAllPokemons();
    return { result };
  },
);

export const populatePokemon = createAction('populatePokemon',
  async () => {
    const result = await api.populatePokemon(
      'Genesis',
      'Greetings',
      'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/1.png',
      '0'
    );
    return { result };
  },
);

export const releasePokemon = createAction('releasePokemon',
  async () => {
    const result = await api.releasePokemon();
    return { result };
  },
);

export const getAllPokemons = createAction('getAllPokemons',
  async () => {
    const pokemons = await api.getAllPokemons();
    console.log('pokemons', pokemons);
    return { pokemons };
  },
);

const reducer = handleAction(
  getAllPokemons,
  (state, { payload }) => {
    return { pokemons: payload};
  },
  defaultState,
);

// export reducer
export default reducer;
