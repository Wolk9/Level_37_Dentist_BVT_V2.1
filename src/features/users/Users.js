import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  assistantsSelectors,
  dentistsSelectors,
  clientsSelectors,
  setModalOpen,
  setUserType,
  deleteUser,
  setLoading
} from "../users/userSlice";
import User from "../users/components/User";
import { Badge, Modal, Placeholder, Button, Panel, ButtonGroup } from "rsuite";
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
  const modalOpen = useSelector((state) => state.users.modalOpen);
  const isLoading = useSelector((state) => state.users.loading);

  console.log(modalOpen, userType);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(setLoading(true));
  }, [totalUsers]);

  const handleUserTypeButton = (e) => {
    dispatch(setUserType(e.target.value));
  };
  const handleClose = () => {
    dispatch(setModalOpen(false));
  };
  //const handleAction = () => {};

  const onDelete = useCallback((id, userType) => {
    console.log(id, userType);
    dispatch(deleteUser({ id, userType }));
  }, []);

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
          <Button onClick={handleClose} appearance="default">
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
