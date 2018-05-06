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
          <ul v-if="isOnline" class="login-dropdown">
            <li class="login-dropdown-item">
              <a
                href="javascript:void(0)"
                class="nav-a"
                @click="() => {}">我的订单</a>
            </li>
            <li class="login-dropdown-item">
              <a
                href="javascript:void(0)"
                class="nav-a"
                @click="() => {}">退出</a>
              </li>
          </ul>
          <ul v-else class="login-dropdown">
            <li class="login-dropdown-item">
              <a
                href="javascript:void(0)"
                class="nav-a"
                @click="() => {
                  loginModalShow = true
                  isLogin = true
                }">立即登录</a>
            </li>
            <li class="login-dropdown-item">
              <a
                href="javascript:void(0)"
                class="nav-a"
                @click="() => {
                  loginModalShow = true
                  isLogin = false
                }">立即注册</a>
              </li>
          </ul>
        </div>
        <div class="nav-service-item nav-cart">
          <img src="../assets/cart.png" alt="">
        </div>
      </div>
      <!-- 服务列表 -->
    </div>
    <modal
      :show="loginModalShow"
      @close="() => {
        loginModalShow = false
        showUsernameErrorMsg = false
        showPasswordErrorMsg = false
      }"
      :width="432">
      <div class="login-header" slot="header">
        <img src="../assets/logo.png" alt="">
        <p v-if="isLogin">登录潮数码，你想要的都在这里</p>
        <p v-else>注册潮数码，你想要的都在这里</p>
      </div>
      <form class="login-main" slot="main">
        <div class="login-input">
          <input ref="username" @focus="showUsernameErrorMsg = false" @blur="validateUsername" v-model="username" placeholder="用户名(邮箱)" type="text">
          <div ref="usernameError" v-show="showUsernameErrorMsg" @click="usernameInput" class="login-error">{{ usernameErrorMsg }}</div>
        </div>
        <div class="login-input">
          <input ref="password" @focus="showPasswordErrorMsg = false" @blur="validatePassword" v-model="password" placeholder="密码" type="password" @keyup.enter="login">
          <div ref="passwordError" v-show="showPasswordErrorMsg" @click="passwordInput" class="login-error">{{ passwordErrorMsg }}</div>
        </div>
        <button v-if="isLogin" class="login-button" @click="login">登录</button>
        <button v-else class="login-button">注册</button>
      </form>
      <div class="login-footer" slot="footer">
        <p v-if="isLogin">已有账号？<a href="javascript:void(0)" @click="isLogin = !isLogin">登录</a></p>
        <p v-else>没有账号？<a href="javascript:void(0)" @click="isLogin = !isLogin">注册</a></p>
      </div>
    </modal>
  </nav>
</template>
<script>
import Modal from '@/components/Modal'
import axios from 'axios'
export default {
  components: {
    Modal
  },
  data () {
    return {
      username: '',
      password: '',
      loginModalShow: false,
      isLogin: true,
      usernameErrorMsg: '',
      passwordErrorMsg: '',
      showUsernameErrorMsg: true,
      showPasswordErrorMsg: true
    }
  },
  computed: {
    isOnline () {
      return this.$store.state.userId !== ''
    }
  },
  methods: {
    login () {
      axios.post('/user/login', {
        username: this.username,
        password: this.password
      }).then(response => {
        let res = response.data
        if (res.status === '0') {
          this.$store.commit('updateUserId', res.result.id)
        }
        this.loginModalShow = false
        this.username = ''
        this.password = ''
      })
    },
    usernameInput (event) {
      this.showUsernameErrorMsg = false
      this.$refs.username.focus()
    },
    validateUsername () {
      this.$refs.usernameError.style.backgroundColor = '#fff'
      if (this.username === '') {
        this.showUsernameErrorMsg = true
        this.usernameErrorMsg = '请输入邮箱'
      }
    },
    passwordInput () {
      this.showPasswordErrorMsg = false
      this.$refs.password.focus()
      console.log('passwoedInput')
    },
    validatePassword () {
      this.$refs.passwordError.style.backgroundColor = '#fff'
      if (this.username === '') {
        this.showPasswordErrorMsg = true
        this.passwordErrorMsg = '请输入密码'
      }
    }
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
.login-header img {
  display: block;
  width: 150px;
  height: 65px;
  margin: 10px auto;
}
.login-header p {
  margin: 0;
  padding: 0;
  text-align: center;
  height: 2rem;
  line-height: 2rem;
  font-size: 1.6rem;
  color: #0074ff;
}
.login-main {
  font-size: 1.4rem;
}
.login-input {
  position: relative;
  height: 48px;
  line-height: 48px;
  width: 352px;
  margin: 12px auto;
  border-bottom: 1px solid #777;
}
.login-input .login-error {
  position: absolute;
  left: 0;
  top: 0;
  height: 48px;
  line-height: 48px;
  width: 352px;
  color: #f1403c;
  cursor: text;
}
.login-input input {
  display: block;
  height: 48px;
  width: 352px;
  border: none;
}
.login-button {
  display: block;
  margin: 36px auto;
  width: 352px;
  color: #fff;
  background-color: #0084ff;
  height: 36px;
  line-height: 36px;
  border: none;
  border-radius: 4px;
}
.login-input input:focus {
  outline: none;
}
.login-footer {
  height: 60px;
  border-top: 1px solid #ddd;
  background-color: #eee;
}
.login-footer p {
  height: 59px;
  line-height: 59px;
  margin: 0;
  padding: 0;
  font-size: 16px;
  text-align: center;
}
.login-footer p a {
  font-size: 16px;
  color: #175199;
  text-decoration: none;
}
</style>
