import { GET_WRONG } from '../types/posts';

function wrongReducer(state = {}, action) {
  switch (action.type) {

    case GET_WRONG:
      return action.payload;

    default:
      return state;
  }
}

export default wrongReducer;
