<template>
	<div class="tab-bar-item" @click="itemClick">
		<!-- <img src="../../assets/img/tabbar/home.svg" alt=""/>
		<div>首页</div> -->
		<div v-if="!isActive"><slot name="item-icon"></slot></div>
		<div v-else><slot name="item-icon-active"></slot></div>
		<div :style="activeStyle"><slot name="item-text"></slot></div>
		<!-- <div :class="{active:isActive}"><slot name="item-text"></slot></div> -->

	</div>
</template>

<script>
	export default {
		name: "TabBarItem",
		props:{
			path: String,
			activeColor:{
				type: String,
				default: 'red'
			}
		},
		data(){
			return{
				//isActive:true
			}
		},
		computed: {
			isActive() {
				// /home -> item(/home) = true
				// /home -> item(/category) = false
				// /home -> item(/cart) = false
				// /home -> item(/profile) = false
				return this.$route.path.indexOf(this.path) !==-1  //indexOf() ==-1 代表 false
			},
			activeStyle() {
				return this.isActive ? {color: this.activeColor} : {}
			}
			
		},
		methods:{
			itemClick(){
				this.$router.replace(this.path)
			}
		}
		
	}
</script>

<style>
	.tab-bar-item {
		flex: 1;
		text-align: center;
		height: 49px;
		font-size: 12px;
	}
	.tab-bar-item img {
		width: 24px;
		height: 24px;
	}
	/* .active {
		color: hotpink;
	} */
</style>
