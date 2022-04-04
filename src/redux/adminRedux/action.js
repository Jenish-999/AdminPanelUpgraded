import { toast } from "react-toastify";
import { adminTypes } from "./types";

// Admin Login
export const adminLogin = () => {
  return {
    type: adminTypes.ADMIN_LOGIN,
  };
};

// Admin Login idToken
export const adminIdToken = (idToken) => {
  return {
    type: adminTypes.ADMIN_ID_TOKEN,
    payload: idToken,
  };
};

// Admin Login List
export const adminLoginList = () => {
  return {
    type: adminTypes.ADMIN_LIST,
  };
};

// admin login fail
export const adminLoginFail = () => {
  return {
    type: adminTypes.ADMIN_LOGIN_FAIL,
  };
};

// Admin Login Function
export const adminLoginFunction = (values) => {
  return (dispatch) => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8rPl1qPkTkkh2ykQcG-ZUzU6ZXXor8Zc",
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.localId) {
          if (data.email === "jenish@gmail.com") {
            console.log("Yes JSONID GOT");
            localStorage.setItem("adminLogin", "true");
            dispatch(adminLogin());
            dispatch(adminIdToken(data.idToken));
            toast.success("Welcome Admin.");
          } else {
            toast.error("Try later!! ");
          }
        }
        if (data.error) {
          dispatch(adminLoginFail());
          toast.error("Try later!!");
        }
      })
      .catch((err) => {
        toast.error("Try later!!");
      });
  };
};

// Admin Login List Function
export const adminListFunction = () => {
  return (dispatch) => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyA8rPl1qPkTkkh2ykQcG-ZUzU6ZXXor8Zc",
      {
        method: "POST",
        body: JSON.stringify(),
      }
    );
  };
};
