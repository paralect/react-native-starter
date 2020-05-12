import axios from 'axios';

import config from 'resources/config';

import ApiError from './api.error';

// Do not throw errors on 'bad' server response codes
axios.interceptors.response.use(
  axiosConfig => axiosConfig,
  error => error.response || {},
);

const generalError = {
  _global: ['Unexpected error occurred.'],
};

const throwApiError = ({ data = {}, status = 500 }) => {
  throw new ApiError(data, status);
};

const httpRequest = method => async (url, data) => {
  let urlWithSlash = url;

  if (urlWithSlash[0] !== '/') {
    urlWithSlash = `/${urlWithSlash}`;
  }
  const options = {
    headers: {
      Authorization: `Bearer ${config.token}`,
      'X-Application-ID': config.applicationId,
    },
    method,
    url: `${config.apiUrl}${urlWithSlash}`,
  };

  if (data) {
    if (data.blob) {
      options.responseType = 'blob';
    }

    if (method === 'get') {
      options.params = data;
    } else {
      options.data = data;
    }
  }

  const response = await axios(options);
  if (!response) {
    throwApiError({
      data: { errors: generalError },
      status: 500,
    });
    return null;
  }

  response.data = response.data || {};
  response.status = response.status || 500;

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  if (response.status === 400) {
    throwApiError(response);
  }

  response.data.errors = response.data.errors || generalError;
  throwApiError(response);
  return null;
};

export const getRequest = httpRequest('get');
export const postRequest = httpRequest('post');
export const putRequest = httpRequest('put');
export const deleteRequest = httpRequest('delete');

const apiClient = {
  get: getRequest,
  post: postRequest,
  put: putRequest,
  delete: deleteRequest,
};

export default apiClient;
