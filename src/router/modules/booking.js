import { DashboardLayout } from '../constant';

const routeName = 'booking';

const routes = {
  path: '/booking',
  name: routeName,
  redirect: '/booking/list',
  component: DashboardLayout,
  meta: {
    title: 'Bookings',
    permissions: ['can view bookings menu'],
    sort: 4,
  },
  children: [
    {
      path: 'list',
      name: `${routeName}_list`,
      meta: {
        title: 'Booking List',
        permissions: ['can view bookings list'],
      },
      component: () => import('../../views/faq-layout-1/Main.vue'),
    },
    {
      path: 'add',
      name: `${routeName}_add`,
      meta: {
        title: 'Add booking',
        permissions: ['can view booking create'],
      },
      component: () => import('../../views/faq-layout-1/Main.vue'),
    },
    {
      path: 'update/:id',
      name: `${routeName}_update`,
      meta: {
        title: 'Update booking',
        permissions: ['can view booking update'],
        hidden: true,
      },
      component: () => import('../../views/faq-layout-1/Main.vue'),
    },
    {
      path: 'print/:id',
      name: `${routeName}_print`,
      meta: {
        title: 'Print booking',
        permissions: ['can view booking print'],
        hidden: true,
      },
      component: () => import('../../views/faq-layout-1/Main.vue'),
    },
  ],
};

export default routes;
