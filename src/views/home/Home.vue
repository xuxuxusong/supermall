<template>
	<div id="home">
    <nav-bar class="home-nav"><div slot='center'>购物街</div></nav-bar>
    <tab-control class="tab-control" 
                    :titles="['流行','精选','新款']" 
                    @tabClick="tabClick"
                    ref="tabControl1"
                    v-show="isTabFixed" />
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            :pull-up-load='true'
            @scroll="contentScroll"
            @pullingUp="LoadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','精选','新款']" 
                    @tabClick="tabClick"
                    ref="tabControl2"/>
      <goods-list :goods="goods[currentType].list"/> 
      <goods-list :goods="showGoods"/>
    </scroll>
    <!--在我们需要监听一个组件的原生事件时，必须给对应的事件加上native修饰符，才能进行监听 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from '../../components/common/navbar/NavBar';
  import TabControl from "../../components/content/tabControl/TabControl"
  import GoodsList from '../../components/content/goods/GoodsList';
  import Scroll from '../../components/common/scroll/Scroll'
  import BackTop from '../../components/content/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods } from '../../network/home';
  import {debounce} from '../../common/utils'



	export default {
    name: "Home",
    components: {
      NavBar,
      // Swiper,
      // SwiperItem
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        // result: null
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    // destroyed() {
    //     console.log("home destroy");
    // },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      // this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
      console.log(this.saveY)
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata();

      //2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      });
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;

      },

      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          this.$refs.scroll.finishPullUp()
        })
      },
      backClick() {
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position) {
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000

        // 2.决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      LoadMore() {
        this.getHomeGoods(this.currentType)

        //this.$refs.scroll.scroll.refresh()
      },

      swiperImageLoad() {
        // 所有组件都有一个属性$el 用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      console.log(this.tabOffsetTop);
      }
    }
	}
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  /* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  } */
  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* .content {
    height: cacl(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
