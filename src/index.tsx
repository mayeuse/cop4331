// don't worry about this

import React from "react";
import ReactDOM from "react-dom";
import "@/styles/global.css";
import App from "@/App.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
