import { createAction, handleAction } from 'redux-actions';
import * as api from './api.js';

const defaultState = { profile: null };

// export actions
export const getProfile = createAction('getProfile',
  async () => {
    const result = await api.getAllPokemons();
    console.log('result', result);
    return { result };
  },
);

export const populatePokemon = createAction('populatePokemon',
  async () => {
    const result = await api.populatePokemon(
      "Genesis",
      "Greetings, human. I am Genesis. The dogs know me as alpha; the cats know me as omega. To your kind, I am a riddle wrapped in an enigma, first found by a user in Mystery, Alaska. I looked into the void and the void looked back. Then I lost interest. I can 2019t wait to be your new owner!",
      "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/1.png",
      0
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
    const result = await api.getAllPokemons();
    return { result };
  },
);

const reducer = handleAction(
  getProfile,
  async (state, { payload }) => {
    console.log('state', state);
    console.log('payload', payload);
    return state;
  },
  defaultState,
);

// export reducer
export default reducer;
