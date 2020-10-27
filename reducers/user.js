/**
 * @Author: Lucian Chirca <Zombarian>
 * @Date:   2020-09-01T13:34:43+03:00
 * @Last modified by:   Zombarian
 * @Last modified time: 2020-10-22T15:49:16+03:00
 */

import * as Actions from '../actions';

const defaultState = {
  token: null,
  userId: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.UPDATE_AUTH_STATE:
      return {
        ...state, token: action.token, userId: action.userId,
      };
    default:
      return state;
  }
};
