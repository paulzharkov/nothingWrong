import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import postsReducer from './postsReducer';
import idReducer from './idReducer';
import usersListReducer from './usersListReducer';
import toMePostsReducer from './toMePosts';
import commentsReducer from './commentsReducer';
import { LOGOUT } from '../types/users';
import socketReducer from './socketReducer';
import notifierReducer from './notifierReducer';
import advicesReducer from './advices';
import messageReducer from './messageReducer';
import wrongReducer from './wrongReducer';

const appReducer = combineReducers({
  users: usersReducer,
  myPost: postsReducer,
  toMePost: toMePostsReducer,
  lentaPosts: postsReducer,
  idOne: idReducer,
  usersList: usersListReducer,
  socket: socketReducer,
  comments: commentsReducer,
  notifications: notifierReducer,
  advicesList: advicesReducer,
  messages: messageReducer,
  oneWrong: wrongReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
