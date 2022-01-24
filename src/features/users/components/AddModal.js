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
  Switch,
  TextField
} from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { makeStyles, ThemeProvider, useTheme } from "@mui/styles";

import { setFormValue, setFormError } from "../../ui/uiSlice";

// const validate = (values) => {
//   const errors = {};
//   if (!values.firstName) {
//     errors.firstName = "Required";
//   } else if (values.firstName.length > 15) {
//     errors.firstName = "Must be 15 characters or less";
//   }

//   if (!values.lastName) {
//     errors.lastName = "Required";
//   } else if (values.lastName.length > 20) {
//     errors.lastName = "Must be 20 characters or less";
//   }

//   if (!values.email) {
//     errors.email = "Required";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = "Invalid email address";
//   }

//   return errors;
// };

export default function AddModal(props) {
  const { handleCloseModal, open, handleConfirmAddModal, handleFormChange } =
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
        onClose={handleCloseModal}
        aria-level="1"
        aria-labelledby="id..."
      >
        <Box sx={modalStyle}>
          <form>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <h2 id="modal-title">
                  Add new{" "}
                  {userType === "clients"
                    ? "Client"
                    : userType === "dentists"
                    ? "Dentist"
                    : "Assistant"}
                </h2>
              </Grid>
              <Grid item>
                <FormControlLabel
                  value={formValue.availability}
                  control={
                    <Switch
                      defaultChecked
                      id="availability"
                      name="availability"
                      onChange={handleFormChange}
                      inputProps={{ "aria-label": "availability" }}
                    />
                  }
                  label={formValue.availability ? "Available" : "Sick"}
                  labelPlacement="start"
                />
              </Grid>
            </Grid>
            <Grid container columns={2}>
              <Grid item sx={{ width: "50%" }}>
                <TextField
                  sx={{ width: "90%", margin: "5px" }}
                  id="first_name"
                  name="first_name"
                  label="First Name"
                  variant="outlined"
                  helperText="required"
                  placeholder="First Name"
                  value={formValue.first_name}
                  onChange={handleFormChange}
                >
                  First Name
                </TextField>
                <TextField
                  sx={{ width: "90%", margin: "5px" }}
                  id="last_name"
                  name="last_name"
                  label="Last Name"
                  variant="outlined"
                  helperText="required"
                  placeholder="Last Name"
                  value={formValue.last_name}
                  onChange={handleFormChange}
                >
                  Last Name
                </TextField>
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
              <Grid item sx={{ width: "50%" }}>
                <TextField
                  sx={{ width: "90%", margin: "5px" }}
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  helperText="We shall never share your email"
                  placeholder="Email"
                  onChange={handleFormChange}
                >
                  Email address
                </TextField>
                <TextField
                  sx={{ width: "90%", margin: "5px" }}
                  id="phone"
                  name="phone"
                  label="Phone"
                  variant="outlined"
                  placeholder="Phonenumber"
                  onChange={handleFormChange}
                >
                  Email address
                </TextField>
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
                    name="gender"
                    control={<Radio id="gender" name="gender" />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    id="gender"
                    name="gender"
                    control={<Radio id="gender" name="gender" />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    id="gender"
                    name="gender"
                    control={<Radio id="gender" name="gender" />}
                    label="Other"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <FormControl fullWidth color="primary"></FormControl>
            <Grid container direction="row" justifyContent="flex-end">
              <Grid item>
                <ButtonGroup>
                  <Button onClick={handleConfirmAddModal} variant="contained">
                    Confirm
                  </Button>
                  <Button onClick={handleCloseModal} variant="outlined">
                    Cancel
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
