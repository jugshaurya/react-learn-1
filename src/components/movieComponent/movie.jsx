import React from "react";

const Movie = props => {
  const {
    title,
    genre,
    numberInStock,
    dailyRentalRate,
    _id,
    liked
  } = props.movie;

  let likedClass = "fa fa-heart";
  if (!liked) {
    likedClass += "-o";
  }

  return (
    <tr>
      <th>{title}</th>
      <td>{genre.name}</td>
      <td>{numberInStock}</td>
      <td>{dailyRentalRate}</td>
      <td onClick={() => props.onLikeToggle(_id)}>
        <i className={likedClass} aria-hidden="true"></i>
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => props.onDelete(_id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Movie;
