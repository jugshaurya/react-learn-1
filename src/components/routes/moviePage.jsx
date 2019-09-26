import React from "react";

const MoviePage = props => {
  return (
    <div className="container">
      <h3>Singe Movie-page</h3>
      {props.match.params.id}
    </div>
  );
};

export default MoviePage;
