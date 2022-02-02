import React from "react";
import "./Day.css";
import AppointmentInDay from "./AppointmentInDay";
import { useSelector } from "react-redux";
import {
  assistantsSelectors,
  dentistsSelectors,
  clientsSelectors
} from "./features/users/userSlice";

import PropTypes from "prop-types";

function ConstructAppt(props) {
  console.log(props);
  const client = useSelector((state) =>
    clientsSelectors.selectById(state, props.client_id)
  );
  const dentist = useSelector((state) =>
    dentistsSelectors.selectById(state, props.dentist_id)
  );
  const assistant = useSelector((state) =>
    assistantsSelectors.selectById(state, props.assistant_id)
  );

  console.log(client, dentist, assistant);
  return { client, dentist, assistant };
}

function Day(props) {
  const { appointments, hour } = props;
  console.log(appointments, appointments.length);
  const appts = appointments.forEach((appointment) => {
    console.log("forEach", appointment);
    const apptPeople = ConstructAppt(appointment);
    console.log(apptPeople);
    return apptPeople;
  });

  return (
    <div>
      <AppointmentInDay appts={appts} hour={hour} />
    </div>
  );
}

Day.propTypes = { appointment: PropTypes.object };

export default Day;

// const Day2 = (props) => {
//   const { appointments } = props;
//   console.log(appointments);

//   // let appointmentJSX = appointments.map(
//   //   ({ hour, client_id, assistant_id, dentist_id }, index) => {
//   //     const selectedClient = useSelector((state) =>
//   //       clientsSelectors.selectById({ state: state, id: client_id })
//   //     );
//   //     const selectedDentist = useSelector((state) =>
//   //       dentistsSelectors.selectById({ state: state, id: dentist_id })
//   //     );
//   //     const selectedAssistant = useSelector((state) =>
//   //       assistantsSelectors.selectById({ state: state, id: assistant_id })
//   //     );

//   return (
//     <div>
//       <ul className="dayview">
//         <AppointmentInDay
//           hour={hour}
//           client={selectedClient}
//           dentist={selectedDentist}
//           assistant={selectedAssistant}
//           key={index}
//         />
//       </ul>
//     </div>
//   );
// };

// export default Day2;
