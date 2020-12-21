import * as TYPES from '../types/posts'


export const createPost = (data) => ({
  type: TYPES.ADD_POST,
  payload: data
})

export const setPosts = (postsList) => ({
  type: TYPES.ADD_ALL,
  payload: postsList

})

export const setLentaPosts = (postsList) => ({
  type: TYPES.ADD_ALL_LENTA,
  payload: postsList

})

export const setOnMePosts = (postsList) => ({
  type: TYPES.ADD_ON_ME_ALL,
  payload: postsList
})

export const deletePost = (id) => ({
  type: TYPES.DELETE,
  payload: id
})

export const addId = (id) => ({
  type: TYPES.ADD_ID,
  payload: id
})

export const getLentaPostsThunk = () => async (dispatch) => {
  const response = await fetch('http://localhost:8000/lenta', {
    credentials: "include"
  })
  const postsList = await response.json()
  if (postsList) {
    dispatch(setLentaPosts(postsList))
  }
}

export const getAllMyPostsThunk = () => async (dispatch) => {
  const response = await fetch('http://localhost:8000/lk', {
    credentials: "include"
  })
  const postsList = await response.json()
  if (postsList) {
    dispatch(setPosts(postsList.userPosts))
  }
}

export const getAllToMePostsThunk = () => async (dispatch) => {
  const response = await fetch('http://localhost:8000/lk', {
    credentials: "include"
  })
  const postsList = await response.json()
  if (postsList) {
    dispatch(setOnMePosts(postsList.toMeWrongs))
  }
}



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

export const deletePostThunk = (id) => (dispatch) => {
  fetch(`http://localhost:8000/lenta/${id}`, {
    method: 'DELETE',
    credentials: "include"
  }).then(res => res.status === 200 && dispatch(deletePost(id)))
}

export const chatPrivatThunk = (id) => (dispatch) => {

  dispatch(addId(id))
}



