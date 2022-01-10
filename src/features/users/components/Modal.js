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

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
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

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: ""
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <div>
      <Modal open={addModalOpen} onClose={handleCloseAddModal}>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          {formik.errors.firstName ? (
            <div>{formik.errors.firstName}</div>
          ) : null}

          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}

          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default memo(AddModal);
