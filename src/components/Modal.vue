<template>
  <transition :name="typeof transition === 'undefined' ? '' : 'fade'">
    <div
      class="modal"
      v-show="show">
      <div class="modal-mask" @click="close"></div>
      <transition :name="transition">
        <div v-show="show" class="modal-body" :style="{ width: width + 'px' }">
          <slot name="header"></slot>
          <slot name="main"></slot>
          <slot name="footer"></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
export default {
  props: ['show', 'width', 'transition'],
  data () {
    return {
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  height: 100%;
  background-color: rgba(55, 55, 55, .6);
}
.modal-body {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 400px;
  background-color: #fff;
  z-index: 1000;
  border-radius: 2px;
}
.fade-enter-active, .fade-leave-active {
  transition: all .2s;
}
.fadeup-enter-active, .fadeup-leave-active {
  transition: all .5s;
}
.fadeup-enter, .fadeup-leave-to {
  opacity: 0;
  transform: translateY(-40%) translateX(-50%);
}
.fadedown-enter-active, .fadedown-leave-active {
  transition: all .2s;
}
.fadedown-enter, .fadedown-leave-to {
  opacity: 0;
  transform: translateY(-60%) translateX(-50%);
}
</style>
