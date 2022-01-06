import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  assistantsSelectors,
  dentistsSelectors,
  clientsSelectors,
  setModalOpen,
  setUserType,
  addUser,
  removeUser,
  editUser
} from "../users/userSlice";
import User from "../users/components/User";
import { Badge, Modal, Placeholder, Button, Panel, ButtonGroup } from "rsuite";

const Users = () => {
  const dispatch = useDispatch();
  const totalAssistants = useSelector(assistantsSelectors.selectTotal);
  const allAssistants = useSelector(assistantsSelectors.selectAll);
  const totalDentists = useSelector(dentistsSelectors.selectTotal);
  const allDentists = useSelector(dentistsSelectors.selectAll);
  const totalClients = useSelector(clientsSelectors.selectTotal);
  const allClients = useSelector(clientsSelectors.selectAll);
  const userType = useSelector((state) => state.users.userType);
  const modalOpen = useSelector((state) => state.users.modalOpen);

  console.log(modalOpen, userType);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleUserTypeButton = (e) => {
    dispatch(setUserType(e.target.value));
  };
  const handleClose = () => {
    dispatch(setModalOpen(false));
  };
  //const handleAction = () => {};

  return (
    <div>
      <Modal open={modalOpen} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Placeholder.Paragraph />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Panel>
        <ButtonGroup>
          <Badge content={totalClients}>
            <Button
              onClick={handleUserTypeButton}
              appearance={userType === "clients" ? "primary" : "subtle"}
              value="clients"
            >
              Clients
            </Button>
          </Badge>
          <Badge content={totalDentists}>
            <Button
              onClick={handleUserTypeButton}
              appearance={userType === "dentists" ? "primary" : "subtle"}
              value="dentists"
            >
              Dentists
            </Button>
          </Badge>
          <Badge content={totalAssistants}>
            <Button
              onClick={handleUserTypeButton}
              appearance={userType === "assistants" ? "primary" : "subtle"}
              value="assistants"
            >
              Assistants
            </Button>
          </Badge>
        </ButtonGroup>
      </Panel>
      {userType === "dentists" ? (
        <User title="Dentists" users={allDentists} />
      ) : (
        <div></div>
      )}
      {userType === "assistants" ? (
        <User title="Asssistants" users={allAssistants} />
      ) : (
        <div></div>
      )}
      {userType === "clients" ? (
        <User title="Clients" users={allClients} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Users;
