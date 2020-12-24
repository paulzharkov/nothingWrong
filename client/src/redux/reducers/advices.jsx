import { ADD_ALL_ADVICES } from '../types/advices';

function advicesReducer(state = [], action) {
  switch (action.type) {
    case ADD_ALL_ADVICES:
      return action.payload;

    default:
      return state;
  }
}

export default advicesReducer;
