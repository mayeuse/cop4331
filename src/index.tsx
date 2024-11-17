// don't worry about this

import React, { useState } from "react";
import "@/styles/global.css";
import App from "@/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { UserDataSchema } from "@/typings/database";
import { Primitive, Replaced } from "@/typings";
import { type ObjectId } from "mongodb";

export type UserDataContext = Replaced<UserDataSchema, ObjectId, string, Primitive | Date> // userdataschema after the objectids were stringified

export const UserContext: React.Context<UserDataContext | null> = React.createContext<UserDataContext | null>(null)

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
