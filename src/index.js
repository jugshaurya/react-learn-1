import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

import App from "./App";

//Styling
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

// Rendering

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
