import * as AC from '../types/posts';

function toMePostsReducer(state = [], action) {
  switch (action.type) {
    case AC.ADD_ON_ME_ALL:
      return action.payload;

    case AC.LIKE:
      console.log(2,state);
      return state.map((el) => {
        if (el._id === action.payload.id) {
          return {
            ...el, likes: [...el.likes, action.payload.login]
          }
        } else {
          return el
        }
      });
    default:
      return state;
  }
}

export default toMePostsReducer;
