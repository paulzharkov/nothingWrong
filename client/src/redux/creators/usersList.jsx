import * as TYPES from '../types/usersList'


export const setUsers = (usersList) => ({
  type: TYPES.ADD_ALL_USERS,
  payload: usersList
})

export const setFollowersUsers = (followersList) => ({
  type: TYPES.ADD_FOLLOWERS_USERS,
  payload: followersList
})

export const subscribeUser = (id) => ({
  type: TYPES.SUBSCRIBE,
  payload: id
})

export const unSubscribeUser = (id) => ({
  type: TYPES.UNSUBSCRIBE,
  payload: id
})

export const getAllUsersThunk = () => async (dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_DEVELOPMENT_BACK}/users/people/allpeople`, {
    credentials: "include"
  })
  const usersList = await response.json()

  if (usersList) {
    dispatch(setUsers(usersList))
  }
}

export const getFollowersUsersThunk = () => async (dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_DEVELOPMENT_BACK}/users/people/followers`, {
    credentials: "include"
  })
  const followersList = await response.json()

  if (followersList) {
    dispatch(setFollowersUsers(followersList))
  }
}

export const subscribeThunk = (id, login) => async (dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_DEVELOPMENT_BACK}/users/people/allpeople/${id}`, {
    credentials: "include"
  })

  if (response.status === 200) {
    dispatch(subscribeUser(id))
  }
}

export const unSubscribeThunk = (id) => async (dispatch) => {

  const response = await fetch(`${process.env.REACT_APP_DEVELOPMENT_BACK}/users/people/followers/${id}`, {
    credentials: "include"
  })

  if (response.status === 200) {
    dispatch(unSubscribeUser(id))
  }
}

