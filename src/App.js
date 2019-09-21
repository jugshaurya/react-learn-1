import React from "react";

// Dependency-Components
import Navbar from "./components/movieComponent/navbar";
import Movies from "./components/movieComponent/movies";
import Pagination from "./components/movieComponent/pagination";
import ListGroup from "./components/movieComponent/listgroup";

// Styling
import "./App.css";

//  helper function
import { getMovies } from "./services/fakeMovieService";
import { getGenres } from "./services/fakeGenreService";
import {
  paginate,
  filterMovies
} from "./components/movieComponent/utils/helper";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: getMovies(),
      pageSize: 4,
      currentPage: 1,
      genres: getGenres(),
      currentGenre: "all"
    };
  }

  handleDelete = buttonId => {
    const movies = this.state.movies.filter(movie => movie._id !== buttonId);
    this.setState({ movies });
  };

  handleLikeToggle = id => {
    const movies = this.state.movies.map(movie => {
      const movieCopy = { ...movie };
      if (movieCopy._id === id) {
        movieCopy.liked = !movieCopy.liked;
      }
      return movieCopy;
    });

    this.setState({ movies });
  };

  handlePagination = pageNumber => {
    this.setState({ currentPage: pageNumber });
  };

  handleGenrePick = genreName => {
    this.setState({ currentGenre: genreName, currentPage: 1 });
  };

  render() {
    const { movies, pageSize, currentPage, genres, currentGenre } = this.state;

    const filteredMovies = filterMovies(movies, currentGenre);
    const pageMovies = paginate(filteredMovies, currentPage, pageSize);

    return (
      <>
        <Navbar moviesCount={movies.length} />
        <div className="container">
          <div className="row">
            <div className="col-3 mt-5">
              <ListGroup
                genres={genres}
                onGenrePick={this.handleGenrePick}
                activeGenre={currentGenre}
              />
            </div>
            <div className="col mt-5">
              <Movies
                movies={pageMovies}
                onDelete={this.handleDelete}
                onLikeToggle={this.handleLikeToggle}
              />
              <Pagination
                pageSize={pageSize}
                totalItems={filteredMovies.length}
                onPaginate={this.handlePagination}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
