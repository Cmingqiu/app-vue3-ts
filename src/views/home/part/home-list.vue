<template>
  <div class="home-list" ref="refreshElm">
    <van-card
      v-for="(lesson, i) in lessonList"
      :key="i"
      :price="lesson.price"
      :title="lesson.title"
      :thumb="lesson.imgUrl"
      num="1"
    >
      <template #tags>
        <van-tag plain type="danger">{{ formatTag(lesson.category) }}</van-tag>
      </template>
    </van-card>
    <div v-if="isLoading" class="text-c"><van-loading color="#1989fa" /></div>
    <div v-if="!hasMore" class="bottom-no-data-tip">~~我是有底线的~~</div>
  </div>
</template>

<script lang="ts">
import { CATEGORY_TYPES, ILesson } from '@/typings/home';
import { defineComponent, PropType, ref } from 'vue';
import { useLoadMore } from '@/hooks/useLoadMore';
import store from '@/store';
import * as Types from '@/store/action-types';

export default defineComponent({
  name: 'HomeList',
  props: {
    lessonList: {
      type: Array as PropType<ILesson[]>
    }
  },
  setup(props) {
    function formatTag(category: CATEGORY_TYPES) {
      switch (category) {
        case 1:
          return 'vue课程';
          break;
        case 2:
          return 'react课程';
          break;
        case 3:
          return 'node课程';
          break;
        default:
          return '';
          break;
      }
    }
    const refreshElm = ref<null | HTMLElement>(null);
    const { isLoading, hasMore } = useLoadMore(
      refreshElm,
      store,
      `home/${Types.SET_LESSON_LIST}`
    );
    return { formatTag, refreshElm, isLoading, hasMore };
  }
});
</script>
