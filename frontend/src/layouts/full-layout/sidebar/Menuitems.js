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
      icon: 'book-open',
      href: '/classes',
    },
    {
      title: 'Mi Reg. Asistencia',
      icon: 'command',
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
      href: '/administration',
      collapse: true,
      children: [
        {
          title: 'Matrícula',
          icon: '',
          href: '/administration/enrollment',
        },
        {
          title: 'Docentes',
          icon: '',
          href: '/administration/teachers',
        },
        {
          title: 'Escuela',
          icon: '',
          href: '/administration/school-settings',
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
