import {
  USER_LOG_IN,
  USER_LOG_OUT,
  USER_LOG_IN_ERROR,
} from "../actions/actionTypes";

export const initialStateAuth = JSON.parse(
  localStorage.getItem("current user")
) || {
  auth: {
    email: "",
    idToken: "",
    expiresIn: "",
    localId: "",
    refreshToken: "",
  },
  errorMessage: "",
};

export const authReducer = (state = initialStateAuth, action) => {
  switch (action.type) {
    case USER_LOG_IN_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case USER_LOG_IN:
      return {
        ...state,
        auth: action.payload,
        errorMessage: "",
      };
    case USER_LOG_OUT:
      return action.payload;
    default:
      return state;
  }
};
