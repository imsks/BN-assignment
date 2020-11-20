import axios from "axios";
import config from "../../config";

// Signing up User
export const userSignIn = (credentials) => {
  return (dispatch) => {
    const { email, password } = credentials;

    axios({
      method: "post",
      url: `${config.REACT_APP_NODE_API_URL}/api/user/auth/signin`,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        // console.log(res.data);
        localStorage.setItem("user", res.data.accessToken);
        dispatch({
          type: "USER_SIGNIN_SUCCESS",
        });
      })
      .catch((err) => {
        // console.log(err);
        dispatch({
          type: "USER_SIGNIN_ERROR",
          err: err.response.data.message,
        });
      });
  };
};

// Signing up User
export const bankerSignIn = (credentials) => {
  return (dispatch) => {
    const { email, password } = credentials;

    axios({
      method: "post",
      url: `${config.REACT_APP_NODE_API_URL}/api/user/auth/signin`,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        // console.log(res.data);
        localStorage.setItem("banker", res.data.accessToken);
        dispatch({
          type: "BANKER_SIGNIN_SUCCESS",
        });
      })
      .catch((err) => {
        // console.log(err);
        dispatch({
          type: "BANKER_SIGNIN_ERROR",
          err: err.response.data.message,
        });
      });
  };
};

// Signing out User
export const signOutUser = () => {
  return (dispatch) => {
    localStorage.setItem("currentUser", null);
    dispatch({
      type: "SIGNOUT__SUCCESS",
    });
  };
};
