<template>
  <div id="use-info">
      <a class="clear-fix"> 
        <img src="../../../assets/img/common/top.png" alt=""/>
        <div class="login-info left">
          <slot name="user-nickname">
            <div>登录/注册</div>
          </slot>
          <div class="phone">
            <span>
              <i class="el-icon-mobile-phone"></i>
            </span>
            <slot name="user-phone">暂无绑定手机号</slot>
          </div>
        </div>
        <div class="icon1"><i class="el-icon-arrow-right"></i></div>
      </a>
    </div>
</template>
<script>
	export default {
		name: "UserInfo"
	}
</script>

<style scoped>
  #use-info {
    background-color: var(--color-tint);
  }
  .clear-fix img {
    width: 80px;
    height: 80px;
    padding: 10px;
    cursor: pointer;
  }
  .login-info {
    display: inline-block;
    position: absolute;
    
    margin-top: 25px;
    font-size: 14px;
    color: #fff;
  }
  .phone {
    font-size: 13px;
  }
  
  .icon1 {
    color: #fff;
    float: right;
    margin-right: 10px;
    margin-top: 32px;
  }
</style>
