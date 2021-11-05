import { IHomeState } from '@/typings/home';
import { createStore } from 'vuex';
import home from './modules/home';

export interface IGlobalState {
  home: IHomeState;
  // 其他模块...
}

export default createStore<IGlobalState>({
  // state: {},
  mutations: {},
  actions: {},
  modules: { home }
});
