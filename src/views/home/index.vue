<template>
  <div class="home">
    <!-- 首页头部 -->
    <HomeHeader :category="category" @setCurrentCategory="setCurrentCategory" />
    <!-- 轮播图 （异步组件写法）-->
    <Suspense>
      <template #default>
        <HomeSwiper />
      </template>
      <template #fallback>
        <van-loading type="spinner" color="#1989fa">加载中...</van-loading>
      </template>
    </Suspense>
    <!-- 课程列表 -->
    <HomeList />
  </div>
</template>

<script lang="ts">
import HomeHeader from './part/home-header.vue';
import HomeSwiper from './part/home-swiper.vue';
import HomeList from './part/home-list.vue';

import { IGlobalState } from '@/store';
import * as Types from '@/store/action-types';
import { CATEGORY_TYPES } from '@/typings/home';
import { computed, defineComponent, onMounted } from 'vue';
import { Store, useStore } from 'vuex';

function useCategory(store: Store<IGlobalState>) {
  let category = computed(() => store.state.home.currentCategory);
  const setCurrentCategory = (category: CATEGORY_TYPES) => {
    store.commit(`home/${Types.SET_CATEGORY}`, category);
  };
  return {
    category,
    setCurrentCategory
  };
}

export default defineComponent({
  name: 'Home',
  components: { HomeHeader, HomeSwiper, HomeList },
  setup() {
    const store = useStore<IGlobalState>();
    let { category, setCurrentCategory } = useCategory(store);

    return {
      category,
      setCurrentCategory
    };
  }
});
</script>
