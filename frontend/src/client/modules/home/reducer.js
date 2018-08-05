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
