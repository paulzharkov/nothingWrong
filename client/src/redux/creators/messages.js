import {ADD_ALL_MESSAGES} from '../types/Messages'


export const setAllMessages = (allMessages = []) => ({
  type: ADD_ALL_MESSAGES,
  payload: allMessages

})


export const allOurMessagesThunk = (id) => async (dispatch) => {
  const response = await fetch(`http://localhost:8000/post/${id}`, {
    credentials: "include"
  })
  const allMessages = await response.json()
  if (allMessages) {
    dispatch(setAllMessages(allMessages))
  }
}
