<template>
  <div class="address">
    <nav-header></nav-header>
    <div class="container">
      <breadcrumb :data="breadcrumb"></breadcrumb>
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
            content: '地址管理',
            href: '/address'
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
