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
import Dashboard, { DashboardBody, ExerciseBody, GoalBody, ProgressBody } from '@/pages/dashboard.tsx';
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

export const useAuthCookie = () => useCookies([ 'appley-auth' ]);
export const getAuthCookie = () => useAuthCookie()[0]['appley-auth']


const App = (): React.JSX.Element => {
  const userContext = useUserContext()
  
  const ROUTER = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />,
      children: [
        {
          path: '',
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
          path: '',
          element: <DashboardBody />,
        },
        {
          path: 'progress',
          element: <ProgressBody />,
        },
        {
          path: 'goals',
          element: <GoalBody />,
        },
        {
          path: 'exercise',
          element: <ExerciseBody />,
        },
      ],
    },
    {
      path: '/addGoal',
      element: <GoalForm />,
      action: goalAction(userContext),
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




