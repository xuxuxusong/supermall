<template>
  <div id="app">
    <keep-alive exclude="Detail"> <!--exclude 排除在外 -->
      <router-view/>
    </keep-alive>
    <!-- <router-view/> -->
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from './components/content/mainTabbar/MainTabBar'

  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
