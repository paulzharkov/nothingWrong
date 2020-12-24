import * as TYPES from '../types/advices'

export const setAdvices = (advicesList) => ({
  type: TYPES.ADD_ALL_ADVICES,
  payload: advicesList
})

export const addAdvicesThunk = () => async (dispatch) => {
  const response = await fetch(`http://localhost:8000/advices`, {
    credentials: "include"
  })
  const advicesList = await response.json()
  if (advicesList) {
    dispatch(setAdvices(advicesList))
  }
}
