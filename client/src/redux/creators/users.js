import * as TYPES from '../types/users';
import { LOGOUT } from '../types/users';

export const createLogin = (log) => ({
  type: TYPES.ADD_USERS_LOGIN,
  payload: log,
});

export const logoutUser = () => ({
  type: LOGOUT,
});

export const createPersonThunk = ({ login, email, pass }) => async (
  dispatch
) => {
  const response = await fetch('http://localhost:3001/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ login, email, pass }),
    credentials: 'include',
  });
  const userlogin = await response.json();

  userlogin && dispatch(createLogin(userlogin));
};

export const loginPersonThunk = ({ email, pass }) => async (dispatch) => {
  const response = await fetch('http://localhost:3001/users/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, pass }),
    credentials: 'include',
  });
  const login = await response.json();
  login && dispatch(createLogin(login));
};

export const logoutThunk = ({ login }) => async (dispatch) => {
  const response = await fetch('http://localhost:3001/users/signout', {
    credentials: 'include',
  });
};
