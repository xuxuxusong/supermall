<template>
	<div class="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <tab-control :titles="['综合','新品','销量']"></tab-control>
  </div>
  
</template>

<script>
  import BScorll from 'better-scroll';
  import NavBar from '../../components/common/navbar/NavBar'
  import TabControl from './childComps/TabControl'

	export default {
    name: "Category",
    components: {
      NavBar,
      TabControl
    },
    data() {
      return {
        scroll: null
      }
    },
    created() {
      
    },

    //组件创建完后调用
    mounted() {
      // this.scroll = new BScorll('.wrapper', {
      //   probeType: 3,
      //   pullUpLoad: true,
      //   click: true
      // })

      // this.scroll.on('scroll', (position) => {
      //   console.log(position);
      // })

      // this.scroll.on('pullingUp', () => {
      //   console.log('上拉加载更多！')
      // })
    }
	}
</script>

<style scoped>
  .nav-bar {
    color: #fff;
    background-color: var(--color-tint);
    font-weight: 700;
  }
</style>
