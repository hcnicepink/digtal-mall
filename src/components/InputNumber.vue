<template>
  <div class="input-number">
    <button @click="minus" class="minus">-</button>
    <input readonly @input="updateNum()" v-model="counter" type="text" class="number">
    <button @click="plus" class="plus">+</button>
  </div>
</template>
<script>
export default {
  props: {
    num: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      counter: this.num
    }
  },
  methods: {
    plus () {
      this.counter++
      this.updateNum()
    },
    minus () {
      if (this.counter !== 1) {
        this.counter--
        this.updateNum()
      }
    },
    updateNum () {
      this.$emit('updateNum', this.counter)
    }
  }
}
</script>
<style scoped>
.input-number {
  display: inline-block;
}
.input-number button {
  display: inline-block;
  padding: 0;
  margin: 0 5px;
  height: 36px;
  line-height: 36px;
  width: 36px;
  text-align: center;
  border: 1px solid #ddd;
  outline: none;
}
.input-number .number {
  display: inline-block;
  padding: 0;
  margin: 0;
  width: 36px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  border: 1px solid #ddd;
  outline: none;
}
</style>
