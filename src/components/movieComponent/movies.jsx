import React from "react";
import Movie from "./movie";
const Movies = props => {
  const { movies, onDelete, onLikeToggle, onSort } = props;
  return (
    <div className="container mt-5">
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => onSort("title")} scope="col">
              Title
            </th>
            <th onClick={() => onSort("genre")} scope="col">
              Genre
            </th>
            <th onClick={() => onSort("numberInStock")} scope="col">
              InStock
            </th>
            <th onClick={() => onSort("dailyRentalRate")} scope="col">
              Rate
            </th>
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
