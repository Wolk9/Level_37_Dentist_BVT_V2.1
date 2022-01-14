import React, { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../users/components/User";
import AddModal from "./components/AddModal";
import { Backdrop, Badge, Button, CircularProgress } from "@mui/material";
import {
  setEditModalOpen,
  setAddModalOpen,
  setSelected,
  setUserType,
  setPage,
  setFormValue
} from "../ui/uiSlice";
import {
  fetchUsers,
  assistantsSelectors,
  dentistsSelectors,
  clientsSelectors,
  deleteUser,
  setDeleting,
  addUser,
  updateUser
} from "../users/userSlice";
import { v4 as uuidv4 } from "uuid";

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

  const handleUserType = (e) => {
    dispatch(setUserType(e.target.value));
    dispatch(setPage(0));
    dispatch(setSelected([]));
  };

  const handleOpenAddModal = (selectIds) => {
    dispatch(setAddModalOpen(true));
  };
  const handleCloseAddModal = () => {
    dispatch(setAddModalOpen(false));
  };

  const onFilterList = () => {
    console.log("onFilterList");
  };

  const onDelete = (selectedIds) => {
    dispatch(setDeleting(true));
    console.log("onDelete", selectedIds, userType);
    dispatch(deleteUser({ selectedIds, userType }));
    dispatch(setSelected([]));
  };

  const handleConfirmAddModal = () => {
    console.log("Confirm!");
    dispatch(addUser({ formValue, userType: userType }));
    dispatch(setAddModalOpen(false));
    dispatch(setFormValue({}));
  };

  const handleChangeValue = (id, availability) => {
    console.log(availability + id + userType);
    if (availability === "yes") {
      dispatch(
        updateUser({
          userType: userType,
          id: id,
          changes: { availability: "sick" }
        })
      );
    } else if (availability === "sick") {
      dispatch(
        updateUser({
          userType: userType,
          id: id,
          changes: { availability: "yes" }
        })
      );
    }
    //onClick={() =>
    //          handleChangeValue(row.id, row.availability)
    //      }
  };

  const handleFormChange = (e) => {
    console.log(e.target);

    if (formValue.id === undefined) {
      console.log("geen idee!");
      const id = uuidv4();
      console.log("nu wel: " + id);
      return dispatch(
        setFormValue({
          ...formValue,
          id: id
        })
      );
    }

    if (e.target.type === "radio") {
      console.log("it's a boy or a girl");
      return dispatch(setFormValue({ ...formValue, gender: e.target.value }));
    }
    dispatch(setFormValue({ ...formValue, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <AddModal
        open={addModalOpen}
        handleCloseAddModal={handleCloseAddModal}
        handleConfirmAddModal={handleConfirmAddModal}
        handleFormChange={handleFormChange}
      />
      <Backdrop open={isLoading}>
        <CircularProgress
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        />
      </Backdrop>

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
          onFilterList={onFilterList}
          handleChangeValue={handleChangeValue}
        />
      ) : userType === "dentists" ? (
        <User
          title="Dentists "
          users={allDentists}
          onDelete={onDelete}
          handleOpenAddModal={handleOpenAddModal}
          totalNumber={totalDentists}
          onFilterList={onFilterList}
          handleChangeValue={handleChangeValue}
        />
      ) : (
        <User
          title="Assistants"
          users={allAssistants}
          onDelete={onDelete}
          handleOpenAddModal={handleOpenAddModal}
          totalNumber={totalAssistants}
          onFilterList={onFilterList}
          handleChangeValue={handleChangeValue}
        />
      )}
    </div>
  );
};

export default memo(Users);
