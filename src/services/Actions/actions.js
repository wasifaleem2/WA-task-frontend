import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RECIPIENT_OPEN,
} from "../constants";

//Login action
const loginAction = (userCredentials) => {
  // console.log("action", userCredentials);
  return {
    type: LOGIN_SUCCESS,
    userCredentials: userCredentials,
  };
};
const logoutAction = (userCredentials) => {
  // console.log("action logout", userCredentials);
  return {
    type: LOGOUT,
    userCredentials: userCredentials,
  };
};
export{
  loginAction,
  logoutAction
}
