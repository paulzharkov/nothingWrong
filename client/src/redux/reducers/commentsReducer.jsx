import { ADD_COMMENT, ADD_ALL_COMMENTS } from '../types/comments';

function commentsReducer(state = [], action) {
  switch (action.type) {
    case ADD_COMMENT:
      return [...state, action.payload];

    case ADD_ALL_COMMENTS:
      return action.payload;

    default:
      return state;
  }
}

export default commentsReducer;
