import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Stack, Box, Divider, Modal, Button } from "@mui/material";

import { useFormik } from "formik";
import { setAddModalOpen } from "../../ui/uiSlice";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const AddModal = ({ addModalOpen }) => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.ui.userType);
  const formValue = useSelector((state) => state.ui.formValue);
  const handleCloseAddModal = () => {
    dispatch(setAddModalOpen(false));
  };
  const handleFormChange = (e) => {
    console.log(e.target.value);
    // if (typeof e === "object") {
    //   console.log(e);
    //   dispatch(setFormValue(e));
    // } else {
    //   console.log((formValue.gender = e));
    //   dispatch(setFormValue((formValue.gender = e)));
    // }
    //dispatch(setFormValue(e));
  };

  const handleConfirmAddModal = () => {};

  return (
    <div>
      <Modal open={addModalOpen} onClose={handleCloseAddModal}>
        {/* <Modal.Header>
          <Modal.Title>
            New{" "}
            {userType === "clients"
              ? "Client"
              : userType === "assistants"
              ? "Assistant"
              : "Dentist"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>

        <Modal.Footer> */}
        <Button onClick={handleConfirmAddModal} appearance="primary">
          Confirm
        </Button>
        <Button onClick={handleCloseAddModal} appearance="subtle">
          Cancel
        </Button>
        {/* </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default memo(AddModal);
