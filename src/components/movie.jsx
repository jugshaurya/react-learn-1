import React from "react";

const Movie = props => {
  const { title, genre, numberInStock, dailyRentalRate, _id } = props.movie;
  return (
    <tr>
      <th>{title}</th>
      <td>{genre.name}</td>
      <td>{numberInStock}</td>
      <td>{dailyRentalRate}</td>
      <td>
        <button className="btn btn-danger" onClick={() => props.onDelete(_id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Movie;
