import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')

//1.安装插件
Vue.use(VueRouter)

//2.创建router
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    redirect: Category
  },
  {
    path: '/cart',
    redirect: Cart
  },
  {
    path: '/profile',
    redirect: Profile
  }

]
const router = new VueRouter({
  routes,
  mode: 'history'
})

//3.导出路由
export default router