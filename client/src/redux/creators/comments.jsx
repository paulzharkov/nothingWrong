import * as TYPES from '../types/comments'

export const createComment = (data) => ({
  type: TYPES.ADD_COMMENT,
  payload: data
})

export const setComments = (commentsList) => ({
  type: TYPES.ADD_ALL_COMMENTS,
  payload: commentsList
})

export const addCommentThunk = ({ text, id }) => async (dispatch) => {
  const response = await fetch(`http://localhost:8000/feed/${id}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text,
    }),
    credentials: 'include'
  })
  const data = await response.json()
  data && dispatch(createComment(data))
};

export const getCommentsThunk = ({ id }) => async (dispatch) => {
  const response = await fetch(`http://localhost:8000/feed/${id}`, {
    credentials: "include"
  })
  const commentsList = await response.json()
  if (commentsList) {
    dispatch(setComments(commentsList))
  }
}
