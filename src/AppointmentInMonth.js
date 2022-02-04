import React from "react";
import { Tooltip, List, ListItem } from "@mui/material";
import { appendTooltip } from "rsuite/esm/utils";

// Here the time is given a preceding zero if the time is not 10, 11 or 12.

const format_time = (time) => (time < 10 ? `0${time}.00` : `${time}.00`);

//  export the record with time and patient for DayInMonth:

const AppointmentInMonth = ({ actors, appt, handleClickOnAppt }) => {
  console.log(actors);
  console.log(appt, appt.id);
  let id = appt.id;
  let hour = appt.hour;
  if (actors.client === undefined) {
    return (
      <div>
        {/* <span className="day">{appt.day}</span>
        <br /> */}
      </div>
    );
  } else {
    const client = actors.client.first_name + " " + actors.client.last_name;
    return (
      <List
        className="appointment"
        value={id}
        onClick={() => handleClickOnAppt({ appt_id: id, type: "singleClick" })}
        // onMouseOver={() =>
        //   handleClickOnAppt({ appt_id: id, type: "onMouseOver" })
        //}
      >
        <span className="time">{format_time(hour)}</span>
        <span className="patient">{client}</span>
      </List>
    );
  }
};

export default AppointmentInMonth;
