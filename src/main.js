// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import {currency} from './util/currency'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userEmail: '',
    category: [],
    breadcrumb: [],
    userInfo: {},
    cartList: []
  },
  mutations: {
    updateUserEmail (state, userEmail) {
      state.userEmail = userEmail
    },
    updateCategory (state, category) {
      state.category = category
    },
    updateBreadcrumb (state, breadcrumb) {
      state.breadcrumb = breadcrumb
    },
    updateUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    updateCartList (state, cartList) {
      state.cartList = cartList
    }
  }
})

Vue.filter('currency', currency)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
