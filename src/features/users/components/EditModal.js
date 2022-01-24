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

import { styled } from "@mui/material/styles";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

import { setFormValue } from "../../ui/uiSlice";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 22 22"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M21 9c-1.1 0-2-.9-2-2s2-4 2-4 2 2.9 2 4-.9 2-2 2zm-3.5-2c0-.73.41-1.71.92-2.66C16.68 2.88 14.44 2 11.99 2 6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12c0-.55-.06-1.09-.14-1.62-.28.07-.56.12-.86.12-1.93 0-3.5-1.57-3.5-3.5zm-1.88.38 1.06 1.06-1.06 1.06 1.06 1.06-1.06 1.06L13.5 9.5l2.12-2.12zm-8.3 1.06 1.06-1.06L10.5 9.5l-2.12 2.12-1.06-1.06L8.38 9.5 7.32 8.44zM15.44 17c-.69-1.19-1.97-2-3.44-2s-2.75.81-3.44 2H6.88c.3-.76.76-1.43 1.34-1.99L5.24 13.3c-.45.26-1.01.28-1.49 0-.72-.41-.96-1.33-.55-2.05.41-.72 1.33-.96 2.05-.55.48.28.74.78.74 1.29l3.58 2.07c.73-.36 1.55-.56 2.43-.56 2.33 0 4.32 1.45 5.12 3.5h-1.68z"/></svg>')`
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#ff0000" : "#aab4be"
      }
    }
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 23 23"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>')`
    }
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2
  }
}));

export default (props) => {
  const { handleCloseModal, open, handleConfirmEditModal, handleFormChange } =
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
          <div>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <h2 id="modal-title">Edit {userType} </h2>
              </Grid>
              <Grid item>
                <FormControlLabel
                  value={formValue.availability}
                  control={
                    <MaterialUISwitch
                      sx={{ m: 1 }}
                      defaultChecked
                      id="availability"
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
          </div>
        </Box>
      </Modal>
    </div>
  );
};
