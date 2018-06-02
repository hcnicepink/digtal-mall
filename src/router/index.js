import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/Index'
import List from '@/view/List'
import Detail from '@/view/Detail'
import Member from '@/view/Member'
import Address from '@/view/Address'
import Cart from '@/view/Cart'
import OrderConfirm from '@/view/OrderConfirm'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/member',
      name: 'Member',
      component: Member
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/orderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    }
  ]
})
