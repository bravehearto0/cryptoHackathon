import { createAction, handleAction } from 'redux-actions';
import * as api from './api.js';

const defaultState = { profile: null };

// export actions
export const getProfile = createAction('getProfile');

const reducer = handleAction(
  getProfile,
  async (state, { payload }) => {
    const result = await api.getAllPokemons();
    console.log('state', state);
    console.log('payload', payload);
    console.log('result', result);
    return state;
  },
  defaultState,
);

// export reducer
export default reducer;
