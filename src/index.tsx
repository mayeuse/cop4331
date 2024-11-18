// don't worry about this

import React, { createContext, useContext, useState } from 'react';
import '@/styles/global.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { UserDataSchema } from '@/typings/database';
import { Primitive, Replaced } from '@/typings';
import { type ObjectId } from 'mongodb';
import Register from '@/pages/register.tsx';
import Login from '@/pages/login';
import LandingPage, { LandingBody, Team } from '@/pages/landing.tsx';
import ProgressBody from '@/pages/progress';
import ExerciseBody from '@/pages/addexercise';
import Dashboard, { DashboardBody, GoalBody, } from '@/pages/dashboard.tsx';
import ResetPasswordBody from '@/pages/resetpassword';
import { CookiesProvider, useCookies } from 'react-cookie';
import GoalForm, { action as goalAction } from '@/pages/forms/newgoal.tsx';

export type UserDataContext = Replaced<UserDataSchema, ObjectId, string, Primitive | Date>

// userdataschema after the ObjectIds were stringified

export interface IUserContext {
  data: UserDataContext | null;
  setData: (ctx: UserDataContext) => void
}

export const UserContext: React.Context<IUserContext> = createContext<IUserContext>({
  data: null, setData: () => {},
});

export const useUserContext = () => useContext(UserContext)

export const authCookieName = 'appley-auth';
export const useAuthCookie = () => useCookies([ authCookieName ]);
export const getAuthCookie = () => useAuthCookie()[0][authCookieName]
export const setAuthCookie = (newValue: string) => useAuthCookie()[1].bind(null, authCookieName)
export const removeAuthCookie = (newValue: string) => useAuthCookie()[2].bind(null, authCookieName)

const App = (): React.JSX.Element => {
  const userContext = useUserContext()
  
  const ROUTER = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
      children: [
        {
          index: true,
          element: <LandingBody />,
        },
        {
          path: 'register',
          element: <Register />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'team',
          element: <Team />,
        },
      ],
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      children: [
        {
          index: true,
          element: <DashboardBody />,
        },
        {
          path: 'progress',
          element: <ProgressBody />,
        },
        {
          path: 'goals',
          element: <GoalBody />,
          children: [
            {
              index: true, // TODO make this a modal
              element: <GoalForm />,
              action: goalAction(userContext),
            },
          ]
        },
        
        {
          path: 'exercise',
          element: <ExerciseBody />,
        },
      ],
    },
    {
      path: '/reset',
      element: <ResetPasswordBody />,
    },
  ]);
  
  return (
    <CookiesProvider>
      <React.StrictMode>
        <RouterProvider router={ ROUTER } />
      </React.StrictMode>
    </CookiesProvider>
  )
}

createRoot(document.getElementById('root')!)
  .render(
      <App/>
  );




