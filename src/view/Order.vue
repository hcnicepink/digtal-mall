<template>
  <div class="order">
    <nav-header></nav-header>
    <div class="container">
      <breadcrumb :data="breadcrumb"></breadcrumb>
      <div class="order-address">
        <div class="order-address-title"></div>
        <ul class="order-address-list clearfix"></ul>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import Breadcrumb from '@/components/Breadcrumb'
import axios from 'axios'
export default {
  components: {
    NavHeader,
    NavFooter,
    Breadcrumb
  },
  mounted () {
    axios.get('/user/checkLogin').then(response => {
      let res = response.data
      if (res.code === 201) {
        alert('请登录后重试')
        this.$router.push('/')
      } else {
        this.$store.commit('updateBreadcrumb', [
          {
            content: '订单确认',
            href: '/orderConfirm'
          }
        ])
      }
    })
  },
  computed: {
    breadcrumb () {
      return this.$store.state.breadcrumb
    }
  }
}
</script>
