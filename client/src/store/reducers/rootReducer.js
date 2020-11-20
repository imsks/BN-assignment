import authReducers from "./authReducers";
import userReducers from "./userReducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducers,
  user: userReducers,
});

export default rootReducer;
