import React from 'react';
import { initUserContext, useAuthCookie, useUserContext } from '@/client_ts/Contexts.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage, { LandingBody, Team } from '@/pages/landing.tsx';
import Register from '@/pages/register.tsx';
import Login, { loginAction } from '@/pages/login.tsx';
import Dashboard, { DashboardBody, GoalBody } from '@/pages/dashboard.tsx';
import ProgressBody from '@/pages/progress.tsx';
import GoalForm from '@/pages/forms/newgoal.tsx';
import ExerciseBody from '@/pages/addexercise.tsx';
import { CookiesProvider } from 'react-cookie';
import { dashboardLoader } from '@/client_ts/loaders.ts';
import { newGoalAction as goalAction } from '@/client_ts/actions.ts';
import ResetPasswordBody from '@/pages/resetpassword.tsx';

export const Root = (): React.JSX.Element => {
  initUserContext()
  const userContext = useUserContext()
  const authCookie = useAuthCookie()
  
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
          action: loginAction(userContext, authCookie),
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
      loader: dashboardLoader(authCookie),
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
          ],
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