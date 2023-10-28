import axios from 'axios';
import { toast } from 'vue3-toastify';
import { router } from '../../router';
import { axiosConfig } from '../axios/config';
import { ResponseStatusCode } from '../axios/statusCode';
import { ACCESS_TOKEN } from '../../utils/storage/variables';
import { storage } from '../../utils/storage';

class Request {
  constructor(config) {
    axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

    this.instance = axios.create(config);

    this.instance.interceptors.request.use(
      (req) => {
        const { url } = req;
        if (storage.isAuthenticated(ACCESS_TOKEN) && url) {
          req.headers.Authorization = storage.getAuthorization(ACCESS_TOKEN);
        }
        return req;
      },
      (err) => Promise.reject(err)
    );

    this.instance.interceptors.response.use(
      (res) => res.data,
      (err) => {
        const { response } = err;
        const { data, status } = response || {};
        if (response) {
          Request.handleCode(status, data);
        }
        if (!window.navigator.onLine) {
          router.replace('/404');
          toast.error('Network Error');
        }
        return Promise.reject(data);
      }
    );
  }

  static handleCode(code, msg) {
    switch (code) {
      case ResponseStatusCode.UNAUTHORIZED:
        storage.remove(ACCESS_TOKEN);
        toast.error(msg.message);
        if (router.currentRoute.value.path !== '/login') {
          if (router.currentRoute.value.path !== '/') {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.value.fullPath,
              },
            });
          } else {
            router.replace('/login');
          }
        }
        break;
      case ResponseStatusCode.FORBIDDEN:
        toast.error(msg.message);
        break;
      case ResponseStatusCode.INTERNAL_SERVER_ERROR:
        toast.error(msg.message);
        break;
      case ResponseStatusCode.BAD_GATEWAY:
        toast.error(msg.message);
        break;
      case ResponseStatusCode.GATEWAY_TIMEOUT:
        toast.error(msg.message);
        if (router.currentRoute.value.path !== '/login') {
          router.replace('/error/500');
        }
        break;
      case ResponseStatusCode.BAD_REQUEST:
        toast.error(msg.message);
        break;
      case ResponseStatusCode.NOT_FOUND:
        toast.error(msg.message);
        break;
      case ResponseStatusCode.METHOD_NOT_ALLOWED:
        toast.error(msg.message);
        break;
      case ResponseStatusCode.CONFLICT:
        toast.error(msg.message);
        break;
      case ResponseStatusCode.TOO_MANY_REQUESTS:
        toast.error(msg.message);
        break;
      default:
        toast.error(msg.message);
    }
  }

  request(config) {
    return this.instance.request(config);
  }

  get(url, params, config) {
    return this.instance.get(url, { params, ...config });
  }

  post(url, data, config) {
    return this.instance.post(url, data, config);
  }

  put(url, data, config) {
    return this.instance.put(url, data, config);
  }

  delete(url, params, config) {
    return this.instance.delete(url, { params, ...config });
  }

  patch(url, data, config) {
    return this.instance.patch(url, data, config);
  }
}

export default new Request(axiosConfig);
