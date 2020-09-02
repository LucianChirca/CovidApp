import * as Actions from '../actions';

const defaultState = {
  loggedIn: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.LOGIN:
      return { ...state, loggedIn: true };
    default:
      return state;
  }
};
