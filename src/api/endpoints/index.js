import Request from '../axios';

export const getRecordsApi = (endpoint, params) => {
  return Request.get(endpoint, {
    ...params,
  });
};

export const getRecordApi = (endpoint) => {
  return Request.get(endpoint);
};

export const createRecordApi = (endpoint, data) => {
  return Request.post(endpoint, { ...data });
};

export const updateRecordApi = (endpoint, data) => {
  return Request.put(endpoint, {
    ...data,
  });
};

export const deleteRecordApi = (endpoint) => {
  return Request.delete(endpoint);
};
