import { combineReducers } from 'redux';
import user from './user';
import main from './main';
import scanner from './scanner';

export default combineReducers({
  user,
  main,
  scanner,
});
