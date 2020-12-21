import { ADD_ALL_USERS, SUBSCRIBE, ADD_FOLLOWERS_USERS, UNSUBSCRIBE } from '../types/usersList';

function usersListReducer(state = [], action) {
  switch (action.type) {

    case ADD_ALL_USERS:
      return action.payload;

    case ADD_FOLLOWERS_USERS:
      return action.payload;

    case SUBSCRIBE:
      return state.filter((el) => el._id !== action.payload);

    case UNSUBSCRIBE:
      return state.filter((el) => el._id !== action.payload);

    default:
      return state;
  }
}

export default usersListReducer;
