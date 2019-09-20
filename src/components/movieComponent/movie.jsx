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

  const { onLikeToggle, onDelete } = props;
  let likedClass = "fa fa-heart";
  if (!liked) {
    likedClass += "-o";
  }

  return (
    <tr>
      <td>{title}</td>
      <td>{genre.name}</td>
      <td>{numberInStock}</td>
      <td>{dailyRentalRate}</td>
      <td onClick={() => onLikeToggle(_id)}>
        <i className={likedClass} aria-hidden="true"></i>
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => onDelete(_id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Movie;
