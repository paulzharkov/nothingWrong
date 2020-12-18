import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import postsReducer from './postsReducer';
import { LOGOUT } from '../types/users';

const appReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
