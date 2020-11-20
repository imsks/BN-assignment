const userReducers = (state = {}, action) => {
  switch (action.type) {
    case "ADD_LANGUAGE_DATA__SUCCESS":
      return {
        ...state,
        message: action.message,
      };

      case "USER_DATA__SAVED__SUCCESS":
      return {
        ...state,
        message: action.message,
      };

    default:
      return state;
  }
};

export default userReducers;
