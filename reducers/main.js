import Constants from 'expo-constants';
import * as Actions from '../actions';

const defaultState = {
  finishedLoading: false,
  deviceId: Constants.installationId,
  contentModalVisible: false,
  modalContent: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.FINISH_LOADING:
      return { ...state, finishedLoading: true };
    case Actions.SET_CONTENT_MODAL_VISIBLE:
      return {
        ...state,
        contentModalVisible: action.visible,
        modalContent: action.content,
      };
    default:
      return state;
  }
};
