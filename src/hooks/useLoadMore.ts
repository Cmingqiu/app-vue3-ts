import { Store } from 'vuex';
import { Ref, computed, onMounted, onUnmounted } from 'vue';
import { IGlobalState } from '@/store';
import _ from 'lodash';

export function useLoadMore(
  ele: Ref<null | HTMLElement>,
  store: Store<IGlobalState>,
  type: string
) {
  let element: HTMLElement;
  let cb: Function;
  function loadMore() {
    const { clientHeight, scrollTop, scrollHeight } = element;
    if (scrollHeight - scrollTop - clientHeight <= 10) {
      store.dispatch(type);
    }
  }

  onMounted(() => {
    element = ele.value as HTMLElement;
    element.addEventListener('scroll', (cb = _.debounce(loadMore, 200)));
  });
  const isLoading = computed(() => store.state.home.lessons.loading);
  const hasMore = computed(() => store.state.home.lessons.hasMore);
  onUnmounted(() => {
    element.removeEventListener('scroll', cb as any);
  });
  return { isLoading, hasMore };
}

/* function debounce(fn: any, time: number = 300) {
  let timer: any;
  return function (...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.call(this, ...args);
    }, time);
  };
}
 */
