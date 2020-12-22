import { DELETE_SOCKET, SET_SOCKET } from "../types/socket";

export const setSocket = (socket) => ({
  type: SET_SOCKET,
  payload: socket
})

export const deleteSocket = () => ({
  type: DELETE_SOCKET
})
