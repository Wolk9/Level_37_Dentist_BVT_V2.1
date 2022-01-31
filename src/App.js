import React from "react";
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

const App = () => (
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
                <UserManagement />
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
export default App;
