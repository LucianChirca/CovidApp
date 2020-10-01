import * as Actions from '../actions';

const defaultState = {
  generated: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case Actions.GENERATE_QR:
      return { ...state, generated: true };
    case Actions.RESET_QR:
      return { ...state, generated: false };
    default:
      return state;
  }
};
