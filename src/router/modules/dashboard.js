import { DashboardLayout } from '../constant';

const routes = {
  path: '/dashboard',
  name: 'dashboard-layout',
  redirect: '/dashboard',
  component: DashboardLayout,
  meta: {
    title: 'Dashboard',
    permissions: ['can view dashboard menu'],
    sort: 0,
  },
  children: [
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        title: 'Dashboard',
        permissions: ['can view dashboard menu'],
      },
      component: () => import('../../views/dashboard/Main.vue'),
    },
  ],
};

export default routes;
