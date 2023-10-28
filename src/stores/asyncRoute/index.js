import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { toRaw } from 'vue';
import { asyncRoutes, constantRouter } from '../../router';
import { useUserStore } from '../../stores/user';

const DEFAULT_CONFIG = {
  id: 'id',
  children: 'children',
  pid: 'pid',
};

const getConfig = (config) => Object.assign({}, DEFAULT_CONFIG, config);

async function RouteFilter(tree, func, config = {}) {
  config = getConfig(config);
  const children = config.children;

  function listFilter(list) {
    return list
      .map((node) => ({ ...node }))
      .filter((node) => {
        node[children] = node[children] && listFilter(node[children]);
        return func(node) || (node[children] && node[children].length);
      });
  }

  return listFilter(tree);
}

export const useAsyncRouteStore = defineStore('app-route', () => {
  const menus = ref([]);
  const routers = ref(constantRouter);
  const routersAdded = ref([]);
  const keepAliveComponents = ref([]);
  const isDynamicRouteAdded = ref(false);

  const getMenus = computed(() => menus.value);

  const getIsDynamicRouteAdded = computed(() => isDynamicRouteAdded.value);

  const setDynamicRouteAdded = (added) => {
    isDynamicRouteAdded.value = added;
  };

  const setRouters = (newRouters) => {
    routersAdded.value = newRouters;
    routers.value = constantRouter.concat(newRouters);
  };

  const setMenus = (newMenus) => {
    menus.value = newMenus;
  };

  const setKeepAliveComponents = (compNames) => {
    keepAliveComponents.value = compNames;
  };

  const generateRoutes = async (permissions) => {
    const permissionsList = permissions ?? [];
    // check Role
    const userStore = useUserStore();
    const role = userStore.currentUser?.roles?.find(
      (item) => item.name === 'super admin'
    );

    const routeFilter = (route) => {
      const { meta } = route;
      const { permissions } = meta || {};
      if (!permissions) return true;
      if (role && role.name === 'super admin') {
        return true;
      } else {
        return permissionsList.some((item) => {
          return permissions.includes(item);
        });
      }
    };

    const res = await RouteFilter(asyncRoutes, routeFilter);
    const routeList = res.filter(routeFilter);
    setRouters(routeList);
    setMenus(routeList);

    return toRaw(routeList);
  };

  return {
    getMenus,
    getIsDynamicRouteAdded,
    setDynamicRouteAdded,
    keepAliveComponents,
    setKeepAliveComponents,
    generateRoutes,
  };
});
