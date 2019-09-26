import React from "react";

// Dependency-Components
import MoviesTable from "./moviesTable";
import Pagination from "./pagination";
import ListGroup from "./listgroup";

//  helper function
import { getMovies } from "./services/fakeMovieService";
import { getGenres } from "./services/fakeGenreService";
import { paginate, filterMovies, sortMovies } from "./utils/helper";

class MoviesPage extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: getMovies(),
      pageSize: 4,
      currentPage: 1,
      genres: getGenres(),
      currentGenre: "all",
      sortingField: "title",
      order: "asc"
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

  handleSorting = field => {
    if (this.state.sortingField === field) {
      // toggle the order
      const order = this.state.order === "asc" ? "desc" : "asc";
      this.setState({ order: order });
    } else {
      // default it to 'asc' order
      this.setState({ sortingField: field, order: "asc" });
    }
  };

  render() {
    const {
      movies,
      pageSize,
      currentPage,
      genres,
      currentGenre,
      sortingField,
      order
    } = this.state;

    const filteredMovies = filterMovies(movies, currentGenre);
    const sortedMovies =
      sortingField === ""
        ? filteredMovies
        : sortMovies(filteredMovies, sortingField, order);
    const pageMovies = paginate(sortedMovies, currentPage, pageSize);

    return (
      <>
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
              <MoviesTable
                movies={pageMovies}
                onDelete={this.handleDelete}
                onLikeToggle={this.handleLikeToggle}
                onSort={this.handleSorting}
                orderBy={order}
                sortingField={sortingField}
                totalItems={filteredMovies.length}
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

export default MoviesPage;
