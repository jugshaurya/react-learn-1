import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink to="/" className="navbar-brand">
        RememberMyMovies
      </NavLink>
      <div id="navbarNav">
        <ul className="nav">
          <NavLink className="nav-item nav-link" to="/add">
            Add-Movies
          </NavLink>

          <NavLink className="nav-item nav-link" to="/movies">
            Saved-Movies
          </NavLink>

          <NavLink className="nav-item nav-link" to="/later">
            Watch-Later
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
