import { fetchLessons, fetchSwiper } from '@/api/home';
import {
  CATEGORY_TYPES,
  IHomeState,
  ILesson,
  ILessons,
  ISlider
} from '@/typings/home';
import { Module } from 'vuex';
import { IGlobalState } from '..';
import * as Types from '../action-types';

const state: IHomeState = {
  currentCategory: CATEGORY_TYPES.ALL,
  sliders: [],
  lessons: {
    hasMore: true, // 是否有更多数据
    loading: false, //是否正在加载
    offset: 0,
    limit: 5,
    list: [] //页面显示课程列表
  }
};

/* Module  S:当前状态的类型 R：全局状态的类型，即最外层实例state的状态 */
const home: Module<IHomeState, IGlobalState> = {
  namespaced: true,
  state,
  mutations: {
    [Types.SET_CATEGORY](state, payload: CATEGORY_TYPES) {
      state.currentCategory = payload;
    },
    [Types.SET_SLIDER_LIST](state, payload: Array<ISlider>) {
      state.sliders = payload;
    },
    [Types.SET_LOADING](state, payload: boolean) {
      state.lessons.loading = payload;
    },
    [Types.SET_LESSON_LIST](state, payload: ILessons) {
      // state.lessons.list = [...state.lessons.list, ...payload.list];
      state.lessons.list = state.lessons.list.concat(payload.list);
      state.lessons.hasMore = payload.hasMore;
      state.lessons.offset += payload.list.length;
    }
  },
  actions: {
    async [Types.SET_SLIDER_LIST]({ commit }) {
      const sliders = await fetchSwiper<ISlider>();
      commit(Types.SET_SLIDER_LIST, sliders);
    },
    async [Types.SET_LESSON_LIST]({ commit }) {
      if (state.lessons.loading) return;
      if (!state.lessons.hasMore) return;
      commit(Types.SET_LOADING, true);

      const lessons = await fetchLessons<ILessons>({
        category: state.currentCategory,
        offset: state.lessons.offset,
        limit: state.lessons.limit
      });
      commit(Types.SET_LESSON_LIST, lessons);

      commit(Types.SET_LOADING, false);
    }
  }
};

export default home;
