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

export default function EditModal(props) {
  const { handleCloseModal, open, handleConfirmEditModal, handleFormChange } =
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
                  Edit{" "}
                  {userType === "clients"
                    ? "Client"
                    : userType === "dentists"
                    ? "Dentist"
                    : "Assistant"}{" "}
                </h2>
              </Grid>
              <Grid item sx={{ mr: "5%" }}>
                <FormControlLabel
                  value={formValue.availability}
                  control={
                    <MaterialUISwitch
                      sx={{ m: 1 }}
                      defaultChecked
                      id="availability"
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
            <FormControl fullWidth color="primary">
              <TextField
                sx={{ mt: 4 }}
                id="first_name"
                label="First Name"
                variant="outlined"
                helperText="required"
                value={formValue.first_name}
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
                value={formValue.last_name}
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
                value={formValue.email}
                onChange={handleFormChange}
              >
                Email address
              </TextField>
              <TextField
                sx={{ mt: 2, mb: 4 }}
                id="phone"
                label="Phone"
                variant="outlined"
                value={formValue.phone}
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
                    value={formValue.dob}
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
                    value={formValue.gender}
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
                  <Button onClick={handleConfirmEditModal} variant="contained">
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
