<template>
  <div>
    <nav-header></nav-header>
    <carousel
      :resource="carouselResource"
      :height="480"
      :interval="4000"></carousel>
    <div class="container">
      <h1>热品推荐</h1>
      <ul class="hot-list">
        <li v-for="(elem, index) in hotGoodsList" class="hot-list-item" :key="index">
          <img :src="elem.image" alt="">
          <p>{{ elem.name }}</p>
          <p style="color: #e02b41;">{{ '￥' + elem.price }}</p>
        </li>
      </ul>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import Carousel from '@/components/Carousel'
import NavFooter from '@/components/NavFooter'
import axios from 'axios'
export default {
  components: {
    NavHeader,
    Carousel,
    NavFooter
  },
  mounted () {
    axios.get('/goods/hot', {}).then(response => {
      let res = response.data
      if (res.status === '0') {
        this.hotGoodsList = res.result
      }
    })
  },
  data () {
    return {
      carouselResource: [
        'https://openfile.meizu.com/group1/M00/03/A4/Cgbj0Fq9nl6AQ-fzAAFEinMxkCA226.jpg',
        'https://openfile.meizu.com/group1/M00/04/50/Cgbj0Vrm1XKAQKv5AAIyvLNPIyk516.jpg',
        'https://openfile.meizu.com/group1/M00/04/43/Cgbj0FrpKp-AWDFSAAJ3oJttGL8631.jpg',
        'https://openfile.meizu.com/group1/M00/04/22/Cgbj0FrgU6eAUCLwAAIOyCb_-l4769.jpg'
      ],
      hotGoodsList: []
    }
  },
  methods: {

  }
}
</script>
<style scoped>
.hot-list {
  margin: 0;
  padding: 0;
}
.hot-list-item {
  position: relative;
  display: inline-block;
  margin: 0 -1px 0 0;
  text-align: center;
  width: 248px;
  border: 1px solid #eee;
  z-index: 1;
}
.hot-list-item:hover {
  border-color: #bbb;
  z-index: 2;
}
</style>
