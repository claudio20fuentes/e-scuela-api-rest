import React, { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';
import Loadable from '../layouts/full-layout/loadable/Loadable';
/* ***Layouts**** */
const FullLayout = Loadable(
  lazy(() => import('../layouts/full-layout/FullLayout'))
);
const BlankLayout = Loadable(
  lazy(() => import('../layouts/blank-layout/BlankLayout'))
);
/* ***End Layouts**** */

const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const Register = Loadable(
  lazy(() => import('../views/authentication/Register'))
);
const ResetPassword = Loadable(
  lazy(() => import('../views/authentication/ResetPassword'))
);
const NewPassword = Loadable(
  lazy(() => import('../views/authentication/newPassword'))
);
const MailSent = Loadable(
  lazy(() => import('../views/authentication/MailSent'))
);
const PasswordUpdated = Loadable(
  lazy(() => import('../views/authentication/PasswordUpdated'))
);

/* ****Pages***** */
const Dashboard1 = Loadable(
  lazy(() => import('../views/dashboards/Dashboard1'))
);
const Dashboard2 = Loadable(
  lazy(() => import('../views/dashboards/Dashboard2'))
);
const Dashboard3 = Loadable(
  lazy(() => import('../views/dashboards/Dashboard3'))
);

const UserProfile = Loadable(
  lazy(() => import('../views/user-profile/UserProfile'))
);
const UserNewPassword = Loadable(
  lazy(() => import('../views/user-profile/UserNewPassword'))
);

/* ****Routes***** */

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to='/dashboard' /> },
      { path: '/dashboard', exact: true, element: <Dashboard1 /> },
      { path: '/dashboards/dashboard2', exact: true, element: <Dashboard2 /> },
      { path: '/dashboards/dashboard3', exact: true, element: <Dashboard3 /> },

      { path: '/settings/user', element: <UserProfile /> },
      { path: '/settings/user/new-password', element: <UserNewPassword /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '/auth/404', element: <Error /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/reset-password', element: <ResetPassword /> },
      { path: '/auth/new-password', element: <NewPassword /> },
      { path: '/auth/password-updated', element: <PasswordUpdated /> },
      { path: '/auth/mail-sent', element: <MailSent /> },
      { path: '*', element: <Navigate to='/auth/404' /> },
    ],
  },
  
];

export default Router;
