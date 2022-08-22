import axios from "axios";

const api = axios.create({
  baseURL:
    "https://staging-api.bloobloom.com/user/v1/sales_channels/website/collections/",
  timeout: 60000,
});

// This should be the *last* request interceptor to add
api.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// This should be the *first* response interceptor to add
api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
