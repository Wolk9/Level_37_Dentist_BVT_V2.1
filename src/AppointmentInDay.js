import { ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material";
import React from "react";

const format_time = (hour) => (hour < 10 ? `0${hour}:00` : `${hour}:00`);

const AppointmentInDay = (props) => {
  const { appt, hour } = props;
  console.log(hour, appt);
  const client = appt.client.first_name + " " + appt.client.last_name;
  const dentist = appt.dentist.first_name + " " + appt.dentist.last_name;
  const assistant = appt.assistant.first_name + " " + appt.assistant.last_name;
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          sx={{
            bgcolor: "deepskyblue",
            color: "white",
            fontSize: 12,
            fontWeight: "bold",
            p: 0.5,
            mr: 1
          }}
        >
          {format_time(hour)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Client:" secondary={client}></ListItemText>
      <ListItemText primary="Dentist:" secondary={dentist}></ListItemText>
      <ListItemText primary="Assistant:" secondary={assistant}></ListItemText>
    </ListItem>
  );
};

export default AppointmentInDay;
