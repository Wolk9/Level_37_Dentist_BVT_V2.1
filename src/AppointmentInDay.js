import React from "react";

const format_time = (hour) => (hour < 10 ? `0${hour}:00u` : `${hour}:00u`);

const AppointmentInDay = (props) => {
  const { appts, hour } = props;
  console.log(hour, appts);
  return (
    <li className="appointment">
      <div className="time">{format_time(hour)}</div>
      <div className="client">Client: {appts.client.first_name}</div>
      <div className="dentist">Dentist: {appts.dentist.first_name}</div>
      <div className="assistant">Assistant: {appts.assistant.first_name}</div>
    </li>
  );
};

export default AppointmentInDay;
