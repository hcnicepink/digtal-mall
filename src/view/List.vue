<template>
  <div>
      <nav-header></nav-header>
      <div class="main">
        <div class="container">
          <breadcrumb :data="breadcrumb"></breadcrumb>
        </div>
      </div>
  </div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  components: {
    NavHeader,
    Breadcrumb
  },
  data () {
    return {
      breadcrumb: [
        {
          href: '#',
          content: '全部商品'
        },
        {
          href: '#',
          content: '手机'
        }
      ]
    }
  }
}
</script>
<style scoped>
.main {
  background-color: #f8f8f8;
}
</style>
