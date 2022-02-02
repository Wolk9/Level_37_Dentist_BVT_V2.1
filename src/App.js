import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  assistantsSelectors,
  dentistsSelectors,
  clientsSelectors
} from "./features/users/userSlice";
import { fetchAppts, apptsSelector } from "./features/appts/apptSlice";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import MainNavigation from "./components/layout/MainNavigation";
import Home from "./Home";
import Calendar from "./Calendar";
import Day from "./Day";
import UserManagement from "./UserManagement";

import { ThemeProvider, createTheme } from "@mui/material";
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

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchAppts());
  }, [dispatch]);

  console.log(allAppts);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <Router>
            <div>
              <MainNavigation />
              <main>
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
                    <Calendar appointments={allAppts} />
                  </Route>
                  <Route path="/day">
                    <Day
                      appointments={allAppts.filter((app) => app.day === 2)}
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
