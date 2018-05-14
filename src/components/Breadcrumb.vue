<template>
  <div class="breadcrumb">
    <router-link :to="'/'">首页</router-link>
    <template v-for="(item, index) in data">
      &nbsp;>&nbsp;
      <span v-if="item.href === '#'" :key="index">{{ item.content }}</span>
      <span v-else-if="index === data.length - 1" :key="index">{{ item.content }}</span>
      <router-link v-else :to="item.href" :key="index">{{ item.content }}</router-link>
    </template>
  </div>
</template>
<script>
export default {
  props: ['data']
}
</script>
<style scoped>
.breadcrumb {
  height: 40px;
  line-height: 40px;
  color: #999;
  font-size: 1.4rem;
}
.breadcrumb > a {
  color: #333;
  text-decoration: none;
}
</style>
