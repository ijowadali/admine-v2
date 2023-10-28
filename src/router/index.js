import { createRouter, createWebHistory } from 'vue-router';
import { RedirectRoute } from './base';
// import { createRouterGuards } from '@src/router/guards';

const modules = import.meta.globEager('./modules/**/*.js');

const routeModuleList = Object.keys(modules).map((key) => {
  const mod = modules[key].default || modules[key];
  return mod;
});

function sortRoute(a, b) {
  return (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0);
}

routeModuleList.sort(sortRoute);

export const RootRoute = {
  path: '/',
  name: 'Root',
  redirect: '/dashboard',
  meta: {
    title: 'Root',
  },
};

export const LoginRoute = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login',
  },
  children: [
    {
      path: '',
      name: 'login',
      meta: {
        title: 'Login',
      },
      component: () => import('../views/login/Main.vue'),
    },
  ],
};

export const RegisterRoute = {
  path: '/register',
  name: 'register',
  meta: {
    title: 'Register',
  },
  children: [
    {
      path: '',
      name: 'register',
      meta: {
        title: 'Register',
      },
      component: () => import('../views/register/Main.vue'),
    },
  ],
};

export const asyncRoutes = [...routeModuleList];

console.log(asyncRoutes);

export const constantRouter = [
  LoginRoute,
  RegisterRoute,
  RootRoute,
  RedirectRoute,
];

export const router = createRouter({
  history: createWebHistory(),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export async function setupRouter(app) {
  app.use(router);
  // createRouterGuards(router);
}
