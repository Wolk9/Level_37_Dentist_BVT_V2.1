import React from "react";

const format_time = (time) => (time < 10 ? `0${time}:00u` : `${time}:00u`);

export default ({ time, patient, dentist, assistant }) => (
  <li className="appointment">
    <div className="time">{format_time(time)}</div>
    <div className="patient">Client: {patient}</div>
    <div className="dentist">Dentist: {dentist}</div>
    <div className="assistant">Assistant: {assistant}</div>
  </li>
);
