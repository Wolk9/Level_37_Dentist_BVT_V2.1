import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  assistantsSelectors,
  dentistsSelectors,
  clientsSelectors,
  setEditModalOpen,
  setAddModalOpen,
  setUserType,
  deleteUser,
  setLoading
} from "../users/userSlice";
import User from "../users/components/User";
import {
  Badge,
  Modal,
  Placeholder,
  Button,
  Panel,
  ButtonGroup,
  Form,
  SelectPicker
} from "rsuite";
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
  const userType = useSelector((state) => state.users.userType);
  const editModalOpen = useSelector((state) => state.users.editModalOpen);
  const addModalOpen = useSelector((state) => state.users.addModalOpen);
  const isLoading = useSelector((state) => state.users.loading);

  console.log(editModalOpen, userType);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(setLoading(true));
  }, [totalUsers]);

  const [formValue, setFormValue] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    active: false
  });

  const handleCloseAddModal = () => {
    dispatch(setAddModalOpen(false));
  };
  const handleOpenAddModal = () => {
    dispatch(setAddModalOpen(true));
  };

  const handleUserTypeButton = (e) => {
    dispatch(setUserType(e.target.value));
  };
  const handleEditModalClose = () => {
    dispatch(setEditModalOpen(false));
  };
  //const handleAction = () => {};

  const onDelete = useCallback((id, userType) => {
    console.log(id, userType);
    dispatch(deleteUser({ id, userType }));
  }, []);

  //const userTypes = [Client, Assistant, Dentist];

  return (
    <div>
      <Modal open={addModalOpen} onClose={handleCloseAddModal} size="xs">
        <Modal.Header>
          <Modal.Title>New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid onChange={setFormValue} formValue={formValue}>
            <Form.Group controlId="first_name">
              <Form.ControlLabel>First Name</Form.ControlLabel>
              <Form.Control name="first_name" />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="last_name">
              <Form.ControlLabel>Last Name</Form.ControlLabel>
              <Form.Control name="last_name" />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control name="email" type="email" />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="userType">
              <Form.ControlLabel>Select UserType</Form.ControlLabel>
              <Form.Control
                name="select"
                // data={userTypes}
                // accepter={SelectPicker}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseAddModal} appearance="primary">
            Confirm
          </Button>
          <Button onClick={handleCloseAddModal} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

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
        <ButtonGroup>
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
        </ButtonGroup>
        <ButtonGroup>
          <Button onClick={handleOpenAddModal}>New User</Button>
        </ButtonGroup>
      </Panel>
      {userType === "dentists" ? (
        <User
          title="Dentists"
          users={allDentists}
          userType={userType}
          onDelete={onDelete}
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
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Users;
