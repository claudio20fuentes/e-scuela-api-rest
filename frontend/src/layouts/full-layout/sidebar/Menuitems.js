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
      href: '/attendance',
      collapse: true,
      children: [
        {
          title: 'Diario',
          icon: '',
          href: '/attendance',
        },
        {
          title: 'Resumen',
          icon: '',
          href: '/attendance/overall',
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
          href: '/administration/matriculas',
        },
        {
          title: 'Docentes',
          icon: '',
          href: '/administration/teachers',
        },
        {
          title: 'Cursos',
          icon: '',
          href: '/administration/courses'
        }
      ],
    },
  ];
  return menu;
}

export default createMenuItems;
