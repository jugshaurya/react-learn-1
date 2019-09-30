import React from "react";
import { Link } from "react-router-dom";

const Input = ({ label, name, value, onChange, type = "text", error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        autoComplete={name}
        className="form-control"
        type={type}
        id={name}
        value={value}
        name={name}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

const loginURL = "http://localhost:4000/api/login";
class LoginPage extends React.Component {
  state = {
    data: { username: "", password: "" },
    client_errors: {},
    server_errors: {}
  };

  formStyle = {
    background: "teal",
    padding: 20,
    color: "white",
    fontWeight: 800,
    borderRadius: 20
  };

  validateUsername = username => {
    if (username.trim() === "") return "Username should not be Empty";
    if (username.trim().length < 3) return "Length must be atleast 3";
    return null;
  };
  errors;

  validatePassword = password => {
    if (password.trim() === "") return "Password should not be Empty";
    if (password.trim().length < 3) return "Length must be atleast 3";
    return null;
  };

  validate = () => {
    const client_errors = {};
    const { username, password } = this.state.data;

    const checkUsername = this.validateUsername(username);
    if (checkUsername) client_errors["username"] = checkUsername;

    const checkPassword = this.validatePassword(password);
    if (checkPassword) client_errors["password"] = checkPassword;

    return Object.keys(client_errors).length > 0 ? client_errors : null;
  };

  handleLogin = async e => {
    const response = await fetch(loginURL, {
      method: "POST",
      body: JSON.stringify({
        username: this.state.data.username,
        password: this.state.data.password
      }),
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      }
    });

    const server_errors = {};
    if (response.status < 200 || response.status > 210) {
      server_errors.error = await response.json();
      this.setState({ server_errors });
      return;
    }
    this.setState({ server_errors: {} });
    window.location = "/movies";
  };

  handleSubmit = async e => {
    e.preventDefault();
    const client_errors = this.validate();
    this.setState({ errors: client_errors || {} });
    if (client_errors) return;

    // call the server
    await this.handleLogin();
    // if response

    console.log("Submitted..");
  };

  handleChange = e => {
    const field = e.target.name;
    const value = e.target.value;

    const data = { ...this.state.data };
    data[field] = value;
    this.setState({ data });

    const client_errors = {};
    if (field === "username") {
      const checkUsername = this.validateUsername(value);
      if (checkUsername) client_errors["username"] = checkUsername;
    } else if (field === "password") {
      const checkPassword = this.validatePassword(value);
      if (checkPassword) client_errors["password"] = checkPassword;
    } else {
      console.log("What the fuck!");
    }

    this.setState({ client_errors });
  };

  render() {
    const { username, password } = this.state.data;

    return (
      <div className="container mt-5">
        <h3>Login Page</h3>
        <form
          className="mt-5"
          style={this.formStyle}
          onSubmit={this.handleSubmit}
        >
          {this.state.server_errors.error && (
            <div className="alert alert-danger">
              {this.state.server_errors.error}
            </div>
          )}
          <Input
            value={username}
            label="Username"
            name="username"
            onChange={this.handleChange}
            error={this.state.client_errors["username"]}
          />
          <Input
            value={password}
            label="Password"
            name="password"
            type="password"
            onChange={this.handleChange}
            error={this.state.client_errors["password"]}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={this.validate()}
          >
            Login
          </button>
        </form>
        <div style={{ textAlign: "center" }}>
          New User?{" "}
          <Link
            style={{ fontSize: 20, textDecoration: "underline" }}
            to="/register"
          >
            Register
          </Link>
        </div>
      </div>
    );
  }
}

export default LoginPage;
