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
    errors: {}
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
    const errors = {};
    const { username, email, password } = this.state.data;

    const checkUsername = this.validateUsername(username);
    if (checkUsername) errors["username"] = checkUsername;

    const checkEmail = this.validateEmail(email);
    if (checkEmail) errors["email"] = checkEmail;

    const checkPassword = this.validatePassword(password);
    if (checkPassword) errors["password"] = checkPassword;

    return Object.keys(errors).length > 0 ? errors : null;
  };

  handleChange = e => {
    const field = e.target.name;
    const value = e.target.value;

    const data = { ...this.state.data };
    data[field] = value;
    this.setState({ data });

    const errors = {};
    if (field === "username") {
      const checkUsername = this.validateUsername(value);
      if (checkUsername) errors["username"] = checkUsername;
    } else if (field === "email") {
      const checkEmail = this.validateEmail(value);
      if (checkEmail) errors["email"] = checkEmail;
    } else if (field === "password") {
      const checkPassword = this.validatePassword(value);
      if (checkPassword) errors["password"] = checkPassword;
    } else {
      console.log("What the fuck!");
    }

    this.setState({ errors });
  };

  handleSubmit = e => {
    e.preventDefault();

    // Validation
    const errors = this.validate();

    // errors is always going to be a object , can never be null
    this.setState({ errors: errors || {} });

    if (errors) return;

    // call the server to register the User
    fetch("localhost");

    console.log("Submitted..");
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
          <Input
            value={username}
            label="Username"
            name="username"
            onChange={this.handleChange}
            error={this.state.errors["username"]}
          />
          <Input
            value={email}
            label="Email"
            name="email"
            type="email"
            onChange={this.handleChange}
            error={this.state.errors["email"]}
          />
          <Input
            value={password}
            label="Password"
            name="password"
            type="password"
            onChange={this.handleChange}
            error={this.state.errors["password"]}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={this.validate()}
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default RegisterPage;
