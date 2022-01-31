import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  assistantsSelectors,
  dentistsSelectors,
  clientsSelectors
} from "./features/users/userSlice";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./Home";
import Calendar from "./Calendar";
import Day from "./Day";
import UserManagement from "./UserManagement";

import generateRandomAppointments from "./utils";

import { ThemeProvider, createTheme } from "@mui/material";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import nlLocale from "date-fns/locale/fr";
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

const appointments = generateRandomAppointments(70);

const App = () => {
  const dispatch = useDispatch();
  const totalAssistants = useSelector(assistantsSelectors.selectTotal);
  const allAssistants = useSelector(assistantsSelectors.selectAll);
  const totalDentists = useSelector(dentistsSelectors.selectTotal);
  const allDentists = useSelector(dentistsSelectors.selectAll);
  const totalClients = useSelector(clientsSelectors.selectTotal);
  const allClients = useSelector(clientsSelectors.selectAll);
  const isLoading = useSelector((state) => state.users.loading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/calendar">Calendar view</Link>
                </li>
                <li>
                  <Link to="/day">Day view</Link>
                </li>
                <li>
                  <Link to="/usermanagement">User Management</Link>
                </li>
              </ul>
            </nav>
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
                  <Calendar appointments={appointments} />
                </Route>
                <Route path="/day">
                  <Day
                    appointments={appointments.filter((app) => app.day === 1)}
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
  );
};
export default App;
