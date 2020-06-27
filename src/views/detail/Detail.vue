<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick"/>
    <scroll class="content" 
            ref='scroll'
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper ref="swiper" :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imagesLoad="imagesLoad" />
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar />
  </div>
</template>
<script>
  import DetailNavBar from '../../views/detail/childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBashInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'
  import BackTop from '../../components/content/backTop/BackTop'

  import Scroll from '../../components/common/scroll/Scroll'
  import GoodsList from '../../components/content/goods/GoodsList'

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from '../../network/detail'
import { debounce } from '../../common/utils'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      BackTop
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTops: [],
        getThemeTopY: null,
        currentIndex: 0,
        isShowBackTop: false
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        //1.获取顶部的图片轮播数据
        console.log(res)
        const data = res.result;
        this.topImages = data.itemInfo.topImages;

        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo

        //5.保存参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //6.保存评论
        if(data.rate.length != 0){
          this.commentInfo = data.commentInfo;
        }
      })

      //3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

      //4.给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTops.push(this.$refs.swiper.$el.offsetTop)
        this.themeTops.push(this.$refs.param.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop)
      },200)
    },
    methods: {
      imagesLoad() {
        this.$refs.scroll.refresh();
        //this.newRefresh();
        this.getThemeTopY();
      },
      titleClick(index) {
        this.$ref.scroll.scrollTo(0,-this.themeTops(index), 100)
      },
      backClick() {
        this.$refs.scroll.scrollTo(0,0)
      },
      // _getOffsetTops() {
      //   this.themeTops = []
      //   this.themeTops.push(this.$refs.swiper.$el.offsetTop)
      //   this.themeTops.push(this.$ref.param.$el.offsetTop)
      //   this.themeTops.push(this.$ref.comment.$el.offsetTop)
      //   this.themeTops.push(this.$ref.recommend.$el.offsetTop)
      //   this.themeTops.push(Number.MAX_VALUE)
      // },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000
        //1.获取y值
        const positionY = -position.y

        //2.positionY和主题中值进行对比

        let length = this.themeTops.length
        for(let i = 0; i < length - 1; i++) {
          let iPos = this.themeTops[i];

          if(positionY >= iPos && this.themeTops[i+1]) {
            if(this.currentIndex !== i) {
              this.currentIndex = i;
              this.$refs.nav.currentIndex = this.currentIndex
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content {
    height: calc(100% - 44px);
    overflow: hidden;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>