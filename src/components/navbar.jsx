import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        RememberMyMovies
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <NavLink className="nav-link nav-item" to="/add">
            Add-Movies <span className="sr-only">(current)</span>
          </NavLink>
          <NavLink className="nav-link nav-item" to="/movies">
            Saved-Movies
          </NavLink>
          <NavLink className="nav-link nav-item" to="/later">
            Watch-Later
          </NavLink>
          <NavLink className="nav-link nav-item" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-link nav-item" to="/register">
            Register
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;