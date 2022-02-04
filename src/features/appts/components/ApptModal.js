import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { apptsSelector } from "../apptSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  color: "white",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  pr: 4,
  pl: 4,
  pt: 2,
  pb: 2
};

const ApptModal = React.forwardRef((props, ref) => {
  const { purpose } = props;
  const title = "Edit Modal";
  const appt_id = useSelector((state) => state.ui.apptToEdit);
  const appt = useSelector((state) => apptsSelector.selectById(state, appt_id));
  console.log(purpose, appt_id, appt);
  return (
    <div {...props} ref={ref}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {appt_id}
        </Typography>
      </Box>
    </div>
  );
});

export default ApptModal;
