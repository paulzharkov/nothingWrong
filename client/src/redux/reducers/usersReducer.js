import { ADD_USERS_LOGIN } from '../types/users';

function usersReducer(state = '', action) {
  switch (action.type) {
    case ADD_USERS_LOGIN:
      return action.payload;

    default:
      return state;
  }
}

export default usersReducer;
