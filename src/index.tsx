// don't worry about this

import React from "react";
import "@/styles/global.css";
import App from "@/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";


const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
