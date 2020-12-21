import { ADD_ALL_USERS, SUBSCRIBE } from '../types/usersList';

function usersListReducer(state = [], action) {
  switch (action.type) {

    case ADD_ALL_USERS:
      return action.payload;

    case SUBSCRIBE:
      return state.map((el) => {
        if (el._id === action.payload.id) {
          return {
            ...el,
            subscribers: [...el.subscribers, action.payload.login]
          }
        }
        return el
      })

    default:
      return state;
  }
}

export default usersListReducer;
