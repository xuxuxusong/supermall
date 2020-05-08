<template>
	<div id="home">
    <nav-bar class="home-nav"><div slot='center'>购物街</div></nav-bar>
    <home-swiper :banners="banners" />
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control class="tab-contorl" :titles="['流行','精选','新款']"/>
    <ul>
      <li>x1</li>
      <li>x2</li>
      <li>x3</li>
      <li>x4</li>
      <li>x5</li>
      <li>x6</li>
      <li>x7</li>
      <li>x8</li>
      <li>x9</li>
      <li>x10</li>
      <li>x11</li>
      <li>x12</li>
      <li>x13</li>
      <li>x14</li>
      <li>x15</li>
      <li>x16</li>
      <li>x17</li>
      <li>x18</li>
      <li>x19</li>
      <li>x20</li>
      <li>x21</li>
      <li>x22</li>
      <li>x23</li>
      <li>x24</li>
      <li>x25</li>
      <li>x26</li>
      <li>x27</li>
      <li>x28</li>
      <li>x29</li>
      <li>x30</li>
      <li>x31</li>
      <li>x32</li>
      <li>x33</li>
      <li>x34</li>
      <li>x35</li>
      <li>x36</li>
      <li>x37</li>
      <li>x38</li>
      <li>x39</li>
      <li>x40</li>
      <li>x41</li>
      <li>x42</li>
      <li>x43</li>
      <li>x44</li>
      <li>x45</li>
      <li>x46</li>
      <li>x47</li>
      <li>x48</li>
      <li>x49</li>
      <li>x50</li>
    </ul>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from '../../components/common/navbar/NavBar';
  import TabControl from "../../components/content/tabControl/TabControl"

  import {getHomeMultidata} from '../../network/home';


	export default {
    name: "Home",
    components: {
      NavBar,
      // Swiper,
      // SwiperItem
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl
    },
    data() {
      return {
        // result: null
        banners: [],
        recommends: []
      }
    },
    created() {
      // 1.请求多个数据
      getHomeMultidata().then(res => {
        console.log(res);
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
	}
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-contorl {
    position: sticky;
    top: 44px;
  }
</style>
