import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import postsReducer from './postsReducer';
import idReducer from './idReducer';
import usersListReducer from './usersListReducer';
import toMePostsReducer from './toMePosts';
import commentsReducer from './commentsReducer';
import { LOGOUT } from '../types/users';
import socketReducer from './socketReducer';

const appReducer = combineReducers({
  users: usersReducer,
  myPost: postsReducer,
  toMePost: toMePostsReducer,
  lentaPosts: postsReducer,
  idOne: idReducer,
  usersList: usersListReducer,
  comments: commentsReducer,
  socket: socketReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
