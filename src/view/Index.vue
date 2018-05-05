<template>
  <div>
    <nav-header></nav-header>
    <carousel
      :resource="carouselResource"
      :height="480"
      :interval="4000"></carousel>
    <div class="container">
      <h1>热品推荐</h1>
    </div>
  </div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import Carousel from '@/components/Carousel'
export default {
  components: {
    NavHeader,
    Carousel
  },
  data () {
    return {
      carouselResource: [
        'https://openfile.meizu.com/group1/M00/03/A4/Cgbj0Fq9nl6AQ-fzAAFEinMxkCA226.jpg',
        'https://openfile.meizu.com/group1/M00/04/50/Cgbj0Vrm1XKAQKv5AAIyvLNPIyk516.jpg',
        'https://openfile.meizu.com/group1/M00/04/43/Cgbj0FrpKp-AWDFSAAJ3oJttGL8631.jpg',
        'https://openfile.meizu.com/group1/M00/04/22/Cgbj0FrgU6eAUCLwAAIOyCb_-l4769.jpg'
      ]
    }
  }
}
</script>
