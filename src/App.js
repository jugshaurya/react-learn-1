import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./components/navbar";

import NotFoundPage from "./components/routes/notFoundPage";
import MoviesPage from "./components/routes/moviesPage";
import AddMoviePage from "./components/routes/addMoviePage";
import LaterPage from "./components/routes/laterPage";
import MoviePage from "./components/routes/moviePage";
import LoginPage from "./components/routes/LoginPage";
import RegisterPage from "./components/routes/RegisterPage";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container content">
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/movies/:id" component={MoviePage} />
          <Route path="/movies" component={MoviesPage} />
          <Route path="/add" component={AddMoviePage} />
          <Route path="/later" component={LaterPage} />
          <Route path="/not-found" component={NotFoundPage} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </>
  );
};

export default App;
