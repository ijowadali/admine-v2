import Request from '../axios';

export const loginApi = (data) => {
  return Request.post('/auth/login', { ...data });
};

export const getUserInfoApi = () => {
  return Request.get('/users/authenticated');
};
