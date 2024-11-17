import React from "react";
import { RouterProvider } from "react-router-dom";
import { ROUTER } from "@/index.tsx";
import { useCookies } from "react-cookie";
export const [ authCookie, setAuthCookie, removeAuthCookie ] = useCookies([ "appley-auth" ]);

export default function (): React.JSX.Element {
  
  
  return (
    <React.StrictMode>
      <RouterProvider router={ ROUTER } />
    </React.StrictMode>
  )
}