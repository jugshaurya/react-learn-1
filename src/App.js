import React from "react";
import MoviesPage from "./components/movieComponent/moviesPage";
import Navbar from "./components/movieComponent/navbar";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <MoviesPage />
      </>
    );
  }
}

export default App;
