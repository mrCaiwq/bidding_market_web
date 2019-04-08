// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import moment from 'moment'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import('swiper/dist/css/swiper.css')
// 全局注册的组件
import Notify from '../src/components/toast'


import 'lib-flexible/flexible.js'

Vue.use(Notify)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.http = Vue.prototype.$http = axios
Vue.prototype.$moment = moment;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,
  },
  template: '<App/>'
})
