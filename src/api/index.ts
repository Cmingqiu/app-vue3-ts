import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// axios.defaults.baseURL = 'http://www.fullstackjavascript.cn:3000';
axios.defaults.baseURL = 'http://localhost:9000';

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
});

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    //错误code
    if (response.data.code === -1) {
      return Promise.reject(response.data.data);
    }
    return response.data.data;
  },
  err => {
    return Promise.reject(err);
  }
);

export default axios;
