import * as TYPES from '../types/advice'

export const setAdvice = (adviceList) => ({
  type: TYPES.ADD_ALL_ADVICES,
  payload: adviceList
})

export const addAdviceThunk = () => async (dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_DEVELOPMENT_BACK}/advice`, {
    credentials: "include"
  })
  const adviceList = await response.json()
  if (adviceList) {
    dispatch(setAdvice(adviceList))
  }
}
