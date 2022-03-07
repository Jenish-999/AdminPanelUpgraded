import { adminTypes } from "./types";

function getLocalStorage() {
  let adminLogin = localStorage.getItem("adminLogin");
  return adminLogin;
}

const initialState = {
  isAdminLogin: getLocalStorage(),
  isAdminLoginFail: false,
};

export const adminReducer = (state = initialState, { type, payload }) => {
  if (type === adminTypes.ADMIN_LOGIN) {
    return { ...state, isAdminLogin: true, isAdminLoginFail: false };
  }

  if (type === "ADMIN_LOGOUT") {
    return { ...state, isAdminLogin: localStorage.removeItem("adminLogin") };
  }
  if (type === adminTypes.ADMIN_LOGIN_FAIL) {
    return { ...state, isAdminLogin: false, isAdminLoginFail: true };
  }

  return state;
};
