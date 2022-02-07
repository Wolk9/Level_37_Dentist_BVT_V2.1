import React from "react";
import "./Day.css";
import AppointmentInDay from "./AppointmentInDay";
import ConstructActors from "./features/users/userUtils";
import PropTypes from "prop-types";
import { List } from "@mui/material";

const Day = (props) => {
  const { appointments, handleClickOnAppt } = props;
  console.log(props, appointments, appointments.length);
  return (
    <List
      sx={{
        width: "80%",
        maxWidth: 400,
        bgcolor: "background.paper",
        color: "deepskyblue"
      }}
      value={appointments.id}
      onClick={() =>
        handleClickOnAppt({ appt_id: appointments.id, type: "singleClick" })
      }
    >
      {appointments.map((appointment) => {
        return (
          <AppointmentInDay
            key={appointment.id}
            appt={ConstructActors(appointment)}
            hour={appointment.hour}
          />
        );
      })}
    </List>
  );
};

Day.propTypes = { appointment: PropTypes.object };

export default Day;
