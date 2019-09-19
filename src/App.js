import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Movies from "./components/movies";
import { getMovies } from "./services/fakeMovieService";

class App extends React.Component {
  state = {
    movies: getMovies()
  };

  handleDelete = buttonId => {
    console.log("df");
    const movies = this.state.movies.filter(movie => movie._id !== buttonId);
    this.setState({ movies });
  };

  render() {
    return (
      <>
        <Navbar moviesCount={this.state.movies.length} />
        <Movies movies={this.state.movies} onDelete={this.handleDelete} />
      </>
    );
  }
}

export default App;
