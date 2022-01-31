import React from "react";
import Users from "./features/users/Users";

export default (props) => {
  const {
    totalAssistants,
    totalDentists,
    totalClients,
    allAssistants,
    allDentists,
    allClients,
    isLoading
  } = props;

  return (
    <div>
      <Users
        totalAssistants={totalAssistants}
        allAssistants={allAssistants}
        totalDentists={totalDentists}
        allDentists={allDentists}
        totalClients={totalClients}
        allClients={allClients}
        isLoading={isLoading}
      />
    </div>
  );
};
