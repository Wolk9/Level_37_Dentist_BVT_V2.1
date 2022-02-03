import React from "react";
import { Tooltip } from "@mui/material";
import { appendTooltip } from "rsuite/esm/utils";

// Here the time is given a preceding zero if the time is not 10, 11 or 12.

const format_time = (time) => (time < 10 ? `0${time}.00` : `${time}.00`);

//  export the record with time and patient for DayInMonth:

const AppointmentInMonth = ({ actors, appt }) => {
  console.log(actors);
  console.log(appt);
  if (actors.client === undefined) {
    return (
      <div className="appointment">
        {/* <span className="day">{appt.day}</span>
        <br /> */}
      </div>
    );
  } else {
    const client = actors.client.first_name + " " + actors.client.last_name;
    const otherActors =
      "Dentist:" +
      actors.dentist.first_name +
      " " +
      actors.dentist.last_name +
      "<br>" +
      "Assistant:" +
      actors.assistant.first_name +
      " " +
      actors.assistant.last_name;
    return (
      <div className="appointment">
        <span className="day">{appt.day}</span>
        <br />
        <span className="time">{format_time(appt.hour)}</span>
        <span className="patient">{client}</span>
      </div>
    );
  }
};

export default AppointmentInMonth;
