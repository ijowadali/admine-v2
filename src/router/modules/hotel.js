import { DashboardLayout } from '../constant';

const routeName = 'hotel';

const routes = {
  path: '/hotel',
  name: routeName,
  redirect: '/hotel/list',
  component: DashboardLayout,
  meta: {
    title: 'Hotels',
    permissions: ['can view hotels menu'],
    sort: 3,
  },
  children: [
    {
      path: 'List',
      name: `${routeName}_list`,
      meta: {
        title: 'Hotel List',
        permissions: ['can view hotels list'],
      },
      component: () => import('../../views/page-2/Main.vue'),
    },
    {
      path: 'add',
      name: `${routeName}_add`,
      meta: {
        title: 'Add Hotel',
        permissions: ['can view hotel create'],
        hidden: true,
      },
      component: () => import('../../views/page-2/Main.vue'),
    },
    {
      path: 'update/:id',
      name: `${routeName}_update`,
      meta: {
        title: 'Update hotel',
        permissions: ['can view hotel update'],
        hidden: true,
      },
      component: () => import('../../views/page-2/Main.vue'),
    },
    {
      path: 'room',
      name: `${routeName}_room`,
      meta: {
        title: 'Rooms',
        permissions: ['can view rooms menu'],
      },
      component: () => import('../../views/page-2/Main.vue'),
    },
  ],
};

export default routes;
