import * as Actions from '../actions';

const defaultState = {
  finishedLoading: false,
  modalVisible: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.FINISH_LOADING:
      return { ...state, finishedLoading: true };
    case Actions.SET_MODAL_VISIBLE:
      return { ...state, modalVisible: action.visible };
    default:
      return state;
  }
};
