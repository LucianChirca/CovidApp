import * as Actions from '../actions';

const defaultState = {
  scanning: false,
  showCheckinAnimation: false,
  cameraModalVisible: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.UPDATE_SCAN:
      return { ...state, scanning: action.newValue };
    case Actions.UPDATE_CHECKIN_ANIMATION:
      return { ...state, showCheckinAnimation: action.newValue };
    case Actions.SET_CAMERA_MODAL_VISIBLE:
      return { ...state, cameraModalVisible: action.visible };
    default:
      return state;
  }
};

/*

*/
