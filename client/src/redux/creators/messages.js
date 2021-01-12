import { ADD_ALL_MESSAGES } from '../types/messages';

export const setAllMessages = (allMessages = []) => ({
  type: ADD_ALL_MESSAGES,
  payload: allMessages,
});

export const allOurMessagesThunk = (id) => async (dispatch) => {
  const response = await fetch(
    `${process.env.REACT_APP_DEVELOPMENT_BACK}/post/${id}`,
    {
      credentials: 'include',
    }
  );
  const allMessages = await response.json();
  if (allMessages) {
    dispatch(setAllMessages(allMessages));
  }
};
