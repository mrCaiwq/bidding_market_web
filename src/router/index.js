import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Register from '@/pages/Register'
import Index from '@/pages/index'
import MyCenter from '@/pages/myCenter'
import Category from '@/pages/category'
import Bidding from '@/pages/bidding'
import ProductDetail from '@/pages/ProductDetail'
import InputPrice from '@/pages/inputBiddingPrice'
import MyPublish from '@/pages/myPublish'
import CreateBidding from '@/pages/createBidding'

Vue.use(Router)

const routes = [{
  path: '/',
  component: Index,
  meta: {
    name: '首页'
  }
}, {
  path: '/login',
  component: Login,
  meta: {
    name: '登陆'
  }
}, {
  path: '/register',
  component: Register,
  meta: {
    name: '注册'
  }
}, {
  path: '/myCenter',
  component: MyCenter,
  meta: {
    name: '我的'
  }
}, {
  path: '/category',
  component: Category,
  meta: {
    name: '分类'
  }
}, {
  path: '/bidding',
  component: Bidding,
  meta: {
    name: '拍卖'
  }
}, {
  path: '/detail',
  component: ProductDetail,
  meta: {
    name: '商品详情'
  }
}, {
  path: '/inputPrice',
  component: InputPrice,
  meta: {
    name: '竞价'
  }
}, {
  path: '/myPublish',
  component: MyPublish,
  meta: {
    name: '我的拍卖物品'
  }
}, {
  path: '/createBidding',
  component: CreateBidding,
  meta: {
    name: '创建拍卖'
  }
}]

const router = new Router({
  routes
})


router.beforeEach((to, from, next) => {
  // 除了登陆页面，其余页面均需登陆
  if (to.path !== '/login' && to.path !== '/register' && !localStorage.getItem('token')) {
    return router.push({
      path: '/login'
    })
  }
  document.title = to.meta.name
  next()
})

export default router
