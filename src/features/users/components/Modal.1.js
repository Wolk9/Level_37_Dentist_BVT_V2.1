import React from "react";
import { useDispatch } from "react-redux";
import { Modal, Panel } from "rsuite";

import { setEditModalOpen, setAddModalOpen } from "../../ui/uiSlice";

const AddModal = () => {
  const dispatch = useDispatch();
  const addModalOpen = useSelector((state) => state.ui.addModalOpen);
  const userType = useSelector((state) => state.ui.userType);
  const handleCloseAddModal = () => {
    dispatch(setAddModalOpen(false));
  };
  const handleFormChange = (e) => {
    if (typeof e === "object") {
      console.log(e);
      dispatch(setFormValue(e));
    } else {
      console.log((formValue.gender = e));
      dispatch(setFormValue((formValue.gender = e)));
    }
  };

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
          <Form fluid onChange={handleFormChange} value={formValue}>
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
              <Form.Control name="dob" />
              <Form.HelpText>Required dd/mm/yyyy</Form.HelpText>
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
                <Radio value="female" text="female" name="gender">
                  female
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
    </div>
  );
};

export default memo(AddModal);
