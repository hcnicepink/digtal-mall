<template>
  <div>
    <nav-header></nav-header>
    <div class="main">
      <div class="container">
        <breadcrumb :data="breadcrumb"></breadcrumb>
        <div class="detail clearfix">
          <div class="preview">
            <img class="show-img" :src="typeof detail.pic === 'undefined' ? '' : detail.pic[0].lg">
            <ul class="icon-list clearfix">
              <li class="icon-list-selected"><img :src="typeof detail.pic === 'undefined' ? '' : detail.pic[0].sm" alt=""></li>
            </ul>
          </div>
          <div class="right-detail">
            <h1 class="title">{{ detail.title }}</h1>
            <h2 class="subtitle">{{ detail.subtitle }}</h2>
            <div class="price">
              <div class="pro-price">
                价&emsp;&emsp;格：<span>{{ detail.price | currency('￥') }}</span>
              </div>
              <div class="promise">
                服务承诺：{{ detail.promise }}
              </div>
            </div>
            <div class="spec">
              规&emsp;&emsp;格：<div>
                <a
                v-for="(elem, index) in spec"
                :href="elem.spec === detail.spec ? '#' : `/detail?id=${elem._id}`"
                :class="{'selected': elem.spec === detail.spec}"
                :key="index">{{ elem.spec }}</a>
              </div>
            </div>
            <div class="account-chose">
              数&emsp;&emsp;量：<input-number :num="1" @updateNum="(num) => {accountChose = num}"></input-number>
            </div>
            <div class="buy-action">
              <div class="store-buy">立即购买</div>
              <div class="store-cart" @click="addCart">加入购物车</div>
            </div>
          </div>
        </div>
        <div class="item-info">
          <div class="tab">
            <div class="tab-lf">
              <div class="cat">
                <span class="selected">商品详情</span>
                <span>商品评价</span>
              </div>
            </div>
            <div class="cart-rt">
              <div>
                <div class="brief-introduction">
                  <span class="name">{{ detail.name }}</span><span class="price">￥{{ detail.price }}</span>
                </div>
                <div class="spec">
                  {{ detail.spec }}
                </div>
              </div>
              <button @click="addCart">加入购物车</button>
            </div>
          </div>
          <div class="left">
            <div class="details">
              <div class="param">
                <p class="title">规格参数<img src="@/assets/params.png" alt=""></p>
                <ul class="content clearfix">
                  <li v-for="(elem, index) in detail.param" :key="index">{{ `${elem.name}：${elem.detail}` }}</li>
                </ul>
              </div>
              <div class="product_introduction">
                <p class="title">商品介绍<img src="@/assets/pic.png" alt=""></p>
                <img v-for="(elem, index) in detail.details_img" :key="index" :src="elem" alt="product_introduction">
              </div>
              <div class="sale_protection">
                <p class="title">售后保障</p>
                <dl>
                  <dt><img src="@/assets/shield.png">商城承诺</dt>
                  <dd>潮数码平台卖家销售并发货的商品，由平台卖家提供发票和相应的售后服务。请您放心购买！<br>
注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！</dd>
                  <dt><img src="@/assets/shield.png">正品行货</dt>
                  <dd>潮数码商城向您保证所售商品均为正品行货，潮数码自营商品开具机打发票或电子发票。</dd>
                  <dt><img src="@/assets/wrench.png">全国联保</dt>
                  <dd>凭质保证书及潮数码商城发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由潮数码联系保修，享受法定三包售后服务），与您亲临商场选购的商品享受相同的质量保证。商城还为您提供具有竞争力的商品价格和运费政策，请您放心购买！<br><br>
注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！</dd>
                  <dt><img src="@/assets/heart.png">无忧退换货</dt>
                  <dd>客户购买潮数码自营商品7日内（含7日，自客户收到商品之日起计算），在保证商品完好的前提下，可无理由退货。（部分商品除外，详情请见各商品细则）</dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="right"></div>
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
import InputNumber from '@/components/InputNumber'
import axios from 'axios'
export default {
  components: {
    NavHeader,
    NavFooter,
    Breadcrumb,
    InputNumber
  },
  mounted () {
    axios.get('/goods/detail', {
      params: this.$route.query
    }).then(response => {
      let res = response.data
      if (res.code === 200) {
        this.detail = res.result.detail
        this.spec = res.result.spec
      }
      this.$store.commit('updateBreadcrumb', [
        {
          href: '/list/?categoryid=all',
          content: '全部商品'
        },
        {
          href: `/list/?categoryid=${res.result.detail.category._id}`,
          content: res.result.detail.category.name
        },
        {
          href: `/detail?id=${res.result.detail._id}`,
          content: res.result.detail.name
        }
      ])
    })
  },
  data () {
    return {
      detail: {},
      spec: [],
      accountChose: 1
    }
  },
  computed: {
    breadcrumb () {
      return this.$store.state.breadcrumb
    }
  },
  methods: {
    addCart () {
      axios.post('/user/addCart', {
        goods: {
          _id: this.detail._id,
          name: this.detail.name,
          price: this.detail.price,
          spec: this.detail.spec,
          pic: this.detail.pic,
          href: this.$route.fullPath
        },
        count: this.accountChose,
        is_check: true
      }).then(response => {
        let res = response.data
        alert(res.msg)
        if (res.code === 200) {
          this.$store.commit('updateCartList', res.result)
        }
      })
    }
  }
}
</script>
<style scoped>
.detail .preview {
  float: left;
  width: 550px;
}
.detail .preview .show-img {
  margin: 10px 50px;
  width: 450px;
  height: 450px;
}
.detail .preview .icon-list {
  margin: 0 50px;
  padding: 0;
}
.detail .preview .icon-list li {
  float: left;
  padding: 5px;
  list-style-type: none;
  height: 66px;
  width: 66px;
  margin: 0 10px;
  border: 1px solid #fff;
}
.detail .preview .icon-list li img {
  width: 54px;
  height: 54px;
}
.icon-list-selected {
  border-color: #dcdcdc !important;
}
.detail .right-detail {
  float: right;
  padding-right: 60px;
  padding-top: 20px;
  width: 690px;
}
.right-detail .subtitle {
  color: #e4393c;
}
.right-detail .price {
  margin-bottom: 38px;
  background-color: #f3f3f3;
  padding-left: 10px;
}
.price > div {
  line-height: 40px;
  height: 40px;
  font-size: 14px;
  color: #666;
}
.pro-price span {
  font-size: 24px;
  color: #e4393c;
}
.spec {
  margin-bottom: 26px;
  padding-left: 10px;
  font-size: 14px;
  color: #666;
}
.spec > div {
  margin-top: -26px;
  margin-left: 75px;
}
.spec > div > a {
  margin: 0 7px 8px 0;
  padding: 0 10px;
  display: inline-block;
  height: 38px;
  line-height: 38px;
  text-decoration: none;
  color: #666;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
}
.spec > div > a.selected {
  border-color: #00c3f5;
}
.account-chose {
  margin-bottom: 36px;
  padding-left: 10px;
  font-size: 14px;
  color: #666;
}
.buy-action .store-buy {
  margin-right: 20px;
  display: inline-block;
  padding: 10px 30px;
  line-height: 1.33333;
  border-radius: 3px;
  font-size: 14px;
  width: 138px;
  text-align: center;
  color: #fff;
  background-color: #f66567;
  cursor: pointer;
}
.buy-action .store-buy:hover {
  color: #fff;
  background-color: #fe7476;
}
.buy-action .store-buy:active {
  outline: 0;
  background-image: none;
  box-shadow: inset 0 3px 5px rgba(0,0,0,.125);
}
.buy-action .store-cart {
  display: inline-block;
  padding: 10px 30px;
  line-height: 1.33333;
  border-radius: 3px;
  font-size: 14px;
  width: 138px;
  text-align: center;
  color: #fff;
  background-color: #00c3f5;
  cursor: pointer;
}
.buy-action .store-cart:hover {
  color: #fff;
  background-color: #4dcff6;
}
.buy-action .store-cart:active {
  outline: 0;
  background-image: none;
  box-shadow: inset 0 3px 5px rgba(0,0,0,.125);
}
.item-info {
  margin-top: 80px;
}
.item-info .tab-lf {
  display: inline-block;
  width: 600px;
}
.item-info .tab {
  position: sticky;
  top: 0;
  background-color: #fff;
  border-bottom: 1px solid #dcdcdc;
  z-index: 998;
}
.item-info .tab-lf .cat span {
  display: inline-block;
  padding: 0 20px;
  line-height: 59px;
  font-size: 16px;
  color: #333;
  text-decoration: none;
  transition: color .3s;
  cursor: pointer;
}
.item-info .tab-lf .cat span:hover {
  color: #00c3f5;
}
.item-info .tab-lf .cat span.selected {
  color: #00c3f5;
  border-bottom: 2px solid #00c3f5;
  margin-bottom: -1px;
}
.item-info .cart-rt {
  position: absolute;
  right: 0;
  top: 0;
  display: inline-block;
  width: 636px;
}
.item-info .cart-rt > div {
  padding: 7px;
  display: inline-block;
  width: 480px;
  text-align: right;
}
.item-info .cart-rt > div .brief-introduction {
  height: 24px;
  line-height: 24px;
}
.item-info .cart-rt > div .brief-introduction .name {
  margin-right: 10px;
  font-size: 16px;
  color: #333;
}
.item-info .cart-rt > div .brief-introduction .price {
  color: #e4393c;
  font-size: 16px;
  font-weight: bold;
}
.item-info .cart-rt > div .spec {
  height: 22px;
  line-height: 22px;
  margin-bottom: 0;
  padding-left: 0;
  color: #777;
  font-size: 14px;
}
.item-info .cart-rt button {
  position: absolute;
  right: 10px;
  top: 11px;
  display: inline-block;
  outline: none;
  padding: 10px 20px;
  line-height: 1.33333;
  border-radius: 3px;
  font-size: 14px;
  width: 138px;
  text-align: center;
  color: #fff;
  background-color: #00c3f5;
  cursor: pointer;
  border: none;
}
.item-info .cart-rt button:hover {
  color: #fff;
  background-color: #4dcff6;
}
.item-info .cart-rt button:active {
  outline: 0;
  background-image: none;
  box-shadow: inset 0 3px 5px rgba(0,0,0,.125);
}
.item-info .left {
  width: 940px;
}
.item-info .left .details .title {
  text-align: left;
  font-size: 16px;
  margin: 35px 0;
}
.item-info .left .details .title img {
  position: relative;
  top: 6px;
  left: 6px;
  width: 24px;
  height: 24px;
}
.item-info .left .details .param .content {
  margin: 0;
  padding: 0;
}
.item-info .left .details .param .content li {
  float: left;
  width: 235px;
  margin-bottom: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 10px;
  color: #777;
}
.item-info .left .details .product_introduction {
  text-align: center;
}
.item-info .left .details .sale_protection .title {
  padding-left: 10px;
  background-color: #dcdcdc;
  color: #333;
  height: 50px;
  line-height: 50px;
}
.item-info .left .details .sale_protection dt {
  margin: 0 20px;
  color: #e50100;
  font-size: 16px;
  font-weight: bold;
  height: 32px;
  line-height: 32px;
}
.item-info .left .details .sale_protection dt img {
  margin-right: 10px;
  position: relative;
  top: -2px;
  vertical-align: middle;
  height: 32px;
  width: 32px;
}
.item-info .left .details .sale_protection dd {
  margin: 5px 20px 40px 72px;
  color: #666;
}
</style>
