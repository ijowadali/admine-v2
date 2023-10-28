import { DashboardLayout } from '../constant';

const routeName = 'companies';

const routes = {
  path: '/companies',
  name: routeName,
  redirect: '/companies/list',
  component: DashboardLayout,
  meta: {
    title: 'Companies',
    permissions: ['can view company menu'],
    sort: 2,
  },
  children: [
    {
      path: 'list',
      name: `${routeName}_list`,
      meta: {
        title: 'Companies',
        permissions: ['can view company'],
      },
      component: () => import('../../views/faq-layout-1/Main.vue'),
    },
  ],
};

export default routes;
