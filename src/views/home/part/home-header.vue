<template>
  <div class="home-header">
    <div>home-header</div>
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item
        :modelValue="category"
        :options="menus"
        @change="changeCategory"
      ></van-dropdown-item>
    </van-dropdown-menu>
  </div>
</template>

<script lang="ts">
import { CATEGORY_TYPES } from '@/typings/home';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'HomeHeader',
  props: {
    category: {
      type: Number as PropType<CATEGORY_TYPES>
    }
  },
  emits: ['setCurrentCategory'],
  setup(props, { emit }) {
    const menus = [
      { text: '全部课程', value: CATEGORY_TYPES.ALL },
      { text: 'vue课程', value: CATEGORY_TYPES.VUE },
      { text: 'react课程', value: CATEGORY_TYPES.REACT },
      { text: 'node课程', value: CATEGORY_TYPES.NODE }
    ];
    const changeCategory = (value: CATEGORY_TYPES) => {
      emit('setCurrentCategory', value);
    };
    return {
      menus,
      changeCategory
    };
  }
});
</script>
