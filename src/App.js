import React from "react";
import Navbar from "./components/movieComponent/navbar";
import Movies from "./components/movieComponent/movies";
import { getMovies } from "./services/fakeMovieService";
import "./App.css";
import Pagination from "./components/movieComponent/pagination";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: getMovies(),
      pageSize: 4,
      currentPage: 1
    };
  }

  handleDelete = buttonId => {
    const movies = this.state.movies.filter(movie => movie._id !== buttonId);
    this.setState({ movies });
  };

  handleLikeToggle = id => {
    const movies = this.state.movies.map(movie => {
      const DeepCopiedmovie = { ...movie };
      if (DeepCopiedmovie._id === id) {
        DeepCopiedmovie.liked = !DeepCopiedmovie.liked;
      }
      return DeepCopiedmovie;
    });

    this.setState({ movies });
  };

  handlePagination = pageNumber => {
    this.setState({ currentPage: pageNumber });
  };

  pageMovies = () => {
    const { movies, currentPage, pageSize } = this.state;
    const pageMovieStartingPoint = (currentPage - 1) * pageSize;
    const pageMovieEndingPoint = pageMovieStartingPoint + pageSize;

    const moviesForPage = [];
    for (
      let i = pageMovieStartingPoint;
      i < pageMovieEndingPoint && i < movies.length;
      i++
    ) {
      moviesForPage.push({
        ...movies[i]
      });
    }

    return moviesForPage;
  };

  render() {
    const { movies, pageSize, currentPage } = this.state;
    return (
      <>
        <Navbar moviesCount={movies.length} />
        <Movies
          movies={this.pageMovies()}
          onDelete={this.handleDelete}
          onLikeToggle={this.handleLikeToggle}
        />
        <Pagination
          pageSize={pageSize}
          totalItems={movies.length}
          onPaginate={this.handlePagination}
          currentPage={currentPage}
        />
      </>
    );
  }
}

export default App;
