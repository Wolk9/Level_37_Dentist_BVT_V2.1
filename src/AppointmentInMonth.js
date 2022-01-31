import React from "react";

// Here the time is given a preceding zero if the time is not 10, 11 or 12.

const format_time = (time) => (time < 10 ? `0${time}:00u` : `${time}:00u`);

//  export the record with time and patient for DayInMonth:

export default ({ time, patient }) => (
  <div className="appointment">
    <span className="time">{format_time(time)}</span>
    <span className="patient">{patient}</span>
  </div>
);
