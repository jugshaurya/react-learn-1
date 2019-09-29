import React from "react";

// Dependency-Components
import MoviesTable from "../moviesTable";
import Pagination from "../pagination";
import ListGroup from "../listgroup";

//  helper function
import { getMovies } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";
import { filterMovies, sortMovies, paginate } from "../utils/helper";

class MoviesPage extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: getMovies(),
      genres: getGenres(),
      currentGenre: "all",
      pageSize: 4,
      currentPage: 1,
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

    // Filtering - Sorting - Pagination
    const filteredMovies = filterMovies(movies, currentGenre);
    const sortedMovies = sortMovies(filteredMovies, sortingField, order);
    const pageMovies = paginate(sortedMovies, currentPage, pageSize);

    return (
      <>
        <div className="container">
          <div className="row mt-5">
            <div className="col-3">
              <ListGroup
                genres={genres}
                activeGenre={currentGenre}
                onGenrePick={this.handleGenrePick}
              />
            </div>
            <div className="col">
              <MoviesTable
                movies={pageMovies}
                sortingField={sortingField}
                totalItems={filteredMovies.length}
                onDelete={this.handleDelete}
                onLikeToggle={this.handleLikeToggle}
                onSort={this.handleSorting}
                orderBy={order}
              />
              <Pagination
                pageSize={pageSize}
                totalItems={filteredMovies.length}
                currentPage={currentPage}
                onPaginate={this.handlePagination}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MoviesPage;
