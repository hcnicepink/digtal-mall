<template>
  <div class="order-success">
    <nav-header></nav-header>
    <div class="container">
      <breadcrumb :data="breadcrumb"></breadcrumb>
      <div class="main">
        <img src="../assets/smile.png" alt="">
        <h1>恭喜，下单成功！<br>
          您的订单正在处理！</h1>
        <p>订单编号：<span>{{ $route.query.orderId }}</span>&emsp;订单总价：<span>{{ $route.query.total | currency('￥') }}</span></p>
        <a href="/cart" class="button left">购物车</a>
        <a href="/list?categoryid=all" class="button right">商品列表</a>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  mounted () {
    this.$store.commit('updateBreadcrumb', [
      {
        content: '下单成功',
        href: '/orderSuccess'
      }
    ])
  },
  components: {
    NavHeader,
    NavFooter,
    Breadcrumb
  },
  computed: {
    breadcrumb () {
      return this.$store.state.breadcrumb
    }
  }
}
</script>
<style scoped>
.order-success .container .main {
  margin: 100px;
  text-align: center;
}
.order-success .container .main h1 {
  margin: 30px 0;
  color: #555;
  font-size: 28px;
  line-height: 1.5;
  font-weight: normal;
}
.order-success .container .main p {
  color: #777;
  font-size: 18px;
}
.order-success .container .main p span {
  color: #666;
  font-weight: bold;
}
.order-success .container .main a.button {
  display: inline-block;
  text-decoration: none;
  margin: 15px 40px;
  padding: 10px 20px;
  line-height: 1.33333;
  border-radius: 3px;
  font-size: 14px;
  width: 170px;
  text-align: center;
  cursor: pointer;
}
.order-success .container .main a.left {
  border: 1px solid #00c3f5;
  color: #00c3f5;
}
.order-success .container .main a.right {
  color: #fff;
  background-color: #00c3f5;
}
.order-success .container .main a.left:hover {
  background-color: #cbf0fc;
}
.order-success .container .main a.right:hover {
  color: #fff;
  background-color: #4dcff6;
}
.order-success .container .main a.button:active {
  outline: 0;
  background-image: none;
  box-shadow: inset 0 3px 5px rgba(0,0,0,.125);
}
</style>
