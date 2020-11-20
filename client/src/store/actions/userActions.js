import axios from "axios";
import config from "../../config";

// Send Email For Forgot Password
export const updateProfileData = (payload) => {
  return (dispatch) => {
    const data = JSON.parse(localStorage.getItem("currentUser"));
    const id = data && data._id;

    axios({
      method: "post",
      url: `${config.REACT_APP_NODE_API_URL}/api/user/update/${id}`,
      data: payload,
    })
      .then((res) => {
        dispatch({
          type: "USER_DATA__SAVED__SUCCESS",
          message: res.data.message,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
