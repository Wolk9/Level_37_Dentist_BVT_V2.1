import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  assistantsSelectors,
  dentistsSelectors,
  clientsSelectors
} from "../users/userSlice";
import User from "../users/components/User";

const Users = () => {
  const dispatch = useDispatch();
  const totalAssistants = useSelector(assistantsSelectors.selectTotal);
  const allAssistants = useSelector(assistantsSelectors.selectAll);
  const totalDentists = useSelector(dentistsSelectors.selectTotal);
  const allDentists = useSelector(dentistsSelectors.selectAll);
  const totalClients = useSelector(clientsSelectors.selectTotal);
  const allClients = useSelector(clientsSelectors.selectAll);

  console.log({
    totalAssistants,
    allAssistants,
    totalDentists,
    allDentists,
    totalClients,
    allClients
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return <User title="Dentists" users={allDentists} />;
};

export default Users;
