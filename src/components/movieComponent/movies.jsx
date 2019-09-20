import React from "react";
import Movie from "./movie";
const Movies = props => {
  const { movies, onDelete, onLikeToggle } = props;
  return (
    <div className="container mt-5">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">InStock</th>
            <th scope="col">Rate</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <Movie
              key={movie._id}
              movie={movie}
              onDelete={onDelete}
              onLikeToggle={onLikeToggle}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Movies;