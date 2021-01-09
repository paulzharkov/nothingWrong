import * as TYPES from '../types/advice'

export const setAdvice = (adviceList) => ({
  type: TYPES.ADD_ALL_ADVICES,
  payload: adviceList
})

export const addAdviceThunk = () => async (dispatch) => {
  const response = await fetch(`http://localhost:8000/advice`, {
    credentials: "include"
  })
  const adviceList = await response.json()
  if (adviceList) {
    dispatch(setAdvice(adviceList))
  }
}
