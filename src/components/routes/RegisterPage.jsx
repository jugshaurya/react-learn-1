import React from "react";

const RegisterPage = () => {
  return (
    <div className="container mt-2">
      <h3>Register Page</h3>
      <form
        className="mt-5"
        style={{
          background: "lightblue",
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
            type="username"
            id="username"
            placeholder="Enter Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            id="password"
            placeholder="Enter Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
