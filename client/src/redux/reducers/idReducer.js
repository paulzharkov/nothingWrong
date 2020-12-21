import { ADD_ID } from '../types/posts';

function idReducer(state = '', action) {
  switch (action.type) {
    case ADD_ID:
      return action.payload;

    default:
      return state;
  }
}

export default idReducer;
