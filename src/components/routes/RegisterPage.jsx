import React from "react";

const Input = ({ label, name, value, onChange, type = "text", error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
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

class RegisterPage extends React.Component {
  state = {
    data: { username: "", email: "", password: "" },
    client_errors: {},
    server_errors: {}
  };

  formStyle = {
    background: "lightblue",
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

  validateEmail = email => {
    if (email.trim() === "") return "Email should not be Empty";
    if (!email.trim().includes("@")) return "Enter a Valid Email";
    return null;
  };

  validatePassword = password => {
    if (password.trim() === "") return "Password should not be Empty";
    if (password.trim().length < 3) return "Length must be atleast 3";
    return null;
  };

  validate = () => {
    const client_errors = {};
    const { username, email, password } = this.state.data;

    const checkUsername = this.validateUsername(username);
    if (checkUsername) client_errors["username"] = checkUsername;

    const checkEmail = this.validateEmail(email);
    if (checkEmail) client_errors["email"] = checkEmail;

    const checkPassword = this.validatePassword(password);
    if (checkPassword) client_errors["password"] = checkPassword;

    return Object.keys(client_errors).length > 0 ? client_errors : null;
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
    } else if (field === "email") {
      const checkEmail = this.validateEmail(value);
      if (checkEmail) client_errors["email"] = checkEmail;
    } else if (field === "password") {
      const checkPassword = this.validatePassword(value);
      if (checkPassword) client_errors["password"] = checkPassword;
    } else {
      console.log("What the fuck!");
    }

    this.setState({ client_errors });
  };

  handleRegistration = async () => {
    const registerURL = "http://localhost:4000/api/register";

    const response = await fetch(registerURL, {
      method: "POST",
      body: JSON.stringify({
        username: this.state.data.username,
        email: this.state.data.email,
        password: this.state.data.password
      }),
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      }
    });

    const data = await response.json();
    const server_errors = {};
    if (response.status < 200 || response.status > 210) {
      server_errors.error = data;
      this.setState({ server_errors });
      return;
    }

    this.setState({ server_errors: {} });
    // console.log(localStorage);
    localStorage.setItem("token", data.token);
    window.location = "/movies";
  };

  handleSubmit = async e => {
    e.preventDefault();

    // Validation
    const client_errors = this.validate();

    // client_errors is always going to be a object , can never be null
    this.setState({ client_errors: client_errors || {} });

    if (client_errors) return;

    // call the server to register the User
    await this.handleRegistration();
  };

  render() {
    const { username, email, password } = this.state.data;

    return (
      <div className="container mt-5">
        <h3>Register Page</h3>
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
            value={email}
            label="Email"
            name="email"
            type="email"
            onChange={this.handleChange}
            error={this.state.client_errors["email"]}
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
            // disabled={this.validate()}
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default RegisterPage;
