import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import apptReducer from "../features/appts/apptSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    appts: apptReducer
  }
});

export default store;
