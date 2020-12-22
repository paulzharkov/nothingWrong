import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import postsReducer from './postsReducer';
import idReducer from './idReducer';
import usersListReducer from './usersListReducer';
import commentsReducer from './commentsReducer';
import { LOGOUT } from '../types/users';

const appReducer = combineReducers({
  users: usersReducer,
  myPost: postsReducer,
  toMePost: postsReducer,
  lentaPosts: postsReducer,
  idOne: idReducer,
  usersList: usersListReducer,
  comments: commentsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
