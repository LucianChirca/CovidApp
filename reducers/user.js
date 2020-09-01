import * as Actions from '../actions';

const defaultState = {
  loggedIn: false,
  scanned: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.LOGIN:
      return { ...state, loggedIn: true };
    case Actions.SCAN:
      return { ...state, scanned: true };
    default:
      return state;
  }
};
