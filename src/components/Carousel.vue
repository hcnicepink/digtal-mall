<template>
<div class="container-flow">
  <div class="container">
    <div
      class="carousel"
      :style="{ height: height + 'px' }">
      <transition name="fade">
        <a
          v-for="(elem, index) in resource"
          v-if="index === showIndex"
          :href="elem.href"
          :key="index"
          target="_blank">
          <img
            class="carousel-img"
            :src="elem.img"
            :alt="index">
        </a>
      </transition>
      <div class="carousel-arrow carousel-prev" @click="editIndex(-1)"><img src="../assets/left.png" alt=""></div>
      <div class="carousel-arrow carousel-next" @click="editIndex(1)"><img src="../assets/right.png" alt=""></div>
      <ul class="carousel-dots">
        <li
        class="carousel-dot"
        :class="{ 'carousel-dot-selected': index === showIndex }"
        v-for="(elem, index) in resource"
        :key="index"
        @mouseover="editIndex(0 ,index)"
        ></li>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: ['resource', 'height', 'interval'],
  mounted () {
    setInterval(() => {
      this.editIndex(1)
    }, this.interval)
  },
  data () {
    return {
      showIndex: 0
    }
  },
  methods: {
    editIndex (num, index = -1) {
      if (index !== -1) {
        this.showIndex = index
        return
      }
      if (this.showIndex === this.resource.length - 1 && num > 0) {
        this.showIndex = 0
        return
      }
      if (this.showIndex === 0 && num < 0) {
        this.showIndex = this.resource.length - 1
        return
      }
      this.showIndex += num
    }
  }
}
</script>
<style scoped>
.container-flow {
  overflow: hidden;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0.5;
}
.carousel {
  position: relative;
  width: 100%;
  overflow: visible;
}
.carousel-img {
  position: absolute;
  left: -340px;
}
.carousel-arrow {
  display: block;
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 60px;
  margin-top: -30px;
  outline: 0;
  border: none;
  cursor: pointer;
  background-color: transparent;
  transition: all 0.5s;
  text-align: center;
  line-height: 60px;
}
.carousel:hover .carousel-arrow {
  background-color: #000;
  opacity: 0.5;
}
.carousel-arrow img {
  vertical-align: middle;
  width: 18px;
  height: 18px;
}
.carousel-prev {
  margin-left: -500px;
}
.carousel-next {
  margin-left: 500px;
}
.carousel-dots {
  position: absolute;
  left: 50%;
  bottom: 5%;
  width: 1240px;
  margin-left: -620px;
  margin-top: 0;
  margin-bottom: 0;
  text-align: center;
}
.carousel-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin: 0 5px;
  list-style-type: none;
  border-radius: 50%;
  border: 1px solid #bdbdbd;
  cursor: pointer;
}
.carousel-dot-selected {
  background-color: #00c3f5;
  border-color: #00c3f5;
}
</style>
