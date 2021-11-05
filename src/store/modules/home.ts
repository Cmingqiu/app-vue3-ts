import { fetchSwiper } from '@/api/home';
import { CATEGORY_TYPES, IHomeState, ISlider } from '@/typings/home';
import { Module } from 'vuex';
import { IGlobalState } from '..';
import * as Types from '../action-types';

const state: IHomeState = {
  currentCategory: CATEGORY_TYPES.ALL,
  sliders: [],
  lessons: {
    hasMore: false, // 是否有更多数据
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
    }
  },
  actions: {
    async [Types.SET_SLIDER_LIST]({ commit }) {
      let sliders = await fetchSwiper<ISlider>();
      console.log('sliders', sliders);
      commit(Types.SET_SLIDER_LIST, sliders);
    }
  }
};

export default home;
