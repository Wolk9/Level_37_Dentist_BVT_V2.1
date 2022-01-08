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
import { setEditModalOpen, setAddModalOpen, setUserType } from "../ui/uiSlice";
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
  RadioGroup
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
  const userType = useSelector((state) => state.ui.userType);
  const editModalOpen = useSelector((state) => state.ui.editModalOpen);
  const addModalOpen = useSelector((state) => state.ui.addModalOpen);
  const isLoading = useSelector((state) => state.users.loading);

  const initFormValue = {
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    active: false,
    dob: new Date(),
    userType: "clients"
  };

  //Hooks
  const [formValue, setFormValue] = React.useState(initFormValue);

  console.log(editModalOpen, userType);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(setLoading(true));
  }, [totalUsers]);

  const handleCloseAddModal = () => {
    dispatch(setAddModalOpen(false));
  };
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

  const handleFormChange = (value, e) => {
    console.log(value, e.target.name);
    const { name } = e.target;
    if (name === "dob") {
      console.log("ja!");
      JSON.stringify(value.toDateString());
    }
    const uuid = uuidv4();
    setFormValue((previousValue) => {
      return {
        ...previousValue,
        id: uuid,
        [name]: value
      };
    });
  };

  //const handleAction = () => {};

  const onDelete = useCallback((id, userType) => {
    console.log(id, userType);
    dispatch(deleteUser({ id, userType }));
  }, []);

  const onAdd = useCallback((userType, formValue) => {
    console.log(userType, formValue);
    dispatch(addUser({ userType, formValue }));
  });

  //const userTypes = [Client, Assistant, Dentist];

  return (
    <div>
      <Modal open={addModalOpen} onClose={handleCloseAddModal} size="xs">
        <Modal.Header>
          <Modal.Title>
            New{" "}
            {userType === "clients"
              ? "Client"
              : userType === "assistants"
              ? "Assistant"
              : "Dentist"}
          </Modal.Title>
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
            <Form.Group controlId="dob">
              <Form.ControlLabel>Date of birth</Form.ControlLabel>
              <Form.Control
                isoWeek
                format="dd-MM-yyyy"
                placement="auto"
                name="dob"
                accepter={DatePicker}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group controlId="gender">
              <Form.ControlLabel>Gender</Form.ControlLabel>
              <RadioGroup
                name="gender"
                inline
                appearance="picker"
                defaultValue="male"
                onChange={handleFormChange}
              >
                <Radio value="male" name="gender">
                  male
                </Radio>
                <Radio value="female" name="gender">
                  female
                </Radio>
                <Radio value="other" name="gender">
                  other
                </Radio>
              </RadioGroup>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control name="email" type="email" />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleConfirmAddModal} appearance="primary">
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
