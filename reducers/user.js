import * as Actions from '../actions';

const defaultState = {
  token: null,
  userType: null,
  userId: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.UPDATE_AUTH_STATE:
      return {
        ...state, token: action.token, userType: action.userType, userId: action.userId,
      };
    default:
      return state;
  }
};
