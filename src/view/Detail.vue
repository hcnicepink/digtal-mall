<template>
  <div>
    <nav-header></nav-header>
    <div class="main">
      <div class="container">
        <breadcrumb :data="breadcrumb"></breadcrumb>
        <div class="detail clearfix">
          <div class="preview">
            <img :src="detail.pic[0].lg">
          </div>
          <div class="right-detail">
            <h1 class="title">{{ detail.title }}</h1>
            <p class="subtitle">{{ detail.subtitle }}</p>
            <div class="price">
              <div class="pro-price">
                <b>会员售价：</b><span>￥{{ detail.price }}</span>
              </div>
              <div class="promise">
                <b>服务承诺：</b>{{ detail.promise }}
              </div>
            </div>
            <div class="spec">
              <b>规格：</b>
            </div>
            <div class="account-chose">
              <b>数量：</b>
            </div>
            <div class="shop"></div>
          </div>
        </div>
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
    axios.get('/goods/detail', {
      params: this.$route.query
    }).then(response => {
      let res = response.data
      if (res.code === 200) {
        this.detail = res.result
      }
      this.$store.commit('updateBreadcrumb', [
        {
          href: '/list/?categoryid=all',
          content: '全部商品'
        },
        {
          href: `/list/?categoryid=${res.result.category._id}`,
          content: res.result.category.name
        },
        {
          href: `/detail?id=${res.result._id}`,
          content: res.result.name
        }
      ])
    })
  },
  data () {
    return {
      detail: {}
    }
  },
  computed: {
    breadcrumb () {
      return this.$store.state.breadcrumb
    }
  }
}
</script>
<style scoped>
.detail .preview {
  float: left;
  width: 490px;
}
.detail .preview img {
  margin: 30px 20px 10px 20px;
  width: 450px;
  height: 450px;
}
.detail .right-detail {
  float: right;
  width: 730px;
}
</style>
