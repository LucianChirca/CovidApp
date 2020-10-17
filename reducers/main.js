import * as Actions from '../actions';

const defaultState = {
  showOnboarding: true,
  finishedLoading: false,
  contentModalVisible: false,
  modalContent: null,
  canCloseModalContent: true,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.FINISH_LOADING:
      return { ...state, finishedLoading: true };
    case Actions.UPDATE_ONBOARDING:
      return { ...state, showOnboarding: action.newValue };
    case Actions.SET_CONTENT_MODAL_VISIBLE:
      return {
        ...state,
        contentModalVisible: action.visible,
        modalContent: action.content,
        canCloseModalContent: action.canClose,
      };
    default:
      return state;
  }
};
