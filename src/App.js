import React from "react";
import Navbar from "./components/navbar";
import Movies from "./components/movies";
import { getMovies } from "./services/fakeMovieService";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: getMovies()
    };
  }

  handleDelete = buttonId => {
    const movies = this.state.movies.filter(movie => movie._id !== buttonId);
    this.setState({ movies });
  };

  render() {
    const { movies } = this.state;
    return (
      <>
        <Navbar moviesCount={movies.length} />
        <Movies movies={movies} onDelete={this.handleDelete} />
      </>
    );
  }
}

export default App;
