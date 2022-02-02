import React from "react";
import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div>
        <h2>Dentist Managment App</h2>
      </div>
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
    </header>
  );
}

export default MainNavigation;
