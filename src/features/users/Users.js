import React, { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../users/components/User";
import AddModal from "./components/AddModal";
import EditModal from "./components/EditModal";
import { Backdrop, Badge, Button, CircularProgress } from "@mui/material";
import {
  setEditModalOpen,
  setAddModalOpen,
  setSelected,
  setUserType,
  setPage,
  setFormValue,
  setFormError
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
  const formError = useSelector((state) => state.ui.formError);
  const selected = useSelector((state) => state.ui.selected);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUserType = (e) => {
    dispatch(setUserType(e.target.value));
    dispatch(setPage(0));
    dispatch(setSelected([]));
  };

  const handleOpenAddModal = () => {
    dispatch(setAddModalOpen(true));
  };

  const handleOpenEditModal = () => {
    let selectedUserValues = {};
    switch (userType) {
      case "clients":
        selectedUserValues = allClients.find(
          (client) => client.id === selected[0]
        );
        console.log("clients", selectedUserValues);
        dispatch(
          setFormValue({
            ...formValue,
            id: selectedUserValues.id,
            first_name: selectedUserValues.first_name,
            last_name: selectedUserValues.last_name,
            email: selectedUserValues.email,
            phone: selectedUserValues.phone,
            dob: selectedUserValues.dob,
            gender: selectedUserValues.gender,
            availability: selectedUserValues.availability
          })
        );
        dispatch(setEditModalOpen(true));
        break;
      case "assistants":
        selectedUserValues = allAssistants.find(
          (assistants) => assistants.id === selected[0]
        );
        console.log("asistants", selectedUserValues);
        dispatch(
          setFormValue({
            ...formValue,
            id: selectedUserValues.id,
            first_name: selectedUserValues.first_name,
            last_name: selectedUserValues.last_name,
            email: selectedUserValues.email,
            phone: selectedUserValues.phone,
            dob: selectedUserValues.dob,
            gender: selectedUserValues.gender,
            availability: selectedUserValues.availability
          })
        );
        dispatch(setEditModalOpen(true));
        break;
      case "dentists":
        selectedUserValues = allDentists.find(
          (dentists) => dentists.id === selected[0]
        );
        console.log("dentists", selectedUserValues);
        dispatch(
          setFormValue({
            ...formValue,
            id: selectedUserValues.id,
            first_name: selectedUserValues.first_name,
            last_name: selectedUserValues.last_name,
            email: selectedUserValues.email,
            phone: selectedUserValues.phone,
            dob: selectedUserValues.dob,
            gender: selectedUserValues.gender,
            availability: selectedUserValues.availability
          })
        );
        dispatch(setEditModalOpen(true));
        break;
      default:
        break;
    }
  };
  const handleCloseModal = () => {
    dispatch(setAddModalOpen(false));
    dispatch(setEditModalOpen(false));
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

  const validate = () => {
    let temp = {};
    temp.first_name = formValue.first_name ? "" : "This field is required.";
    temp.last_name = formValue.last_name ? "" : "This field is required.";
    temp.phone =
      formValue.phone.length > 9 ? "" : "Minimum of 10 numbers required";
    temp.email = /$|.+@.+..+/.test(formValue.email) ? "" : "Email is not valid";
    dispatch(setFormError({ ...temp }));
    console.log(Object.values(temp).every((x) => x === ""));
    return Object.values(temp).every((x) => x === "");
  };

  const handleConfirmAddModal = (e) => {
    e.preventDefault();
    console.log("Confirm!");
    if (!validate()) {
      window.alert("testing...");
    }
    dispatch(addUser({ formValue, userType: userType }));
    dispatch(setAddModalOpen(false));
    dispatch(setFormValue({}));
  };

  const handleConfirmEditModal = () => {
    switch (userType) {
      case "dentists":
        let selectedDentistValues = allDentists.find(
          (dentist) => dentist.id === selected[0]
        );
        dispatch(
          updateUser({
            userType: userType,
            id: selectedDentistValues.id,
            changes: {
              first_name: formValue.first_name,
              last_name: formValue.last_name,
              email: formValue.email,
              phone: formValue.phone,
              dob: formValue.dob,
              gender: formValue.gender,
              availability: formValue.availability
            }
          })
        );
        break;
      case "assistants":
        let selectedAssistantValues = allAssistants.find(
          (assistant) => assistant.id === selected[0]
        );
        dispatch(
          updateUser({
            userType: userType,
            id: selectedAssistantValues.id,
            changes: {
              first_name: formValue.first_name,
              last_name: formValue.last_name,
              email: formValue.email,
              phone: formValue.phone,
              dob: formValue.dob,
              gender: formValue.gender,
              availability: formValue.availability
            }
          })
        );
        break;
      case "clients":
        let selectedClientValues = allClients.find(
          (client) => client.id === selected[0]
        );
        dispatch(
          updateUser({
            userType: userType,
            id: selectedClientValues.id,
            changes: {
              first_name: formValue.first_name,
              last_name: formValue.last_name,
              email: formValue.email,
              phone: formValue.phone,
              dob: formValue.dob,
              gender: formValue.gender,
              availability: formValue.availability
            }
          })
        );
        break;
      default:
        break;
    }
    console.log("Confirm!");

    handleCloseModal();
    dispatch(setSelected([]));
    dispatch(setFormValue({}));
  };

  // const handleChangeValue = (id, key, value) => {
  //   console.log(id, key, value, userType);
  //   dispatch(
  //     updateUser({
  //       userType: userType,
  //       id: id,
  //       changes: { key: "sick" }
  //     })
  //   );

  //   //onClick={() =>
  //   //          handleChangeValue(row.id, row.availability)
  //   //      }
  // };

  const handleFormChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;

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

    if (name === "gender") {
      console.log("it's a boy or a girl");
      return dispatch(setFormValue({ ...formValue, [name]: value }));
    }

    if (name === "availability") {
      console.log("availability change!");
      return dispatch(setFormValue({ ...formValue, [name]: !value }));
    }

    dispatch(setFormValue({ ...formValue, [name]: value }));
  };

  return (
    <div>
      <AddModal
        open={addModalOpen}
        handleCloseModal={handleCloseModal}
        handleConfirmAddModal={handleConfirmAddModal}
        handleFormChange={handleFormChange}
      />
      <EditModal
        open={editModalOpen}
        handleCloseModal={handleCloseModal}
        handleConfirmEditModal={handleConfirmEditModal}
        handleFormChange={handleFormChange}
      />
      <Backdrop open={isLoading}>
        <CircularProgress
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        />
      </Backdrop>

      <Badge badgevalue={totalClients} max={1000} color="error">
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
      <Badge badgevalue={totalDentists} color="error">
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
      <Badge badgevalue={totalAssistants} color="error">
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
          handleOpenEditModal={handleOpenEditModal}
          totalNumber={totalClients}
          onFilterList={onFilterList}
        />
      ) : userType === "dentists" ? (
        <User
          title="Dentists "
          users={allDentists}
          onDelete={onDelete}
          handleOpenAddModal={handleOpenAddModal}
          handleOpenEditModal={handleOpenEditModal}
          totalNumber={totalDentists}
          onFilterList={onFilterList}
        />
      ) : (
        <User
          title="Assistants"
          users={allAssistants}
          onDelete={onDelete}
          handleOpenAddModal={handleOpenAddModal}
          handleOpenEditModal={handleOpenEditModal}
          totalNumber={totalAssistants}
          onFilterList={onFilterList}
        />
      )}
    </div>
  );
};

export default memo(Users);
