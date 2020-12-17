import { ADD_USERS_COOKIE } from '../types/types';

function usersReducer(state = [], action) {
  switch (action.type) {
    case ADD_USERS_COOKIE:
      return action.payload;

    default:
      return state;
  }
}

export default usersReducer;
