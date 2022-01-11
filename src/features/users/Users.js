import React, { useEffect, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../users/components/User";
import * as Yup from "yup";
import { Formik, Form, Field, useField } from "formik";
import { Box, Button, Badge, Typography, Grid } from "@mui/material";
import { TabPanel } from "@mui/lab";
import { setEditModalOpen, setAddModalOpen, setUserType } from "../ui/uiSlice";
import AddModal from "../users/components/Modal";
import {
  fetchUsers,
  assistantsSelectors,
  dentistsSelectors,
  clientsSelectors,
  deleteUser,
  addUser,
  setDeleting
} from "../users/userSlice";

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
  const tabValue = useSelector((state) => state.ui.tabValue);
  const editModalOpen = useSelector((state) => state.ui.editModalOpen);
  const addModalOpen = useSelector((state) => state.ui.addModalOpen);
  const isLoading = useSelector((state) => state.users.loading);

  const handleUserType = (e) => {
    console.log(e.target.value, e.target.name);
    dispatch(setUserType(e.target.value));
  };

  const handleOpenAddModal = () => {
    console.log("handleOpenAddModal");
  };

  const onDelete = (selectedIds) => {
    dispatch(setDeleting(true));
    console.log("onDelete", selectedIds, userType);
    dispatch(deleteUser({ selectedIds, userType });
    });
  };

  console.log(editModalOpen, userType);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <Badge badgeContent={totalClients} max={1000} color="error">
        <Button
          name="userType"
          value="clients"
          variant="contained"
          onClick={handleUserType}
          sx={{ m: 1 }}
        >
          Clients
        </Button>
      </Badge>
      <Badge badgeContent={totalDentists} color="error">
        <Button
          name="userType"
          value="dentists"
          variant="contained"
          onClick={handleUserType}
          sx={{ m: 1 }}
        >
          Dentists
        </Button>
      </Badge>
      <Badge badgeContent={totalAssistants} color="error">
        <Button
          name="userType"
          value="assistants"
          variant="contained"
          onClick={handleUserType}
          sx={{ m: 1 }}
        >
          Assistants
        </Button>
      </Badge>
      {userType === "clients" ? (
        <User
          title="Clients"
          users={allClients}
          onDelete={onDelete}
          handleOpenAddModal={handleOpenAddModal}
          totalNumber={totalClients}
        />
      ) : userType === "dentists" ? (
        <User
          title="Dentists "
          users={allDentists}
          onDelete={onDelete}
          handleOpenAddModal={handleOpenAddModal}
          totalNumber={totalDentists}
        />
      ) : (
        <User
          title="Assistants"
          users={allAssistants}
          onDelete={onDelete}
          handleOpenAddModal={handleOpenAddModal}
          totalNumber={totalAssistants}
        />
      )}
    </div>
  );
};

export default memo(Users);
