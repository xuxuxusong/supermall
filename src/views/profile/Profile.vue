<template>
  <div id="profile">
    <nav-bar class="nav-bar">
      <div slot="center">小马哥商城</div>
    </nav-bar>
    <user-info></user-info>
    <section class="account">
      <div class="account-item">
        <div class="number"><span class="balance">0.00</span>元</div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number"><span class="balance">0</span>个</div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number"><span class="balance">0</span>分</div>
        <div class="account-info">我的积分</div>
      </div>
    </section>
    <list-view :list-data="orderList" class="order-list"></list-view>
    <list-view :list-data="serviceList" class="service-list"></list-view>
  </div>
  
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar'
  import UserInfo from './childComps/UserInfo'
  import ListView from './childComps/ListView'

	export default {
    name: "Profile",
    components: {
      NavBar,
      UserInfo,
      ListView
    },
    data() {
      return {
        orderList: [
          {icon: 'el-icon-tickets', iconColor: '#ff8198', info: '我的消息'},
          {icon: 'el-icon-shopping-bag-2', iconColor: '#fc7b53', info: '积分商城'},
          {icon: 'el-icon-trophy', iconColor: '#ffc636', info: '会员卡'},
        ],
        serviceList: [
          {icon: 'el-icon-shopping-cart-2', iconColor: '#ff8198', info: '我的购物车'},
          {icon: 'el-icon-platform-eleme', iconColor: '#ff8198', info: '下载购物APP'},
        ]
      }
    }
    
	}
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }
  .nav-bar {
    color: #fff;
    background-color: var(--color-tint);
    font-weight: 700;
  }
  .account {
    background-color: #fff;
    display: flex;
    border-bottom: 10px solid rgb(116, 114, 114, 0.1);
  }
  .account-item {
    flex: 1;
    padding: 20px;
    text-align: center;
    font-size: 12px;
  }
  .account-item:nth-child(2) {
    border-right: 1px solid rgb(116, 114, 114, 0.1);
    border-left:1px solid rgb(116, 114, 114, 0.1);
  }
  .balance {
    font-weight: 700;
    color: rgb(245, 11, 11);
    font-size: 24px;
  }
  .account-info {
    margin-top: 5px;
  }
  .order-list {
    border-bottom: 10px solid rgb(116, 114, 114, 0.1);
  }
  
</style>

