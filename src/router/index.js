import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Register from '@/pages/Register'
import Index from '@/pages/index'
import MyCenter from '@/pages/myCenter'
import Category from '@/pages/category'
import Bidding from '@/pages/bidding'
import ProductDetail from '@/pages/ProductDetail'
import pay from '@/pages/pay'
import MyPublish from '@/pages/myPublish'
import CreateBidding from '@/pages/createBidding'

Vue.use(Router)

const routes = [{
  path: '/',
  component: Index,
  meta: {
    name: '循易购拍卖平台'
  }
}, {
  path: '/login',
  component: Login,
  meta: {
    name: '循易购拍卖平台'
  }
}, {
  path: '/register',
  component: Register,
  meta: {
    name: '循易购拍卖平台'
  }
}, {
  path: '/myCenter',
  component: MyCenter,
  meta: {
    name: '循易购拍卖平台'
  }
}, {
  path: '/category',
  component: Category,
  meta: {
    name: '循易购拍卖平台'
  }
}, {
  path: '/bidding',
  component: Bidding,
  meta: {
    name: '循易购拍卖平台'
  }
}, {
  path: '/detail',
  component: ProductDetail,
  meta: {
    name: '循易购拍卖平台'
  }
}, {
  path: '/pay',
  component: pay,
  meta: {
    name: '循易购拍卖平台'
  }
}, {
  path: '/myPublish',
  component: MyPublish,
  meta: {
    name: '循易购拍卖平台'
  }
}, {
  path: '/createBidding',
  component: CreateBidding,
  meta: {
    name: '循易购拍卖平台'
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
