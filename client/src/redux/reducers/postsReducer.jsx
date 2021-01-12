import * as AC from '../types/posts';

function postsReducer(state = [], action) {
  switch (action.type) {
    case AC.ADD_POST:
      return [...state, action.payload];

    case AC.ADD_ALL:
      return action.payload;

    case AC.ADD_ALL_LENTA:
      return action.payload;

    case AC.DELETE:
      return state.filter(el => el._id !== action.payload);

    case AC.LIKE:
      return state.map((el) => {
        if (el._id === action.payload.id) {
          return {
            ...el, likes: [...el.likes, action.payload.login]
          }
        } else {
          return el
        }
      });

    case AC.DISLIKE:
      return state.map((el) => {
        if (el._id === action.payload.id) {
          return {
            ...el, likes: [...el.likes.filter((el) => el !== action.payload.login)]
          }
        } else {
          return el
        }
      });
    default:
      return state;
  }
}

export default postsReducer;
