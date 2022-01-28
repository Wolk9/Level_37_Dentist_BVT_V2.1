import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import apptReducer from "../features/appts/apptSlice";
import uiReducer from "../features/ui/uiSlice";

const rootReducer = combineReducers({
  ui: uiReducer,
  user: userReducer,
  appt: apptReducer
});

export default rootReducer;
