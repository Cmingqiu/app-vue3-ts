<template>
  <div class="home-swiper">
    <van-swipe class="swipe-container" v-if="sliders.length" :autoplay="3000">
      <van-swipe-item v-for="slider in sliders" :key="slider">
        <img class="swiper-img" :src="slider.url" alt="" srcset="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
import { IGlobalState } from '@/store';
import * as Types from '@/store/action-types';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'HomeSwiper',
  async setup() {
    const store = useStore<IGlobalState>();
    let sliders = computed(() => store.state.home.sliders);
    // 缓存
    if (!sliders.value.length) {
      await store.dispatch(`home/${Types.SET_SLIDER_LIST}`);
    }
    return { sliders };
  }
});
</script>
