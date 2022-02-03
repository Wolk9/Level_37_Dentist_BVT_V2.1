import React from "react";
import "./Calendar.css";
import DayInMonth from "./DayInMonth";

const divideByDay = (appointments) => {
  const appointmentsByDay = [];
  appointments.forEach((appointment) => {
    const day = appointment.day;
    if (!appointmentsByDay.hasOwnProperty(day)) {
      appointmentsByDay[day] = [];
    }
    appointmentsByDay[day].push(appointment);
  });
  console.log(appointmentsByDay);

  return appointmentsByDay;
};

// Export Calender for App

//TODO:  Each child in a list should have a unique "key" prop.

export default ({ appointments }) => {
  console.log(appointments);
  const appointmentsByDay = divideByDay(appointments);
  console.log(appointmentsByDay);

  const daysInMonthJSX = Object.values(appointmentsByDay).map(
    (appointmentsInDay, index) => (
      <DayInMonth key={index} appointments={appointmentsInDay} />
    )
  );

  console.log(daysInMonthJSX);

  return (
    <div className="calendarview">
      <div className="header">
        <div>Maandag</div>
        <div>Dinsdag</div>
        <div>Woensdag</div>
        <div>Donderdag</div>
        <div>Vrijdag</div>
      </div>
      <div className="table">{daysInMonthJSX}</div>
    </div>
  );
};
