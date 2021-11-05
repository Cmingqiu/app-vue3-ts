import axios from '.';

/* 请求轮播图 */
export function fetchSwiper<T>() {
  return axios.get<T, T>('/getSlidersList');
}
