import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import apptReducer from "../features/appts/apptSlice";
import uiReducer from "../features/ui/uiSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    users: userReducer,
    appts: apptReducer
  }
});

export default store;
