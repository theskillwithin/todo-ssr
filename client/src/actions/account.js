import {signIn as _signIn} from '../services/account';

export const signIn = (...args) => {
  return async dispatch => {
    const userData = await _signIn(...args);

    dispatch({type: 'SIGN_IN', payload: userData});
  };
};
