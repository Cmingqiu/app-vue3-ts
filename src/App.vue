<template>
  <div class="main-wrapper">
    <router-view v-slot="{ Component }">
      <keep-alive :max="5">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>

  <div id="nav">
    <van-tabbar route>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/lesson" icon="orders-o"> 课程 </van-tabbar-item>
      <van-tabbar-item to="/mine" icon="manager-o"> 我的 </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss"></style>
