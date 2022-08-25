// import { USER_INFO } from "../constants";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RECIPIENT_OPEN,
} from "../constants";

const initialState = {
  isLoggedIn: false,
  userData: null,
};

export default function User(state = initialState, action) {
  // const { type, userCredentials } = action;
  switch (action.type) {
    // case REGISTER_SUCCESS:
    //   return { ...state, isLoggedIn: false };
    // case REGISTER_FAIL:
    //   return { ...state, isLoggedIn: false };
    case LOGIN_SUCCESS:
      console.log("reducer", action);
      return { ...state, isLoggedIn: true, userData: action.userCredentials };
    // case LOGIN_FAIL:
    //   return { ...state, isLoggedIn: false, userData: null };
    case LOGOUT:
      return { ...state, isLoggedIn: false, userData: null };
    default:
      return state;
  }
}
