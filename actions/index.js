/*
  Main
 */
export const FINISH_LOADING = 'FINISH_LOADING';
export const UPDATE_ONBOARDING = 'UPDATE_ONBOARDING';

/*
  Scanning
 */

export const UPDATE_SCAN = 'UPDATE_SCAN';
export const UPDATE_CHECKIN_ANIMATION = 'UPDATE_CHECKIN_ANIMATION';
export const GENERATE_QR = 'GENERATE_QR';
export const RESET_QR = 'RESET_QR';

/*
   Modals
  */

export const SET_CAMERA_MODAL_VISIBLE = 'SET_CAMERA_MODAL_VISIBLE';
export const SET_CONTENT_MODAL_VISIBLE = 'SET_CONTENT_MODAL_VISIBLE';

/*
  Login
*/
export const UPDATE_AUTH_STATE = 'UPDATE_AUTH_STATE';

export const updateAuthState = (token, userType, userId) => ({
  type: UPDATE_AUTH_STATE,
  token,
  userType,
  userId,
});

export const updateOnboarding = (newValue) => ({
  type: UPDATE_ONBOARDING,
  newValue,
});

export const login = (email, password) => ({
  type: LOGIN,
  email,
  password,
});

export const setCameraModalVisible = (visible) => ({
  type: SET_CAMERA_MODAL_VISIBLE,
  visible,
});

export const setContentModalVisible = (visible = false, content = null, canClose = true) => ({
  type: SET_CONTENT_MODAL_VISIBLE,
  visible,
  content,
  canClose,
});

export const updateScan = (newValue) => ({
  type: UPDATE_SCAN,
  newValue,
});

export const updateCheckinAnimation = (newValue) => ({
  type: UPDATE_CHECKIN_ANIMATION,
  newValue,
});

export const generateQr = () => ({
  type: GENERATE_QR,
});

export const resetQr = () => ({
  type: RESET_QR,
});
