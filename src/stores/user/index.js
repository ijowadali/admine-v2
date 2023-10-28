import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ACCESS_TOKEN, CURRENT_USER } from '../../utils/storage/variables';
import { storage } from '../../utils/storage';
import { loginApi, getUserInfoApi } from '../../api/auth';
import _ from 'lodash';

export const useUserStore = defineStore('app-user', () => {
  const token = ref(storage.get(ACCESS_TOKEN, ''));
  const permissions = ref([]);
  const roles = ref([]);
  const currentUser = ref(storage.get(CURRENT_USER, {}));

  const hasData = () => currentUser.value.id;

  const setToken = (newToken) => {
    token.value = newToken;
  };

  const setPermissions = (newPermissions) => {
    permissions.value = newPermissions;
  };

  const setRoles = (newRole) => {
    roles.value = newRole;
  };

  const setCurrentUser = (newInfo) => {
    currentUser.value = newInfo;
  };

  const login = async (params) => {
    const res = await loginApi(params);
    const { result, code } = res;
    if (code === 200) {
      const ex = 7 * 24 * 60 * 60;
      storage.set(ACCESS_TOKEN, result.token, ex);
      storage.set(CURRENT_USER, result.user, ex);
      setToken(result.token);
      setCurrentUser(result.user);
    }

    return res;
  };

  const getCurrentUserWithApiRequest = async () => {
    const res = await getUserInfoApi();
    if (res.result) {
      const permissionsList = await allPermissions(res.result);
      setPermissions(permissionsList);
      setRoles(res.result.roles);
      setCurrentUser(res.result);
    } else {
      throw new Error('api not responding correctly!');
    }

    return res.result;
  };

  const allPermissions = async (user) => {
    let rolePermissions = [];

    if (user?.roles) {
      for (const role of user.roles) {
        rolePermissions = [
          ...role.permissions.map((permission) => permission.name),
        ];
      }
    }

    const userPermissions =
      user?.permissions.map((permission) => permission.name) || [];

    return _.uniq([...userPermissions, ...rolePermissions]);
  };

  const logout = async () => {
    setPermissions([]);
    setCurrentUser({});
    storage.remove(ACCESS_TOKEN);
    storage.remove(CURRENT_USER);
    return { message: 'User Logout Successfully!' };
  };

  return {
    token,
    permissions,
    roles,
    hasData,
    currentUser,
    login,
    logout,
    getCurrentUserWithApiRequest,
  };
});
