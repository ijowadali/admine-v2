import { useEnv } from '../../hooks/useEnv';

const { apiUrl, apiPrefix } = useEnv();

export const axiosConfig = {
  baseURL: apiUrl + apiPrefix,
  timeout: 30000,
  withCredentials: true,
};
