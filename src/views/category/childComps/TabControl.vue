<template>
  <div class="tab-control">
    <div class="tab-control-item" 
         v-for="(item, index) in titles"
         :class="{active: currentIndex === index}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
  }
  .tab-control-item {
    flex: 1;
    padding-top: 5px;
  }
  .tab-control-item span{
    padding: 5px;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 2px solid var(--color-high-text);
  }
</style>