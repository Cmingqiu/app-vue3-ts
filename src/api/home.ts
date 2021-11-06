import { ILessonsParams } from '@/typings/home';
import axios from '.';

/* 请求轮播图 */
export function fetchSwiper<T>() {
  return axios.get<T, T>('/getSlidersList');
}

/* 请求课程列表 */
export function fetchLessons<T>(data: ILessonsParams) {
  return axios.post<T, T>('/getLessonList', data);
}
