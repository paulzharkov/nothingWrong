import { ADD_ALL_ADVICES } from '../types/advice';

function adviceReducer(state = [], action) {
  switch (action.type) {
    case ADD_ALL_ADVICES:
      return action.payload;

    default:
      return state;
  }
}

export default adviceReducer;
