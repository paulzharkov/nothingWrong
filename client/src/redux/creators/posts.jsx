import * as TYPES from '../types/posts'


export const createPost = (data) => ({
  type: TYPES.ADD_POST,
  payload: data
})

export const createPostThunk = ({ category,
  reason,
  solve,
  offender,
  rating,
  state }) => async (dispatch) => {
    const response = await fetch('http://localhost:8000/wrong', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        category,
        reason,
        solve,
        offender,
        rating,
        state
      }),
      credentials: 'include'
    })
    const data = await response.json()

    data && dispatch(createPost(data))
  };



