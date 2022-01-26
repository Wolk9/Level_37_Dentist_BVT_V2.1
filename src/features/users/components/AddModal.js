import React from "react";
import { useSelector } from "react-redux";
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

export default function AddModal(props) {
  const { handleCloseModal, open, handleConfirmAddModal, handleFormChange } =
    props;
  const userType = useSelector((state) => state.ui.userType);
  const formValue = useSelector((state) => state.ui.formValue);
  const formError = useSelector((state) => state.ui.formError);
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
    pb: 4,
    pl: 4,
    pr: 1
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
          <form autoComplete="off">
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
              <Grid item sx={{ mr: "5%" }}>
                <FormControlLabel
                  value={formValue.availability}
                  control={
                    <Switch
                      defaultChecked
                      id="availability"
                      name="availability"
                      value={formValue.availability}
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
                  placeholder="First Name"
                  helperText="Required"
                  value={formValue.first_name}
                  onChange={handleFormChange}
                  {...(formError.first_name && {
                    error: true,
                    helperText: formError.first_name
                  })}
                >
                  First Name
                </TextField>
                <TextField
                  sx={{ width: "90%", margin: "5px" }}
                  id="last_name"
                  name="last_name"
                  label="Last Name"
                  variant="outlined"
                  placeholder="Last Name"
                  helperText="Required"
                  value={formValue.last_name}
                  onChange={handleFormChange}
                  {...(formError.last_name && {
                    error: true,
                    helperText: formError.last_name
                  })}
                >
                  Last Name
                </TextField>
                <TextField
                  id="date"
                  label="Birthday"
                  name="dob"
                  type="date"
                  format="dd/MM/yyyy"
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={handleFormChange}
                  {...(formError.dob && {
                    error: true,
                    helperText: formError.dob
                  })}
                />
                {/* <DesktopDatePicker
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
                /> */}
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
                  value={formValue.email}
                  onChange={handleFormChange}
                  {...(formError.email && {
                    error: true,
                    helperText: formError.email
                  })}
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
                  value={formValue.phone}
                  onChange={handleFormChange}
                  {...(formError.phone && {
                    error: true,
                    helperText: formError.phone
                  })}
                >
                  Email address
                </TextField>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                  sx={{ mt: "5px" }}
                >
                  <Grid item>
                    <RadioGroup
                      name="gender"
                      row
                      aria-label="gender"
                      appearance="picker"
                      value={formValue.gender}
                      onChange={handleFormChange}
                    >
                      <FormControlLabel
                        value="male"
                        id="gender"
                        name="gender"
                        control={<Radio id="gender" name="gender" />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        id="gender"
                        name="gender"
                        control={<Radio id="gender" name="gender" />}
                        label="Female"
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
              </Grid>
            </Grid>
            <FormControl fullWidth color="primary"></FormControl>
            <Grid container direction="row" justifyContent="flex-end">
              <Grid item sx={{ mr: "5%" }}>
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
