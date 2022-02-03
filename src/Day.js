import React from "react";
import "./Day.css";
import AppointmentInDay from "./AppointmentInDay";
import { useSelector } from "react-redux";
import {
  assistantsSelectors,
  dentistsSelectors,
  clientsSelectors
} from "./features/users/userSlice";
import PropTypes from "prop-types";
import { List } from "@mui/material";

const ConstructActors = (props) => {
  console.log(props);
  const client = useSelector((state) =>
    clientsSelectors.selectById(state, props.client_id)
  );
  const dentist = useSelector((state) =>
    dentistsSelectors.selectById(state, props.dentist_id)
  );
  const assistant = useSelector((state) =>
    assistantsSelectors.selectById(state, props.assistant_id)
  );

  console.log(client, dentist, assistant);
  return { client, dentist, assistant };
};

const Day = (props) => {
  const { appointments, hour } = props;
  console.log(props, appointments, appointments.length);
  return (
    <List
      sx={{
        width: "80%",
        maxWidth: 400,
        bgcolor: "background.paper",
        color: "deepskyblue"
      }}
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
