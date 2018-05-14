import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/Index'
import List from '@/view/List'

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
    }
  ]
})
