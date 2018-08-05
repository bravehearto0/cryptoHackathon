import { createAction, handleAction } from 'redux-actions';

const defaultState = { profile: null };

// export actions
export const getProfile = createAction('getProfile');

const reducer = handleAction(
  getProfile,
  (state, { payload }) => {
    console.log('state', state);
    console.log('payload', payload);
    return state;
  },
  defaultState,
);

// export reducer
export default reducer;
