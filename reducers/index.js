import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import user from './user';
import main from './main';
import scanner from './scanner';
import generator from './generator';

export default combineReducers({
  user,
  main,
  scanner,
  generator,
  form: formReducer,
});
