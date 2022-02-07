import React from "react";
import { useSelector } from "react-redux";
import {
  assistantsSelectors,
  dentistsSelectors,
  clientsSelectors
} from "./userSlice";

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

export default ConstructActors;
