export const LOGIN = 'LOGIN';
export const SCAN = 'SCAN';
export const FINISH_LOADING = 'FINISH_LOADING';
export const SET_MODAL_VISIBLE = 'SET_MODAL_VISIBLE';
export const RESET_SCANNER = 'RESET_SCANNER';

export const login = (email, password) => ({
  type: LOGIN,
  email,
  password,
});

export const setModalVisible = (visible) => ({
  type: SET_MODAL_VISIBLE,
  visible,
});

export const scan = (successful) => ({
  type: SCAN,
  successful,
});
