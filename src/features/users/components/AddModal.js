import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  ButtonGroup,
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Modal,
  RadioGroup,
  Radio,
  TextField
} from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

import { setFormValue } from "../../ui/uiSlice";

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

export default (props) => {
  const { handleCloseAddModal, open, handleConfirmAddModal, handleFormChange } =
    props;
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.ui.userType);
  const formValue = useSelector((state) => state.ui.formValue);

  const modalStyle = {
    color: "#eee",
    position: "absolute",
    top: "400px",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "rgba(30, 30, 30, 0.98)",
    border: "3px solid #ccc",
    borderRadius: "10px",
    boxShadow: 24,
    pt: 4,
    pb: 2,
    pl: 4,
    pr: 4
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseAddModal}
        aria-level="1"
        aria-labelledby="id..."
      >
        <Box sx={modalStyle}>
          <div>
            <h2 id="modal-title">Add {userType}</h2>
            <FormControl fullWidth color="primary">
              <TextField
                sx={{ mt: 4 }}
                id="first_name"
                label="First Name"
                variant="outlined"
                helperText="required"
                placeholder="First Name"
                onChange={handleFormChange}
              >
                First Name
              </TextField>
              <TextField
                sx={{ mt: 2 }}
                id="last_name"
                label="Last Name"
                variant="outlined"
                helperText="required"
                placeholder="Last Name"
                onChange={handleFormChange}
              >
                Last Name
              </TextField>
              <TextField
                sx={{ mt: 2 }}
                id="email"
                label="Email"
                variant="outlined"
                helperText="We shall never share your email"
                placeholder="Email"
                onChange={handleFormChange}
              >
                Email address
              </TextField>
              <TextField
                sx={{ mt: 2, mb: 4 }}
                id="phone"
                label="Phone"
                variant="outlined"
                placeholder="Phonenumber"
                onChange={handleFormChange}
              >
                Email address
              </TextField>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <DesktopDatePicker
                    id="dob"
                    label="Date of Birth"
                    inputFormat="DD/MM/YYYY"
                    placeholder="13/07/1970"
                    onChange={(date) => {
                      console.log(date);
                      if (date === null) {
                        return setFormValue({
                          ...formValue,
                          dob: 0
                        });
                      }
                      dispatch(
                        setFormValue({
                          ...formValue,
                          dob: date.$D + "/" + (date.$M + 1) + "/" + date.$y
                        })
                      );
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <RadioGroup
                    name="row-radio-buttons-group"
                    row
                    aria-label="gender"
                    appearance="picker"
                    defaultValue="male"
                    onChange={handleFormChange}
                  >
                    <FormControlLabel
                      value="female"
                      id="gender"
                      control={<Radio id="gender" />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      id="gender"
                      control={<Radio id="gender" />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      id="gender"
                      control={<Radio id="gender" />}
                      label="Other"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </FormControl>
            <Grid container direction="row" justifyContent="flex-end">
              <Grid item>
                <ButtonGroup>
                  <Button onClick={handleConfirmAddModal} variant="contained">
                    Confirm
                  </Button>
                  <Button onClick={handleCloseAddModal} variant="outlined">
                    Cancel
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
