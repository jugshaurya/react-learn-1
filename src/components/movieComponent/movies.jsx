import React from "react";
import Movie from "./movie";
const Movies = props => {
  const {
    movies,
    onDelete,
    onLikeToggle,
    onSort,
    sortingField,
    orderBy
  } = props;

  const arrow =
    orderBy === "asc" ? "fa fa-sort-up ml-2" : "fa fa-sort-down ml-2";

  return (
    <div className="container mt-5">
      <small> Click on Table Heading to sort by asc or desc</small>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" onClick={() => onSort("title")}>
              Title
              {sortingField === "title" ? <i className={arrow}></i> : ""}
            </th>
            <th scope="col" onClick={() => onSort("genre")}>
              Genre
              {sortingField === "genre" ? <i className={arrow}></i> : ""}
            </th>
            <th scope="col" onClick={() => onSort("numberInStock")}>
              InStock
              {sortingField === "numberInStock" ? (
                <i className={arrow}></i>
              ) : (
                ""
              )}
            </th>
            <th scope="col" onClick={() => onSort("dailyRentalRate")}>
              Rate
              {sortingField === "dailyRentalRate" ? (
                <i className={arrow}></i>
              ) : (
                ""
              )}
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
