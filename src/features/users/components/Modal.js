import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Input, Button, Whisper, Tooltip, Placeholder } from "rsuite";
import {
  setFormValue,
  setEditModalOpen,
  setAddModalOpen
} from "../../ui/uiSlice";

const AddModal = ({ addModalOpen }) => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.ui.userType);
  const formValue = useSelector((state) => state.ui.formValue);
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

  const handleConfirmAddModal = () => {};

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
          <label>Disabled:</label>
          <Input placeholder="Default Input"></Input>
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
