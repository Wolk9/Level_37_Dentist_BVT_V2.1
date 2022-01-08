import React from "react";
import Users from "./features/users/Users";
import "rsuite/dist/rsuite.min.css";
import { CustomProvider } from "rsuite";

export default () => (
  <CustomProvider theme="dark">
    <Users />
  </CustomProvider>
);
