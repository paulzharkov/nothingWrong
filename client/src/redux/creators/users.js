const createPersonThunk = ({ login, email, pass }) => async (dispatch, getState) => {
  const response = await fetch('http://localhost:3001/users/signup', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ login, email, pass }),
    credentials: 'include'
  })
  if (response.status === 200) {
    const login = await response.json()
    console.log(login);
  }
}

export default createPersonThunk
