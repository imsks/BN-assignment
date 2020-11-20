const initState = {
  authError: null,
};

const authReducers = (state = initState, action) => {
  switch (action.type) {
    case "USER_SIGNIN_SUCCESS":
      return {
        ...state,
        authError: null,
      };
    case "USER_SIGNIN_ERROR":
      return {
        ...state,
        authError: action.err,
      };
    case "BANKER_SIGNIN_SUCCESS":
      return {
        ...state,
        authError: null,
      };
    case "BANKER_SIGNIN_ERROR":
      return {
        ...state,
        authError: action.err,
      };
    default:
      return state;
  }
};

export default authReducers;
