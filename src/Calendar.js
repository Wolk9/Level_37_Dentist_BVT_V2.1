import React from "react";
import "./Calendar.css";
import DayInMonth from "./DayInMonth";

const divideByDay = (appointments) => {
  const appointmentsByDay = [
    [0],
    [1],
    [2],
    [3],
    [4],
    [5],
    [6],
    [7],
    [8],
    [9],
    [10],
    [11],
    [12],
    [13],
    [14],
    [15],
    [16],
    [17],
    [18],
    [19],
    [20],
    [21],
    [22],
    [23],
    [24],
    [25],
    [26],
    [27],
    [28],
    [29],
    [30]
  ];
  appointments.forEach((appointment) => {
    const day = appointment.day;
    if (!appointmentsByDay.hasOwnProperty(day)) {
      appointmentsByDay[day] = [{ day: day }];
    }
    appointmentsByDay[day].push(appointment);
  });
  console.log(appointmentsByDay);

  return appointmentsByDay;
};

// Export Calender for App

//TODO:  Each child in a list should have a unique "key" prop.

const Calendar = ({
  appointments,
  handleClickOnAppt,
  handleCancelApptEdit
}) => {
  console.log(appointments);
  const appointmentsByDay = divideByDay(appointments);
  console.log(appointmentsByDay);

  const daysInMonthJSX = appointmentsByDay.map((appointmentsInDay, index) => (
    <DayInMonth
      key={index}
      appointments={appointmentsInDay}
      handleClickOnAppt={handleClickOnAppt}
      handleCancelApptEdit={handleCancelApptEdit}
    />
  ));

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

export default Calendar;
