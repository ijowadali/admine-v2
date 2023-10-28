import { ErrorPage, RedirectName, DashboardLayout } from './constant';

// 404 on a page
export const ErrorPageRoute = {
  path: '/:path(.*)*',
  name: 'ErrorPage',
  component: DashboardLayout,
  meta: {
    title: 'ErrorPage',
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'ErrorPageSon',
      component: ErrorPage,
      meta: {
        title: 'ErrorPage',
      },
    },
  ],
};

export const RedirectRoute = {
  path: '/redirect',
  name: RedirectName,
  component: DashboardLayout,
  meta: {
    title: RedirectName,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: RedirectName,
      component: () => import('../views/redirect/index.vue'),
      meta: {
        title: RedirectName,
      },
    },
  ],
};
