import { LOGIN_USER, LOGOUT_USER, UPDATE_COLOR } from "./action";
const initialState = {
  user: null,
  color: "",
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, user: action.payload };
    case LOGOUT_USER:
      return initialState;
    case UPDATE_COLOR:
      return {
        ...state,
        color: action.payload,
      };
    default:
      return state;
  }
};
export default rootReducer;
