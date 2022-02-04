import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  assistantsSelectors,
  dentistsSelectors,
  clientsSelectors
} from "./features/users/userSlice";
import { fetchAppts, apptsSelector } from "./features/appts/apptSlice";
import { setApptModalOpen, setApptToEdit } from "./features/ui/uiSlice";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import MainNavigation from "./components/layout/MainNavigation";
import Home from "./Home";
import Calendar from "./Calendar";
import Day from "./Day";
import UserManagement from "./UserManagement";
import ApptModal from "./features/appts/components/ApptModal";
import { ThemeProvider, createTheme, Modal } from "@mui/material";
import * as dayjs from "dayjs";
import "dayjs/locale/nl";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});

dayjs.locale("nl");

// const appointments = generateRandomAppointments(70);

const App = () => {
  const dispatch = useDispatch();
  const totalAssistants = useSelector(assistantsSelectors.selectTotal);
  const allAssistants = useSelector(assistantsSelectors.selectAll);
  const totalDentists = useSelector(dentistsSelectors.selectTotal);
  const allDentists = useSelector(dentistsSelectors.selectAll);
  const totalClients = useSelector(clientsSelectors.selectTotal);
  const allClients = useSelector(clientsSelectors.selectAll);
  const isLoading = useSelector((state) => state.users.loading);
  const allAppts = useSelector(apptsSelector.selectAll);
  const apptModalOpen = useSelector((state) => state.ui.apptModalOpen);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchAppts());
  }, [dispatch]);

  const handleClickOnAppt = (e) => {
    console.log("appt id: ", e);
    dispatch(setApptModalOpen(true));
    dispatch(setApptToEdit(e.appt_id));
  };

  const handleCancelApptEdit = (e) => {
    console.log(e.target);
    dispatch(setApptModalOpen(false));
  };

  const handleApptModelClose = (e) => {
    console.log(e.target);
    dispatch(setApptModalOpen(false));
  };

  console.log(allAppts);
  console.log(apptModalOpen);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <Router>
            <div>
              <MainNavigation />
              <main>
                <Modal open={apptModalOpen} onClose={handleApptModelClose}>
                  <ApptModal purpose="edit" />
                </Modal>
                <Switch>
                  <Route path="/usermanagement">
                    <UserManagement
                      totalAssistants={totalAssistants}
                      allAssistants={allAssistants}
                      totalDentists={totalDentists}
                      allDentists={allDentists}
                      totalClients={totalClients}
                      allClients={allClients}
                      isLoading={isLoading}
                    />
                  </Route>
                  <Route path="/calendar">
                    <Calendar
                      appointments={allAppts}
                      handleClickOnAppt={handleClickOnAppt}
                      handleCancelApptEdit={handleCancelApptEdit}
                    />
                  </Route>
                  <Route path="/day">
                    <Day
                      appointments={allAppts}
                      handleClickOnAppt={handleClickOnAppt}
                      handleCancelApptEdit={handleCancelApptEdit}
                      // appointments={allAppts.filter((app) => app.day === 2)}
                    />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </main>
            </div>
          </Router>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;

//ThemeProvider theme={darkTheme}
