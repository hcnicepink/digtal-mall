<template>
  <nav class="header">
    <div class="container clearfix">
      <!-- logo -->
      <a href="#" class="nav-logo">
        <img src="../assets/logo.png" alt="">
      </a>
      <!-- logo -->
      <!-- 导航列表 -->
      <ul class="nav-list">
        <li class="nav-list-item"><router-link to="/goods/all" class="nav-a">全部商品</router-link></li>
        <li class="nav-list-item"><a href="#" class="nav-a">手机通讯</a></li>
        <li class="nav-list-item"><a href="#" class="nav-a">手机配件</a></li>
        <li class="nav-list-item"><a href="#" class="nav-a">摄影摄像</a></li>
        <li class="nav-list-item"><a href="#" class="nav-a">数码配件</a></li>
        <li class="nav-list-item"><a href="#" class="nav-a">影音娱乐</a></li>
        <li class="nav-list-item"><a href="#" class="nav-a">智能设备</a></li>
      </ul>
      <!-- 导航列表 -->
      <!-- 服务列表 -->
      <div class="nav-service">
        <div class="nav-service-item nav-search"><input type="text"></div>
        <div class="nav-service-item nav-login">
          <img src="../assets/user.png" alt="">
          <ul class="login-dropdown">
            <li class="login-dropdown-item"><router-link class="nav-a" to="/login">立即登录</router-link></li>
            <li class="login-dropdown-item"><router-link class="nav-a" to="/register">立即注册</router-link></li>
          </ul>
        </div>
        <div class="nav-service-item nav-cart">
          <img src="../assets/cart.png" alt="">
        </div>
      </div>
      <!-- 服务列表 -->
    </div>
    <!-- <modal></modal> -->
  </nav>
</template>
<script>
import Modal from '@/components/Modal'
export default {
  components: {
    Modal
  }
}
</script>
<style scoped>
.nav-a {
  display: block;
  text-align: center;
  text-decoration: none;
  color: #333;
}
.nav-a:hover {
  background-color: #eee;
  color: #00c3f5;
}
nav.header {
  height: 80px;
  line-height: 80px;
}
nav.header * {
  font-size: 1.4rem;
}
.nav-logo {
  float: left;
  height: 80px;
  text-decoration: none;
  color: #333;
}
.nav-logo img {
  vertical-align: middle;
  width: 150px;
  height: 65px;
}
.nav-list {
  float: left;
  margin: 0;
}
.nav-list-item {
  float: left;
  width: 100px;
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.nav-service {
  float: right;
}
.nav-service-item {
  float: left;
  margin: 0 1.5rem;
}
.nav-login img {
  width: 22px;
  height: 22px;
  vertical-align: middle;
  border: 1px solid #8a8a8a;
  border-radius: 50%;
  cursor: pointer;
}
.nav-login {
  position: relative;
  width: 22px;
}
.login-dropdown {
  margin: 0;
  padding: .5rem 0;
  position: absolute;
  display: none;
  top: 60px;
  left: -39px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100px;
  text-align: center;
  z-index: 2;
}
.login-dropdown::before {
  content: "";
  position: absolute;
  left: 45px;
  top: -10px;
  border-left: 5px solid transparent;
  border-top: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #eee;
}
.login-dropdown-item {
  height: 2rem;
  line-height: 2rem;
  margin: 0;
  list-style-type: none;
}
.nav-login:hover .login-dropdown {
  display: block;
}
.nav-cart img {
  width: 22px;
  height: 22px;
  vertical-align: middle;
  cursor: pointer;
}
</style>
