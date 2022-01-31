import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Calendar.css";
import DayInMonth from "./DayInMonth";
import { apptsSelector } from "./features/appts/apptSlice.js";

const sortByTime = (a, b) => {};

const divideByDay = (appointments) => {
  const appointmentsByDay = {};
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

export default ({ appointments }) => {
  const allAppts = useSelector(apptsSelector.selectAll);
  console.log(allAppts);
  const appointmentsByDay = divideByDay(appointments);

  const daysInMonthJSX = Object.values(appointmentsByDay).map(
    (appointmentsInDay, index) => (
      <DayInMonth appointments={appointmentsInDay} key={index} />
    )
  );

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
