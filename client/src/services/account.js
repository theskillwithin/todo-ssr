import http from '../util/HttpRequest';

export const signIn = (email, password) => {
  return http.post('signin', {email, password});
};

export const signOut = () => {
  return http.post('signout');
};

export const signUp = (email, firstName, lastName, password) => {
  return http.post('signup', {email, firstName, lastName, password});
};
