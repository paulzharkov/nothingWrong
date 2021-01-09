import * as TYPES from '../types/posts'


export const createPost = (data) => ({
  type: TYPES.ADD_POST,
  payload: data
})

export const setPosts = (postsList) => ({
  type: TYPES.ADD_ALL,
  payload: postsList

})

export const setFeedPosts = (postsList) => ({
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

export const likePost = (data) => ({
  type: TYPES.LIKE,
  payload: data
})

export const disLikePost = (data) => ({
  type: TYPES.DISLIKE,
  payload: data
})

export const addId = (id = '') => ({
  type: TYPES.ADD_ID,
  payload: id
})

export const getWrong = (id = {}) => ({
  type: TYPES.GET_WRONG,
  payload: id
})

export const getWrongThunk = (id) => async (dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_DEVELOPMENT_BACK}/wrong/${id}`, {
    credentials: "include"
  })
  const oneWrong = await response.json()
  if (oneWrong) {
    dispatch(getWrong(oneWrong))
  }
}


export const getFeedPostsThunk = () => async (dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_DEVELOPMENT_BACK}/feed`, {
    credentials: "include"
  })
  const postsList = await response.json()
  if (postsList) {
    dispatch(setFeedPosts(postsList))
  }
}

export const getAllMyPostsThunk = () => async (dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_DEVELOPMENT_BACK}/account`, {
    credentials: "include"
  })
  const postsList = await response.json()
  if (postsList) {
    dispatch(setPosts(postsList.userPosts))
  }
}

export const getAllToMePostsThunk = () => async (dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_DEVELOPMENT_BACK}/account`, {
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
  state }) => async (dispatch, getState) => {
    const response = await fetch(`${process.env.REACT_APP_DEVELOPMENT_BACK}/wrong`, {
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
    if (data.newPost) {
      dispatch(createPost(data.newPost))
      const { socket } = getState()
      if (Object.keys(socket).length) {
        socket.emit('wrong notification', {
          title: 'Вам обидка!',
          wrongID: data.newPost._id,
          offender: data.newPost.offenderId,
          offenderSocketID: data.offenderSocketID
        })
      }
    }
  };

export const deletePostThunk = (id) => (dispatch) => {
  fetch(`${process.env.REACT_APP_DEVELOPMENT_BACK}/feed/${id}`, {
    method: 'DELETE',
    credentials: "include"
  }).then(res => res.status === 200 && dispatch(deletePost(id)))
}

export const likePostThunk = ({ id, login }) => async (dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_DEVELOPMENT_BACK}/feed/${id}`, {
    method: 'PATCH',
    credentials: "include"
  })
  if (response.status === 200) {
    dispatch(likePost({ id, login }))
  } else {
    dispatch(disLikePost({ id, login }))
  }
}

export const chatPrivatThunk = (id) => (dispatch) => {
  dispatch(addId(id))
}

export const changeAnswer = ({ id, answer, user }) => async (dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_DEVELOPMENT_BACK}/wrong/answer/${id}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      answer,
      id,
      user
    }),
    credentials: 'include'
  })

}



