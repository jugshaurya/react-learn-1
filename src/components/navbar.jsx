import React from "react";

const Navbar = props => {
  const { moviesCount } = props;
  return (
    <nav className="navbar navbar-dark bg-dark">
      <span className="navbar-brand">
        Navbar
        <h3 className="badge badge-secondary ml-5">
          {moviesCount === 0 ? "There are no more movies in DB" : moviesCount}
        </h3>
      </span>
    </nav>
  );
};

export default Navbar;
