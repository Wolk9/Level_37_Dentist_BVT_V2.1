import React from "react";
import AppointmentInMonth from "./AppointmentInMonth";
import { useSelector } from "react-redux";
import {
  assistantsSelectors,
  dentistsSelectors,
  clientsSelectors
} from "./features/users/userSlice";
import { Tooltip } from "@mui/material";

const ConstructActors = (props) => {
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

// export the appointments per day for the Calander component:

const DayInMonth = (props) => {
  const { appointments } = props;
  console.log(appointments);
  if (appointments.length === 1) {
    return (
      <div className="day">
        <AppointmentInMonth
          appt={appointments}
          key={appointments.key}
          actors={{ client: undefined }}
        />
      </div>
    );
  } else {
    const appointmentsJSX = appointments.map((appointment) => (
      <AppointmentInMonth
        appt={appointment}
        actors={ConstructActors(appointment)}
        key={appointment.key}
      />
    ));
    return <div className="day">{appointmentsJSX}</div>;
  }
};

export default DayInMonth;
