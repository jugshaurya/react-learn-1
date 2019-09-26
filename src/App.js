import React from "react";
import MoviesPage from "./components/movieComponent/moviesPage";
import Navbar from "./components/movieComponent/navbar";
import AddMoviePage from "./components/movieComponent/addMoviePage";
import LaterPage from "./components/movieComponent/laterPage";
import NotFound from "./components/movieComponent/notFound";
import MoviePage from "./components/movieComponent/moviePage";

import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route path="/movies/:id" component={MoviePage} />
          <Route path="/movies" component={MoviesPage} />
          <Route path="/add" component={AddMoviePage} />
          <Route path="/later" component={LaterPage} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect from="/" to="/not-found" />
        </Switch>
      </>
    );
  }
}

export default App;
