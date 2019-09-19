import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand">
          Navbar
          <h3 className="badge badge-secondary ml-5">
            {this.props.moviesCount == 0
              ? "There are no more movies in DB"
              : this.props.moviesCount}
          </h3>
        </span>
      </nav>
    );
  }
}

export default Navbar;
