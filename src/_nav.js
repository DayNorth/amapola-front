export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Properties',
      url: '/Properties',
      icon: 'icon-home'
    },
    {
      name: 'User admin',
      url: '/users',
      icon: 'icon-user',
      children: [
        {
          name: 'List user',
          url: '/users',
          icon: 'icon-list'
        },
        {
          name: 'Privilegies',
          url: '/users/privilegies',
          icon: 'icon-lock'
        }
      ]
    },
    {
      title: true,
      name: 'Co-Workers',
      wrapper: {
        element: '',
        attributes: {}
      },
      class: ''
    },
    {
      name: 'Internal',
      url: '/coworkers',
      icon: 'icon-wrench',
      children: [
        {
          name: 'Report issue',
          url: '/coworkers/internal/issues',
          icon: 'icon-remove'
        },
      ]
    },
    {
      name: 'External',
      url: '/coworkers',
      icon: 'icon-wrench',
      children: [
        {
          name: 'Report issue',
          url: '/coworkers/external/issues',
          icon: 'icon-remove'
        },
      ]
    },
    {
      title: true,
      name: 'Theme',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Charts',
      url: '/charts',
      icon: 'icon-pie-chart',
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'Extras',
    },
    {
      name: 'Pages',
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Login',
          url: '/login',
          icon: 'icon-star',
        },
        {
          name: 'Register',
          url: '/register',
          icon: 'icon-star',
        },
        {
          name: 'Error 404',
          url: '/404',
          icon: 'icon-star',
        },
        {
          name: 'Error 500',
          url: '/500',
          icon: 'icon-star',
        },
      ],
    },
    {
      name: 'Disabled',
      url: '/dashboard',
      icon: 'icon-ban',
      attributes: { disabled: true },
    },
  ],
};
