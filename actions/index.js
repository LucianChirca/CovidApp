export const LOGIN = 'LOGIN';
export const SCAN = 'SCAN';

export const login = (email, password) => ({
  type: LOGIN,
  email,
  password,
});
