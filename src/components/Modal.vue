<template>
  <div
    class="modal"
    v-show="show">
    <div class="modal-mask" @click="close"></div>
    <div class="modal-body" :style="{ width: width + 'px' }">
      <slot name="header"></slot>
      <slot name="main"></slot>
      <slot name="footer">

      </slot>
    </div>
  </div>
</template>
<script>
export default {
  props: ['show', 'width'],
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
</style>
