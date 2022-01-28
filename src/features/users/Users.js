import React, { useEffect, memo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import User from "../users/components/User";
//import AddModal from "./components/AddModal";
//import EditModal from "./components/EditModal";
import UserModal from "./components/UserModal";
import { Backdrop, Badge, Button, CircularProgress } from "@mui/material";
import {
  setEdit,
  setFormError,
  setFormValue,
  resetFormValue,
  setPage,
  setSelected,
  setUserModalOpen,
  setUserType
} from "../ui/uiSlice";
import {
  addUser,
  deleteUser,
  fetchUsers,
  setDeleting,
  updateUser,
  assistantsSelectors,
  dentistsSelectors,
  clientsSelectors
} from "../users/userSlice";
import { v4 as uuidv4 } from "uuid";

const Users = () => {
  const dispatch = useDispatch();
  const totalAssistants = useSelector(assistantsSelectors.selectTotal);
  const allAssistants = useSelector(assistantsSelectors.selectAll);
  const totalDentists = useSelector(dentistsSelectors.selectTotal);
  const allDentists = useSelector(dentistsSelectors.selectAll);
  const totalClients = useSelector(clientsSelectors.selectTotal);
  const allClients = useSelector(clientsSelectors.selectAll);
  const isLoading = useSelector((state) => state.users.loading);

  // const userType = useSelector((state) => state.ui.userType);
  // const userModalOpen = useSelector((state) => state.ui.userModalOpen);
  // const formValue = useSelector((state) => state.ui.formValue);
  // const selected = useSelector((state) => state.ui.selected);
  // const edit = useSelector((state) => state.ui.edit);

  const { edit, formValue, selected, userModalOpen, userType } = useSelector(
    (state) => state.ui
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUserType = (e) => {
    dispatch(setUserType(e.target.value));
    dispatch(setPage(0));
    dispatch(setSelected([]));
  };

  const handleOpenUserModal = () => {
    console.log(selected, selected.length, userModalOpen, userType, edit);

    if (edit) {
      let selectedUserValues = {};
      console.log("handleUserOpenModal", edit);
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
          dispatch(setUserModalOpen(true));
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
          dispatch(setUserModalOpen(true));
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
          dispatch(setUserModalOpen(true));
          break;
        default:
          break;
      }
    } else {
      console.log("edit: ", edit);
      dispatch(setUserModalOpen(true));
    }
  };

  const handleCloseModal = () => {
    dispatch(setUserModalOpen(false));
    if (selected.length !== 1) {
      dispatch(setEdit(false));
    }
    dispatch(resetFormValue());
  };

  const onFilterList = () => {
    console.log("onFilterList");
  };

  const onDelete = (selectedIds) => {
    dispatch(setDeleting(true));
    console.log("onDelete", selectedIds, userType);
    dispatch(deleteUser({ selectedIds, userType }));
    dispatch(setSelected([]));
    dispatch(setEdit(false));
  };

  const validate = () => {
    let temp = {};
    temp.first_name = formValue.first_name ? "" : "First name is required.";
    temp.last_name = formValue.last_name ? "" : "Last name is required.";
    temp.phone =
      /^(?!\b(0)\1+\b)(\+?\d{1,3}[. -]?)?\(?\d{3}\)?([. -]?)\d{3}\3\d{4}$/g.test(
        formValue.phone
      )
        ? ""
        : "Not Valid. Try International format (+31...)";
    temp.email =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
        formValue.email
      )
        ? ""
        : "Email is not valid";
    temp.dob = formValue.dob ? "" : "Please add a day of birth";
    dispatch(setFormError({ ...temp }));
    console.log(Object.values(temp).every((x) => x === ""));
    return Object.values(temp).every((x) => x === "");
  };

  const handleConfirmAddModal = (e) => {
    e.preventDefault();
    console.log("Confirm!");
    if (validate()) {
      console.log("testing...");
      dispatch(addUser({ formValue, userType: userType }));
      handleCloseModal();
    }
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
    dispatch(resetFormValue());
  };

  //TODO: uitzoeken waarom availability wordt behandeld als string en niet als boolean (ook UserModal:71)

  const handleFormChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    console.log(name, value);

    if (formValue.id === undefined) {
      //    console.log("geen idee!", formValue);
      const id = uuidv4();
      //      console.log("nu wel: " + id);
      dispatch(
        setFormValue({
          ...formValue,
          id: id,
          [name]: value
        })
      );
    } else if (name === "dob") {
      const newValue = new Date(value).toLocaleDateString("en-GB");
      dispatch(
        setFormValue({
          ...formValue,
          [name]: newValue
        })
      );
    } else {
      console.log("id: ", formValue.id);
      dispatch(setFormValue({ ...formValue, [name]: value }));
    }
  };

  return (
    <div>
      <UserModal
        edit={edit}
        open={userModalOpen}
        handleCloseModal={handleCloseModal}
        handleConfirmAddModal={handleConfirmAddModal}
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
          handleOpenUserModal={handleOpenUserModal}
          totalNumber={totalClients}
          onFilterList={onFilterList}
        />
      ) : userType === "dentists" ? (
        <User
          title="Dentists "
          users={allDentists}
          onDelete={onDelete}
          handleOpenUserModal={handleOpenUserModal}
          totalNumber={totalDentists}
          onFilterList={onFilterList}
        />
      ) : (
        <User
          title="Assistants"
          users={allAssistants}
          onDelete={onDelete}
          handleOpenUserModal={handleOpenUserModal}
          totalNumber={totalAssistants}
          onFilterList={onFilterList}
        />
      )}
    </div>
  );
};

export default memo(Users);
