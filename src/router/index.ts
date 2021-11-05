import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName:"Home" */ '@/views/home/index.vue')
  },
  {
    path: '/lesson',
    name: 'Lesson',
    component: () =>
      import(/* webpackChunkName: "Lesson" */ '@/views/lesson/index.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () =>
      import(/* webpackChunkName: "Mine" */ '@/views/mine/index.vue')
  }
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
