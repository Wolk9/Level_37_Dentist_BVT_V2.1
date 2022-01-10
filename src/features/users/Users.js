import React, { useEffect, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import {
  fetchUsers,
  assistantsSelectors,
  dentistsSelectors,
  clientsSelectors,
  deleteUser,
  addUser
} from "../users/userSlice";
import { setEditModalOpen, setAddModalOpen, setUserType } from "../ui/uiSlice";
import AddModal from "../users/components/Modal";
//import User from "../users/components/User";

import {
  Badge,
  Stack,
  Box,
  Divider,
  Modal,
  Button,
  ButtonGroup
} from "@mui/material";
import { cyan } from "@mui/material/colors";

const primary = cyan[500];

console.log("Users.js aangeroepen");

const Users = () => {
  const dispatch = useDispatch();
  const totalAssistants = useSelector(assistantsSelectors.selectTotal);
  const allAssistants = useSelector(assistantsSelectors.selectAll);
  const totalDentists = useSelector(dentistsSelectors.selectTotal);
  const allDentists = useSelector(dentistsSelectors.selectAll);
  const totalClients = useSelector(clientsSelectors.selectTotal);
  const allClients = useSelector(clientsSelectors.selectAll);
  const userType = useSelector((state) => state.ui.userType);
  const editModalOpen = useSelector((state) => state.ui.editModalOpen);
  const addModalOpen = useSelector((state) => state.ui.addModalOpen);
  const isLoading = useSelector((state) => state.users.loading);
  const formValue = useSelector((state) => state.ui.formValue);

  //Hooks
  //const [formValue, setFormValue] = React.useState(initFormValue);

  console.log(editModalOpen, userType, formValue);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <Stack direction="row">
        <Formik>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            color="primary"
          >
            <Button
              name="userType"
              value="clients"
              onSubmit={(values) => {
                dispatch(setUserType(values));
              }}
            >
              Clients
            </Button>
            <Button
              name="userType"
              value="dentists"
              onSubmit={(values) => {
                dispatch(setUserType(values));
              }}
            >
              Dentists
            </Button>
            <Button
              name="userType"
              value="assistants"
              onSubmit={(values) => {
                dispatch(setUserType(values));
              }}
            >
              Assistants
            </Button>
          </ButtonGroup>
        </Formik>
      </Stack>

      <h3></h3>
    </div>
  );
};

export default memo(Users);
