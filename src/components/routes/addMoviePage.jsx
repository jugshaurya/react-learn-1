import React from "react";
import { Link } from "react-router-dom";
class AddMoviePage extends React.Component {
  state = {
    data: "",
    movies: []
  };

  handleChange = e => {
    const value = e.target.value;
    this.setState({ data: value });
  };

  handleSearch = async e => {
    e.preventDefault();
    const movieURL = "http://localhost:4000/api/movies";
    // call the server to retreive the movies
    const response = await fetch(movieURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({
        movie: this.state.data
      })
    });

    const movies = await response.json();
    this.setState({ movies });
  };

  render() {
    return (
      <div className="container">
        <h3 className="mb-5 mt-2 row">Add Movie Page </h3>
        <div>
          <form onSubmit={this.handleSearch}>
            <div className="form-group">
              <label htmlFor="add">Search Movies to Add</label>
              <input
                type="text"
                className="form-control"
                id="add"
                placeholder="Search..."
                value={this.state.data}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>

        <div className="mt-5">
          <div className="result">
            {this.state.movies.map(movie => {
              return (
                <>
                  <div className="mt-5 mr-4 card" key={movie.id}>
                    <img
                      src={movie.posterURL}
                      className="card-img-top"
                      alt="posterurl"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text">{movie.overview}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        Language: {movie.language}
                      </li>
                      <li className="list-group-item">
                        Rating: {movie.rating}
                      </li>
                      <li className="list-group-item">
                        Release Date: {movie.release_date}
                      </li>
                      <li className="list-group-item">Movie ID: {movie.id}</li>
                      <li className="list-group-item">
                        Genres: {movie.genre_ids}
                      </li>
                    </ul>
                    <div className="card-body">
                      <Link to={movie.backdropURL} className="backimg-link">
                        More Image
                      </Link>
                    </div>
                    <div className="save-btn">
                      <img src="images/save.svg" alt="save movie" width="50" />
                      <h5>save</h5>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default AddMoviePage;
