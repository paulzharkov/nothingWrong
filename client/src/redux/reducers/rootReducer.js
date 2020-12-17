import { combineReducers } from 'redux';
import catReducer from './catReducer';
import dogReducer from './dogReducer';
import textReducer from './usersReducer';

const rootReducer = combineReducers({
  users: usersRe
});

export default rootReducer;
