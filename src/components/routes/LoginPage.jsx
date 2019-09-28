import React, { Component } from "react";
// Controlled Component- Components controlled by React with form values stored in state
class LoginPage extends Component {
  state = {
    username: "",
    password: "",
    errors: {}
  };

  checkUsername = username => {
    if (username.trim() === "") return "Username Should not be Empty";
    if (username.trim().length < 3)
      return "Username must be atleast 3 in length";
    return null;
  };

  checkPassword = password => {
    if (password.trim() === "") return "Password Should not be Empty";
    if (password.trim().length < 3)
      return "Password must be atleast 3 in length";
    return null;
  };

  handleChange = ({ target: input }) => {
    const errors = {};
    if (input.name === "username") {
      errors["username"] = this.checkUsername(input.value);
    }

    if (input.name === "password") {
      errors["password"] = this.checkPassword(input.value);
    }

    // batched / merged
    this.setState({ [input.name]: input.value });
    this.setState({ errors });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const input = e.target;
    const errors = {};
    const nameError = this.checkUsername(input["username"].value);
    const passError = this.checkPassword(input["password"].value);
    if (nameError) errors["username"] = nameError;
    if (passError) errors["password"] = passError;
    this.setState({ errors });
  };

  render() {
    return (
      <div className="container mt-2">
        <h3>Login Page</h3>
        <form
          onSubmit={this.handleFormSubmit}
          className="mt-5"
          style={{
            background: "teal",
            padding: 20,
            color: "white",
            fontWeight: 800,
            borderRadius: 20
          }}
        >
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              className="form-control"
              id="username"
              type="text"
              placeholder="Enter Username"
              value={this.state.username}
              onChange={this.handleChange}
              name="username"
            />
            {this.state.errors["username"] ? (
              <div className="alert alert-danger mt-1" role="alert">
                {this.state.errors["username"]}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              id="password"
              type="password"
              placeholder="Enter Password"
              autoComplete="current-pass"
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
            />
            {this.state.errors["password"] ? (
              <div className="alert alert-danger mt-1" role="alert">
                {this.state.errors["password"]}
              </div>
            ) : (
              ""
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}
export default LoginPage;
