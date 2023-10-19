import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';

const createMenuItems = () => {

  const menu = [
    {
      navlabel: true,
      subheader: ' ',
      icon: 'mdi mdi-dots-horizontal',
      href: 'Dashboard',
    },
    {
      title: 'Home',
      icon: 'home',
      href: '/dashboard',
    },
    {
      title: 'Mis cursos',
      icon: 'widgetIcon',
      href: '/classes',
    },
    {
      title: 'Mi Reg. Asistencia',
      icon: 'reporteIcon',
      href: '/reports',
      collapse: true,
      children: [
        {
          title: 'Diario',
          icon: '',
          href: '/reports/daily',
        },
        {
          title: 'Resumen',
          icon: '',
          href: '/reports/overall',
        },
        
      ],
    },

    {
      navlabel: true,
      subheader: 'Administración',
      icon: 'mdi mdi-dots-horizontal',
      href: 'Dashboard',
    },
    {
      title: 'Organización',
      icon: 'settings',
      href: '/school',
      collapse: true,
      children: [
        {
          title: 'Matrícula',
          icon: '',
          href: '/school/enrollment',
        },
        {
          title: 'Docentes',
          icon: '',
          href: '/school/teachers',
        },
        {
          title: 'Escuela',
          icon: '',
          href: '/school/config',
        },
      ],
    },
    {
      title: 'Cursos',
      icon: 'mouse-pointer',
      href: '/school/classes',
      collapse: true,
      children: [
        {
          title: 'Primero Básico',
          icon: '',
          href: '/school/classes/a',
        },
        {
          title: 'Segundo Básico',
          icon: '',
          href: '/school/classes/b',
        },
        {
          title: 'Tercero Básico',
          icon: '',
          href: '/school/classes/c',
        },
      ],
    },

  ];
  return menu;
}

export default createMenuItems;
