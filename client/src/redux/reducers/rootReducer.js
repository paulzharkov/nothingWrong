import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import postsReducer from './postsReducer';
import idReducer from './idReducer';
import usersListReducer from './usersListReducer';
import commentsReducer from './commentsReducer';
import { LOGOUT } from '../types/users';
import socketReducer from './socketReducer';

const appReducer = combineReducers({
  users: usersReducer,
  myPost: postsReducer,
  toMePost: postsReducer,
  lentaPosts: postsReducer,
  idOne: idReducer,
  usersList: usersListReducer,
<<<<<<< HEAD
  socket: socketReducer,
=======
  comments: commentsReducer,
>>>>>>> 48ee2b764bc16f6271b6b31468cfb619c6a5fd62
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
