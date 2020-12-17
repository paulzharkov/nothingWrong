
export const createPersonThunk = ({ login, email, pass }) => async (dispatch, getState) => {
  const response = await fetch('http://localhost:3001/signup', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ login, email, pass })
  })
  if (response.status === 200) {
    const newTask = await response.json()
    console.log(newTask);
  }
}
