import useLinks from '../../helpers/links';
import * as TYPES from '../types/users';
import { LOGOUT } from '../types/users';

import links from '../../helpers/links'
console.log(links)

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
  const response = await fetch(`${links.backend}/users/signup`, {
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
  const response = await fetch(`${links.backend}/users/signin`, {
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

export const checkAuth = () => async (dispatch) => {
  const response = await fetch (`${links.backend}/users/checkauth`, {credentials: 'include'})
  if (response.status === 200) {
    const login = await response.json();
    login && dispatch(createLogin(login));
  }
}

export const logoutThunk = ({ login }) => async (dispatch) => {
  const response = await fetch(`${links.backend}/users/signout`, {
    credentials: 'include',
  });
};
