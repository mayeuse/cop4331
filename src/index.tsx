// don't worry about this

import React, { useState } from "react";
import "@/styles/global.css";
import App from "@/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { UserDataSchema } from "@/typings/database";

export interface GlobalUserContext {
  user: UserDataSchema | null,
  setUser: (it: UserDataSchema) => void
}

const [user, setUser] = useState<UserDataSchema | null>( null)

export const UserContext = React.createContext<GlobalUserContext>({user, setUser})

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
