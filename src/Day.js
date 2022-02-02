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

const ConstructAppt = (props) => {
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
};

const Day = (props) => {
  const { appointments, hour } = props;
  console.log(props, appointments, appointments.length);
  return (
    <ul>
      {appointments.map((appointment) => {
        return (
          <AppointmentInDay
            key={appointment.id}
            appt={ConstructAppt(appointment)}
            hour={hour}
          />
        );
      })}
    </ul>
  );
};

// Day.propTypes = { appointment: PropTypes.object };

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
