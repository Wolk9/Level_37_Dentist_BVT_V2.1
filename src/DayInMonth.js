import React from "react";
import AppointmentInMonth from "./AppointmentInMonth";

// export the appontments per day for the Calander component:

export default ({ appointments }) => {
  const appointmentsJSX = appointments.map(({ time, patient }, index) => (
    <AppointmentInMonth time={time} patient={patient} key={index} />
  ));
  return <div className="day">{appointmentsJSX}</div>;
};
