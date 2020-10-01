import * as Actions from '../actions';

const defaultState = {
  scanning: false,
  showCheckinAnimation: false,
  cameraModalVisible: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.SCAN:
      return { ...state, scanning: true };
    case Actions.FINISH_SCANNING:
      return { ...state, scanning: false };
    case Actions.SHOW_CHECKIN_ANIMATION:
      return { ...state, showCheckinAnimation: true };
    case Actions.HIDE_CHECKIN_ANIMATION:
      return { ...state, showCheckinAnimation: false };
    case Actions.SET_CAMERA_MODAL_VISIBLE:
      return { ...state, cameraModalVisible: action.visible };
    default:
      return state;
  }
};

/*

*/
