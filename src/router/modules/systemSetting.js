import { DashboardLayout } from '../constant';

const routeName = 'system';

const routes = {
  path: '/system',
  name: routeName,
  redirect: '/system/users',
  component: DashboardLayout,
  meta: {
    title: 'System Settings',
    permissions: ['can view system setting menu'],
    sort: 1,
  },
  children: [
    {
      path: 'users',
      name: `${routeName}_users`,
      meta: {
        title: 'Users',
        permissions: ['can view users menu'],
      },
      component: () => import('../../views/page-2/Main.vue'),
    },
    {
      path: 'profile',
      name: `${routeName}_profile`,
      meta: {
        title: 'Profile',
        permissions: ['can view profile'],
        hidden: true,
      },
      component: () => import('../../views/page-2/Main.vue'),
    },
    {
      path: 'company',
      name: `${routeName}_company`,
      meta: {
        title: 'Company',
        permissions: ['can view profile'],
        hidden: true,
      },
      component: () => import('../../views/page-2/Main.vue'),
    },
    {
      path: 'assing-permission',
      name: `${routeName}_assing_permission`,
      meta: {
        title: 'Assing Permission',
        hidden: true,
      },
      component: () => import('../../views/page-2/Main.vue'),
    },
    {
      path: 'role',
      name: `${routeName}_role`,
      meta: {
        title: 'Roles',
        permissions: ['can view roles menu'],
      },
      component: () => import('../../views/page-2/Main.vue'),
    },
    {
      path: 'permissions',
      name: `${routeName}_permission`,
      meta: {
        title: 'Permissions',
        permissions: ['can view permissions menu'],
      },
      component: () => import('../../views/page-2/Main.vue'),
    },
    {
      path: 'menus',
      name: `${routeName}_menu`,
      meta: {
        title: 'Menus',
        permissions: ['can view menus menu'],
      },
      component: () => import('../../views/page-2/Main.vue'),
    },
  ],
};

export default routes;
