<template>
  <div>
    <nav-header></nav-header>
    <div class="main">
      <div class="container">
        <breadcrumb :data="breadcrumb"></breadcrumb>
        <div class="goods-list">
          <ul class="goods-list-wrap clearfix">
            <li v-for="(elem, index) in goodsList" class="gl-item" :key="index">
              <a href="#">
                <div class="gl-item-wrap">
                  <img :src="elem.pic[0].md" alt="">
                  <p class="price">{{ '￥' + elem.price }}</p>
                  <p class="title">{{ elem.title }}</p>
                </div>
              </a>
            </li>
          </ul>
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
    axios.get('/list/all').then(response => {
      let res = response.data
      if (res.code === 200) {
        this.goodsList = res.result
      }
    })
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
      ],
      goodsList: []
    }
  }
}
</script>
<style scoped>
.main {
  background-color: #f8f8f8;
}
.goods-list-wrap {
  margin: 0;
  padding: 0;
  height: auto;
}
.goods-list-wrap a {
  text-decoration: none;
}
.gl-item {
  float: left;
  margin: 0 12px 12px 0;
  width: 298px;
  list-style-type: none;
  background-color: #fff;
  transition: transform .2s linear;
}
.gl-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}
.gl-item-wrap {
  padding: 20px 30px 0;
}
.gl-item-wrap img {
  display: block;
  margin: 20px auto;
  width: 200px;
  height: 200px;
}
.gl-item-wrap .price {
  color: #e02b41;
  font-size: 20px;
}
.gl-item-wrap .title {
  color: #666;
  font-size: 14px;
  height: 38px;
  overflow: hidden;
}
.gl-item-wrap .title:hover {
  color: #e02b41;
}
</style>
