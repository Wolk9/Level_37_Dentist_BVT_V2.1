import React, { useEffect, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  fetchUsers,
  assistantsSelectors,
  dentistsSelectors,
  clientsSelectors,
  deleteUser,
  addUser,
  setLoading
} from "../users/userSlice";
import {
  setEditModalOpen,
  setAddModalOpen,
  setUserType,
  setFormValue
} from "../ui/uiSlice";

import User from "../users/components/User";
import {
  Badge,
  Modal,
  Placeholder,
  Button,
  Divider,
  Panel,
  Stack,
  Form,
  DatePicker,
  Radio,
  RadioGroup,
  MaskedInput
} from "rsuite";

import AddModal from "../users/components/Modal";

console.log("Users.js aangeroepen");

const Users = () => {
  const dispatch = useDispatch();
  const totalAssistants = useSelector(assistantsSelectors.selectTotal);
  const allAssistants = useSelector(assistantsSelectors.selectAll);
  const totalDentists = useSelector(dentistsSelectors.selectTotal);
  const allDentists = useSelector(dentistsSelectors.selectAll);
  const totalClients = useSelector(clientsSelectors.selectTotal);
  const allClients = useSelector(clientsSelectors.selectAll);
  const totalUsers = totalAssistants + totalDentists + totalClients;
  const userType = useSelector((state) => state.ui.userType);
  const editModalOpen = useSelector((state) => state.ui.editModalOpen);
  const addModalOpen = useSelector((state) => state.ui.addModalOpen);
  const isLoading = useSelector((state) => state.users.loading);
  const formValue = useSelector((state) => state.ui.formValue);

  const initFormValue = {
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    active: false,
    dob: ""
  };

  //Hooks
  //const [formValue, setFormValue] = React.useState(initFormValue);

  console.log(editModalOpen, userType, formValue);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(setLoading(true));
  }, [totalUsers]);

  const handleConfirmAddModal = () => {
    dispatch(setAddModalOpen(false));
    console.log(userType, formValue);
    onAdd(userType, formValue);
  };
  const handleOpenAddModal = () => {
    console.log(userType, formValue);
    dispatch(setAddModalOpen(true));
  };

  const handleUserTypeButton = (e) => {
    dispatch(setUserType(e.target.value));
  };
  const handleEditModalClose = () => {
    dispatch(setEditModalOpen(false));
  };

  const handleUserTypeRadio = (value) => {
    dispatch(setUserType(value));
  };

  // if (name === "") {
  //     console.log("nee!");
  //     return;
  //   } else if (name === "dob") {
  //     console.log("ja!");
  //     JSON.stringify(value.toDateString());
  //   }

  // dispatch(setFormValue(e.target.value, e.target.name));

  const onDelete = useCallback((id, userType) => {
    console.log(id, userType);
    dispatch(deleteUser({ id, userType }));
  }, []);

  const onAdd = useCallback((userType, formValue) => {
    console.log(userType, formValue);
    let id;
    if (formValue.id) {
      id = uuidv4();
    } else id = formValue.id;
    dispatch(addUser({ formValue, userType }));
  });

  return (
    <div>
      <AddModal addModalOpen={addModalOpen} />
      <Modal open={editModalOpen} onClose={handleEditModalClose}>
        <Modal.Header>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Placeholder.Paragraph />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleEditModalClose} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleEditModalClose} appearance="default">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Panel>
        <Stack divider={<Divider vertical />}>
          <Badge maxCount={1000} content={totalClients}>
            <Button
              onClick={handleUserTypeButton}
              appearance={userType === "clients" ? "primary" : "default"}
              value="clients"
              loading={isLoading ? true : false}
            >
              Clients
            </Button>
          </Badge>
          <Badge content={totalDentists}>
            <Button
              onClick={handleUserTypeButton}
              appearance={userType === "dentists" ? "primary" : "default"}
              value="dentists"
              loading={isLoading ? true : false}
            >
              Dentists
            </Button>
          </Badge>
          <Badge content={totalAssistants}>
            <Button
              onClick={handleUserTypeButton}
              appearance={userType === "assistants" ? "primary" : "default"}
              value="assistants"
              loading={isLoading ? true : false}
            >
              Assistants
            </Button>
          </Badge>
        </Stack>
      </Panel>
      {userType === "dentists" ? (
        <User
          title="Dentists"
          users={allDentists}
          userType={userType}
          onDelete={onDelete}
          handleOpenAddModal={handleOpenAddModal}
        />
      ) : (
        <div></div>
      )}
      {userType === "assistants" ? (
        <User
          title="Assistants"
          users={allAssistants}
          userType={userType}
          onDelete={onDelete}
          handleOpenAddModal={handleOpenAddModal}
        />
      ) : (
        <div></div>
      )}
      {userType === "clients" ? (
        <User
          title="Clients"
          users={allClients}
          userType={userType}
          onDelete={onDelete}
          handleOpenAddModal={handleOpenAddModal}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default memo(Users);
