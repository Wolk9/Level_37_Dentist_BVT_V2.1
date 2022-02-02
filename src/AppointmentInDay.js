import React from "react";

const format_time = (hour) => (hour < 10 ? `0${hour}:00u` : `${hour}:00u`);

const AppointmentInDay = (props) => {
  const { appt, hour } = props;
  console.log(hour, appt);
  return (
    <li className="appointment">
      <div className="time">{format_time(hour)}</div>
      <div className="client">Client: {appt.client.first_name}</div>
      <div className="dentist">Dentist: {appt.dentist.first_name}</div>
      <div className="assistant">Assistant: {appt.assistant.first_name}</div>
    </li>
  );
};

export default AppointmentInDay;
