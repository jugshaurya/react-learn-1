import React from "react";

const ListGroup = props => {
  const { genres, onGenrePick, activeGenre } = props;
  return (
    <>
      <ul className="list-group">
        <li
          key="all"
          onClick={() => {
            return onGenrePick("all");
          }}
          className={
            activeGenre === "all" ? "list-group-item active" : "list-group-item"
          }
        >
          All Genres
        </li>

        {genres.map(genre => {
          return (
            <li
              key={genre._id}
              onClick={() => onGenrePick(genre.name)}
              className={
                activeGenre === genre.name
                  ? "list-group-item active"
                  : "list-group-item"
              }
            >
              {genre.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ListGroup;
