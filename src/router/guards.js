// import { isNavigationFailure } from 'vue-router';
// import { useUserStore } from '@src/store/modules/user';
// import { useAsyncRouteStore } from '@src/store/modules/asyncRoute';
// import { PageEnum } from '@src/enums/pageEnum';
// import { ErrorPageRoute } from '@src/router/base';
// import { ACCESS_TOKEN } from '@src/utils/storage/variables';
// import { storage } from '@src/utils/storage';
// import { processRouteTag } from '@src/router/tabs';

// const LOGIN_PATH = PageEnum.BASE_LOGIN;

// const whitePathList = [LOGIN_PATH];

// export function createRouterGuards(router) {
//   const userStore = useUserStore();
//   const asyncRouteStore = useAsyncRouteStore();
//   router.beforeEach(async (to, from, next) => {
//     if (from.path === LOGIN_PATH && to.name === 'errorPage') {
//       next(PageEnum.BASE_HOME);
//       return;
//     }

//     // Whitelist can be directly entered
//     if (whitePathList.includes(to.path)) {
//       next();
//       return;
//     }
//     const token = storage.get(ACCESS_TOKEN);

//     if (!token) {
//       // You can access without permissions. You need to set the routing meta.ignoreAuth to true
//       if (to.meta.ignoreAuth) {
//         next();
//         return;
//       }
//       // redirect login page
//       const redirectData = {
//         path: LOGIN_PATH,
//         replace: true,
//       };
//       if (to.path) {
//         redirectData.query = {
//           ...redirectData.query,
//           redirect: to.path,
//         };
//       }
//       next(redirectData);
//       return;
//     }

//     if (asyncRouteStore.getIsDynamicRouteAdded) {
//       next();
//       return;
//     }

//     await userStore.getCurrentUserWithApiRequest();

//     const routes = await asyncRouteStore.generateRoutes(userStore.permissions);

//     routes.forEach((item) => {
//       router.addRoute(item);
//     });

//     const isErrorPage = router
//       .getRoutes()
//       .findIndex((item) => item.name === ErrorPageRoute.name);
//     if (isErrorPage === -1) {
//       router.addRoute(ErrorPageRoute);
//     }

//     const redirectPath = from.query.redirect || to.path;
//     const redirect = decodeURIComponent(redirectPath);
//     const nextData =
//       to.path === redirect ? { ...to, replace: true } : { path: redirect };
//     asyncRouteStore.setDynamicRouteAdded(true);
//     next(nextData);
//   });

//   router.afterEach((to, _, failure) => {
//     document.title = to?.meta?.title || document.title;

//     if (isNavigationFailure(failure)) {
//       //console.log('failed navigation', failure)
//     }
//     const asyncRouteStore = useAsyncRouteStore();
//     const keepAliveComponents = asyncRouteStore.keepAliveComponents;
//     const currentComName = to.matched.find(
//       (item) => item.name == to.name
//     )?.name;
//     if (
//       currentComName &&
//       !keepAliveComponents.includes(currentComName) &&
//       to.meta?.keepAlive
//     ) {
//       keepAliveComponents.push(currentComName);
//     } else if (!to.meta?.keepAlive || to.name == 'Redirect') {
//       const index = asyncRouteStore.keepAliveComponents.findIndex(
//         (name) => name == currentComName
//       );
//       if (index != -1) {
//         keepAliveComponents.splice(index, 1);
//       }
//     }
//     asyncRouteStore.setKeepAliveComponents(keepAliveComponents);
//   });

//   router.onError((error) => {
//     console.log(error, 'Routing Error');
//   });
// }
