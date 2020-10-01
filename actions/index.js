export const LOGIN = 'LOGIN';
export const SCAN = 'SCAN';
export const FINISH_SCANNING = 'FINISH_SCANNING';
export const SHOW_CHECKIN_ANIMATION = 'SHOW_CHECKIN_ANIMATION';
export const HIDE_CHECKIN_ANIMATION = 'HIDE_CHECKIN_ANIMATION';
export const FINISH_LOADING = 'FINISH_LOADING';
export const SET_CAMERA_MODAL_VISIBLE = 'SET_CAMERA_MODAL_VISIBLE';
export const SET_CONTENT_MODAL_VISIBLE = 'SET_CONTENT_MODAL_VISIBLE';
export const GENERATE_QR = 'GENERATE_QR';
export const RESET_QR = 'RESET_QR';

export const login = (email, password) => ({
  type: LOGIN,
  email,
  password,
});

export const setCameraModalVisible = (visible) => ({
  type: SET_CAMERA_MODAL_VISIBLE,
  visible,
});

export const setContentModalVisible = (visible, content) => ({
  type: SET_CONTENT_MODAL_VISIBLE,
  visible,
  content,
});

export const scan = () => ({
  type: SCAN,
});

export const generateQr = () => ({
  type: GENERATE_QR,
});

export const resetQr = () => ({
  type: RESET_QR,
});
