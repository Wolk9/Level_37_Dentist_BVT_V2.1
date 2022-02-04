import React from "react";
import AppointmentInMonth from "./AppointmentInMonth";
import { useSelector } from "react-redux";
import {
  assistantsSelectors,
  dentistsSelectors,
  clientsSelectors
} from "./features/users/userSlice";
import { ListItem, ListItemAvatar, Avatar, Tooltip } from "@mui/material";

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

// export the appointments per day for the Calander component:

let day = 0;

const DayInMonth = (props) => {
  const { appointments, handleClickOnAppt } = props;
  console.log(appointments);
  day = appointments[0] + 1;
  if (appointments.length === 1) {
    return (
      <div className="day">
        <ListItem>
          <ListItemAvatar>
            <Avatar
              sx={{
                bgcolor: "deepskyblue",
                color: "white",
                fontSize: 14,
                fontWeight: "bold",
                mt: -1,
                ml: -1
              }}
            >
              {day}
            </Avatar>
          </ListItemAvatar>
        </ListItem>
        <AppointmentInMonth
          appt={appointments}
          key={appointments.key}
          actors={{ client: undefined }}
        />
      </div>
    );
  } else {
    const appointmentsJSX = appointments.map((appointment) => (
      <AppointmentInMonth
        appt={appointment}
        actors={ConstructActors(appointment)}
        key={appointment.key}
        handleClickOnAppt={handleClickOnAppt}
      />
    ));

    return (
      <div className="day">
        <ListItem>
          <ListItemAvatar>
            <Avatar
              sx={{
                bgcolor: "deepskyblue",
                color: "white",
                fontSize: 14,
                fontWeight: "bold",
                mt: -1,
                ml: -1
              }}
            >
              {day}
            </Avatar>
          </ListItemAvatar>
        </ListItem>
        {appointmentsJSX}
      </div>
    );
  }
};

export default DayInMonth;
