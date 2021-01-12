import { ADD_ALL_MESSAGES } from '../types/messages';

function messageReducer(state = [], action) {
  switch (action.type) {
    case ADD_ALL_MESSAGES:
      return action.payload;

    default:
      return state;
  }
}

export default messageReducer;
