import React from "react";

class LogoutPage extends React.Component {
  componentDidMount() {
    localStorage.removeItem("token");
    window.location = "/";
  }

  render() {
    return <></>;
  }
}

export default LogoutPage;
