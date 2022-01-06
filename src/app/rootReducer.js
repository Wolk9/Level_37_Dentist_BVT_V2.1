import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import apptReducer from "../features/appts/apptSlice";

const rootReducer = combineReducers({
  user: userReducer,
  appt: apptReducer
});

export default rootReducer;
