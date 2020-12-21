import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import postsReducer from './postsReducer';
import idReducer from './idReducer';
import usersListReducer from './usersListReducer';
import { LOGOUT } from '../types/users';

const appReducer = combineReducers({
  users: usersReducer,
  myPost: postsReducer,
  toMePost: postsReducer,
  idOne: idReducer,
  usersList: usersListReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
