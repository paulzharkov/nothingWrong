import {SET_SOCKET, DELETE_SOCKET} from '../types/socket'

const socketReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return action.payload
    case DELETE_SOCKET:
      return {}
    default:
      return state
  }
}

export default socketReducer
