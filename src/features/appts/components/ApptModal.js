import { Box, Typography, Autocomplete, TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { apptsSelector } from "../apptSlice";
import {
  assistantsSelectors,
  dentistsSelectors,
  clientsSelectors
} from "../../users/userSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#333",
  color: "white",
  border: "3px solid #ccc",
  boxShadow: 24,
  borderRadius: "10px",
  pr: 4,
  pl: 4,
  pt: 2,
  pb: 2
};

const format_time = (time) => (time < 10 ? `0${time}.00` : `${time}.00`);

const ApptModal = React.forwardRef((props, ref) => {
  const { purpose } = props;

  const appt_id = useSelector((state) => state.ui.apptToEdit);
  const allAssistants = useSelector(assistantsSelectors.selectAll);
  const allDentists = useSelector(dentistsSelectors.selectAll);
  const allClients = useSelector(clientsSelectors.selectAll);

  const listOfWholeNamesOfAllClients = allClients.map(
    (client) => client.first_name + " " + client.last_name
  );
  const listOfWholeNamesOfAllDentists = allDentists.map(
    (dentist) => dentist.first_name + " " + dentist.last_name
  );
  const listOfWholeNamesOfAllAssistants = allAssistants.map(
    (assistants) => assistants.first_name + " " + assistants.last_name
  );

  const appt = useSelector((state) => apptsSelector.selectById(state, appt_id));
  console.log(purpose, appt_id, appt);
  const client = useSelector((state) =>
    clientsSelectors.selectById(state, appt.client_id)
  );
  const dentist = useSelector((state) =>
    dentistsSelectors.selectById(state, appt.dentist_id)
  );
  const assistant = useSelector((state) =>
    assistantsSelectors.selectById(state, appt.assistant_id)
  );
  const clientWholeName = client.first_name + " " + client.last_name;
  const dentistWholeName = dentist.first_name + " " + dentist.last_name;
  const assistantWholeName = assistant.first_name + " " + assistant.last_name;

  const time = appt.hour;
  const day = appt.day;
  const title = "Edit Appointment on day " + day + " at " + format_time(time);

  return (
    <div {...props} ref={ref}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Autocomplete
          value={clientWholeName}
          id="client"
          options={listOfWholeNamesOfAllClients}
          sx={{ width: 400, mt: 2 }}
          renderInput={(props) => <TextField {...props} label="Client" />}
        />
        <Autocomplete
          value={dentistWholeName}
          id="dentist"
          options={listOfWholeNamesOfAllDentists}
          sx={{ width: 400, mt: 2 }}
          renderInput={(props) => <TextField {...props} label="Dentist" />}
        />
        <Autocomplete
          value={assistantWholeName}
          id="assistant"
          options={listOfWholeNamesOfAllAssistants}
          sx={{ width: 400, mt: 2 }}
          renderInput={(props) => <TextField {...props} label="Assistant" />}
        />
      </Box>
    </div>
  );
});

export default ApptModal;
