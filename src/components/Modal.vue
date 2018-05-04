<template>
  <div class="modal">
    <div class="modal-mask"></div>
    <div class="modal-body"></div>
  </div>
</template>
<script>
export default {

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
  height: 500px;
  background-color: #fff;
  z-index: 1000;
}
</style>
