import React, { Component } from "react";

import Movie from "./movie";

class Movies extends Component {
  render() {
    return (
      <div className="container mt-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">InStock</th>
              <th scope="col">Rate</th>
            </tr>
          </thead>
          <tbody>
            {this.props.movies.map(movie => (
              <Movie
                key={movie._id}
                movie={movie}
                onDelete={() => this.props.onDelete(movie._id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Movies;
