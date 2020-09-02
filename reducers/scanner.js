import * as Actions from '../actions';

const defaultState = {
  scanned: false,
  successful: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.SCAN:
      return { ...state, scanned: true, successful: action.successful };
    case Actions.RESET_SCANNER:
      return { ...state, scanned: false, successful: false };
    default:
      return state;
  }
};
