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

/* ****DASHBOARDS***** */
const MainDashboard = Loadable(
  lazy(() => import('../views/dashboards/MainDashboard'))
);

/* ****CONFIG DE USUARIO***** */
const UserProfile = Loadable(
  lazy(() => import('../views/user-profile/UserProfile'))
);
const UserNewPassword = Loadable(
  lazy(() => import('../views/user-profile/UserNewPassword'))
);
/* ****Matriculas**** */
const AdministrarMatriculas = Loadable(
  lazy(() => import('../views/administration/matricula/MainView'))
);
const CrearMatricula = Loadable(
  lazy(() => import('../views/administration/matricula/CrearMatricula'))
);
/* ****DOCENTES***** */
const AdministrarDocentes = Loadable(
  lazy(() => import('../views/administration/docentes/MainView'))
);
const CrearDocente = Loadable(
  lazy(() => import('../views/administration/docentes/CrearDocente'))
);
const EditarDocente = Loadable(
  lazy(() => import('../views/administration/docentes/EditarDocente'))
);

/* ****CURSOS***** */
const AdministrarCursos = Loadable(
  lazy(() => import('../views/administration/cursos/mainView'))
);
// const Curso = Loadable(
//   lazy(() => import('../views/administration/cursos/CrearCurso'))
// );
// const EditarCurso = Loadable(
//   lazy(() => import('../views/administration/cursos/EditarCurso'))
// );
/* ****REGISTRO DE ASISTENCIA***** */
const RegistroAsistencia = Loadable(
  lazy(() => import('../views/registro-asistencia/MainView'))
);


/* ****Routes***** */

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to='/dashboard' /> },
      { path: '/dashboard', exact: true, element: <MainDashboard /> },

      { path: '/settings/user', element: <UserProfile /> },
      { path: '/settings/user/new-password', element: <UserNewPassword /> },

      { path: '/administration/teachers', element: <AdministrarDocentes /> },
      { path: '/administration/teachers/create', element: <CrearDocente /> },
      { path: '/administration/teachers/:id', element: <EditarDocente /> },
      
      { path: '/administration/courses', element: <AdministrarCursos/>},
      // { path: '/administration/courses/create', element: <CrearCurso/>},
      // { path: '/administration/courses/:id', element: <EditarCurso/>},
      
      { path: '/administration/matriculas',element: <AdministrarMatriculas/> },
      { path: '/administration/matriculas/create', element: <CrearMatricula/>},

      { path: '/attendance', element: <RegistroAsistencia /> },
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
