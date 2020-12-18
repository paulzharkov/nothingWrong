import { ADD_POST, LOGOUT_POSTS } from '../types/posts';

function postsReducer(state = [], action) {
  switch (action.type) {
    case ADD_POST:
      return [...state, action.payload];

    default:
      return state;
  }
}

export default postsReducer;
