import {
  ADD_TEXT, ADD_CAT, ADD_DOG, ADD_DOGS_SAGA,
} from '../types/types';



export const createTaskThunk = ({ login, email, pass }) => async (dispatch, getState) => {
  const response = await fetch('http://localhost:3000/api/v1/tasks', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
  })

