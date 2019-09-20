import React from "react";
import Navbar from "./components/movieComponent/navbar";
import Movies from "./components/movieComponent/movies";
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

  render() {
    const { movies } = this.state;
    return (
      <>
        <Navbar moviesCount={movies.length} />
        <Movies
          movies={movies}
          onDelete={this.handleDelete}
          onLikeToggle={this.handleLikeToggle}
        />
      </>
    );
  }
}

export default App;
