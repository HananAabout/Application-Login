export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const UPDATE_COLOR = 'UPDATE_COLOR';

export const loginUser = (userData) => ({
  type: LOGIN_USER,
  payload: userData,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const updateColor = (color) => ({
  type: UPDATE_COLOR,
  payload: color,
});