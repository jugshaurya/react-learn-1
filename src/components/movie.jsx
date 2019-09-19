import React, { Component } from "react";

class Movie extends Component {
  render() {
    return (
      <tr>
        <th>{this.props.movie.title}</th>
        <td>{this.props.movie.genre.name}</td>
        <td>{this.props.movie.numberInStock}</td>
        <td>{this.props.movie.dailyRentalRate}</td>
        <td>
          <button className="btn btn-danger" onClick={this.props.onDelete}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default Movie;
