// don't worry about this

import React from "react";
import "@/styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { UserDataSchema } from "@/typings/database";
import { Primitive, Replaced } from "@/typings";
import { type ObjectId } from "mongodb";
import Register from "@/pages/register.tsx";
import Login from "@/pages/login";
import LandingPage, { LandingBody, Team } from "@/pages/landing.tsx";
import Dashboard, { DashboardBody, ExerciseBody, GoalBody, ProgressBody } from "@/pages/dashboard.tsx";
import { useCookies } from "react-cookie";

export type UserDataContext = Replaced<UserDataSchema, ObjectId, string, Primitive | Date>

// userdataschema after the ObjectIds were stringified

export interface UserContext {
  data: UserDataContext | null;
}

export const USER_CONTEXT: React.Context<UserContext> = React.createContext<UserContext>({ data: null });

export const [ authCookie, setAuthCookie, removeAuthCookie ] = useCookies([ "appley-auth" ]);

export const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [
      {
        path: "",
        element: <LandingBody />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "team",
        element: <Team />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <DashboardBody />,
      },
      {
        path: "progress",
        element: <ProgressBody />,
      },
      {
        path: "goals",
        element: <GoalBody />,
      },
      {
        path: "exercise",
        element: <ExerciseBody />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!)
  .render(
    <React.StrictMode>
      <RouterProvider router={ ROUTER } />
    </React.StrictMode>,
  );
