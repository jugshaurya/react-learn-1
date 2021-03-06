import React from "react";
import jwtDecoder from "jwt-decode";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/navbar";

import NotFoundPage from "./components/routes/notFoundPage";
import MoviesPage from "./components/routes/moviesPage";
import AddMoviePage from "./components/routes/addMoviePage";
import LaterPage from "./components/routes/laterPage";
import MoviePage from "./components/routes/moviePage";
import LoginPage from "./components/routes/LoginPage";
import LogoutPage from "./components/routes/LogoutPage";
import ProfilePage from "./components/routes/ProfilePage";
import RegisterPage from "./components/routes/RegisterPage";

class App extends React.Component {
  state = {};

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) return;
    const data = jwtDecoder(token);
    this.setState({ user: data.username, userID: data._id });
  }

  render() {
    return (
      <>
        <Navbar user={this.state.user} />
        <div className="container content">
          <Switch>
            <Route
              path="/profile"
              render={() => <ProfilePage user={this.state.user} />}
            />
            <Route path="/logout" component={LogoutPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/movies/:id" component={MoviePage} />
            <Route path="/movies" component={MoviesPage} />
            <Route path="/add" component={AddMoviePage} />
            <Route path="/later" component={LaterPage} />
            <Route path="/not-found" component={NotFoundPage} />
            {this.state.user ? (
              <Redirect from="/login" to="/movies" />
            ) : (
              <Route path="/login" component={LoginPage} />
            )}
            <Redirect from="/" to="/login" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </>
    );
  }
}

export default App;
