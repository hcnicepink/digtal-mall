<template>
  <nav class="header">
    <div class="container clearfix">
      <!-- logo -->
      <router-link :to="'/'" class="nav-logo">
        <img src="../assets/logo.png" alt="">
      </router-link>
      <!-- logo -->
      <!-- 导航列表 -->
      <ul class="nav-list">
        <li class="nav-list-item"><router-link to="/list?categoryid=all" class="nav-a">全部商品</router-link></li>
        <li
          class="nav-list-item"
          v-for="(elem, index) in category"
          :key="index">
          <router-link
            :to="`/list?categoryid=${elem._id}`"
            class="nav-a">{{ elem.name }}
          </router-link>
        </li>
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
                @click="logout">退出</a>
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
        showUsernameErrorMsgRegister = false
        showPasswordErrorMsgRegister = false
      }"
      transition="fadeup"
      :width="432">
      <div class="login-header" slot="header">
        <img src="../assets/logo.png" alt="">
        <p v-if="isLogin">登录潮数码，你想要的都在这里</p>
        <p v-else>注册潮数码，你想要的都在这里</p>
      </div>
      <!-- 登录 -->
      <div v-show="isLogin" class="login-main" slot="main">
        <div class="login-input">
          <input ref="username" @focus="showUsernameErrorMsg = false" autofocus @blur="validateUsername" v-model="username" placeholder="用户名 (邮箱)" type="text">
          <div
            ref="usernameError"
            v-show="showUsernameErrorMsg"
            @click="usernameInput"
            :style="{
              'background-color': usernameErrorMsg === '' || usernameValidateError ? 'transparent': '#fff',
              'text-align': usernameValidateError ? 'right': 'left'}"
            class="login-error">{{ usernameErrorMsg }}</div>
        </div>
        <div class="login-input">
          <input ref="password" @focus="showPasswordErrorMsg = false" @blur="validatePassword" v-model="password" placeholder="密码" type="password" @keyup.enter="login">
          <div
            ref="passwordError"
            v-show="showPasswordErrorMsg"
            @click="passwordInput"
            :style="{
              'background-color': passwordErrorMsg === '' || passwordValidateError ? 'transparent': '#fff',
              'text-align': passwordValidateError ? 'right': 'left'}"
            class="login-error">{{ passwordErrorMsg }}</div>
        </div>
        <button class="login-button" @click="login">登录</button>
      </div>
      <!-- 注册 -->
      <div v-show="!isLogin" class="login-main" slot="main">
        <div class="login-input">
          <input ref="usernameRegister" @focus="showUsernameErrorMsgRegister = false" @blur="validateUsernameRegister" v-model="usernameRegister" placeholder="用户名 (邮箱)" type="text">
          <div
            ref="usernameErrorRegister"
            v-show="showUsernameErrorMsgRegister"
            @click="usernameInputRegister"
            :style="{
              'background-color': usernameErrorMsgRegister === '' || usernameValidateErrorRegister ? 'transparent': '#fff',
              'text-align': usernameValidateErrorRegister ? 'right': 'left'}"
            class="login-error">{{ usernameErrorMsgRegister }}</div>
        </div>
        <div class="login-input">
          <input ref="passwordRegister" @focus="showPasswordErrorMsgRegister = false" @blur="validatePasswordRegister" v-model="passwordRegister" placeholder="密码 (字母开头, 6~18位, 只包含数字、字母、下划线)" type="password" @keyup.enter="register">
          <div
            ref="passwordErrorRegister"
            v-show="showPasswordErrorMsgRegister"
            @click="passwordInputRegister"
            :style="{
              'background-color': passwordErrorMsgRegister === '' || passwordValidateErrorRegister ? 'transparent': '#fff',
              'text-align': passwordValidateErrorRegister ? 'right': 'left'}"
            class="login-error">{{ passwordErrorMsgRegister }}</div>
        </div>
        <button class="login-button" @click="register">注册</button>
        <p>注册即代表同意<a href="#">《商城协议》</a></p>
      </div>
      <div class="login-footer" slot="footer">
        <p v-if="!isLogin">已有账号？<a href="javascript:void(0)" @click="() => {isLogin = !isLogin; clear()}">登录</a></p>
        <p v-else>没有账号？<a href="javascript:void(0)" @click="isLogin = !isLogin; clear()">注册</a></p>
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
  mounted () {
    axios.get('/category').then(response => {
      let res = response.data
      if (res.code === 200) {
        this.$store.commit('updateCategory', res.result)
      }
    })
  },
  data () {
    return {
      username: '',
      password: '',
      usernameRegister: '',
      passwordRegister: '',
      loginModalShow: false,
      isLogin: true,
      usernameErrorMsg: '',
      passwordErrorMsg: '',
      showUsernameErrorMsg: true,
      showPasswordErrorMsg: true,
      usernameValidateError: false,
      passwordValidateError: false,
      usernameErrorMsgRegister: '',
      passwordErrorMsgRegister: '',
      showUsernameErrorMsgRegister: true,
      showPasswordErrorMsgRegister: true,
      usernameValidateErrorRegister: false,
      passwordValidateErrorRegister: false
    }
  },
  computed: {
    isOnline () {
      return this.$store.state.userEmail !== ''
    },
    category () {
      return this.$store.state.category
    }
  },
  methods: {
    clear () {
      this.username = ''
      this.password = ''
      this.usernameRegister = ''
      this.passwordRegister = ''
      this.usernameErrorMsg = ''
      this.passwordErrorMsg = ''
      this.showUsernameErrorMsg = true
      this.showPasswordErrorMsg = true
      this.usernameValidateError = false
      this.passwordValidateError = false
      this.usernameErrorMsgRegister = ''
      this.passwordErrorMsgRegister = ''
      this.showUsernameErrorMsgRegister = true
      this.showPasswordErrorMsgRegister = true
      this.usernameValidateErrorRegister = false
      this.passwordValidateErrorRegister = false
    },
    login () {
      if (this.validateUsername() && this.validatePassword()) {
        axios.post('/user/login', {
          username: this.username,
          password: this.password
        }).then(response => {
          let res = response.data
          if (res.code === 200) {
            this.$store.commit('updateUserEmail', res.result.email)
            this.loginModalShow = false
            this.username = ''
            this.password = ''
          } else if (res.code === 201) {
            this.showPasswordErrorMsg = true
            this.passwordValidateError = true
            this.passwordErrorMsg = res.msg
          }
        })
      }
    },
    register () {
      if (this.validateUsernameRegister() && this.validatePasswordRegister()) {
        axios.post('/user/register', {
          username: this.usernameRegister,
          password: this.passwordRegister
        }).then(response => {
          let res = response.data
          if (res.code === 200) {
            this.isLogin = true
            this.usernameRegister = ''
            this.passwordRegister = ''
            this.clear()
            alert(res.msg)
          } else if (res.code === 201) {
            this.showUsernameErrorMsgRegister = true
            this.usernameValidateErrorRegister = true
            this.usernameErrorMsgRegister = res.msg
          } else if (res.code === 202) {
            this.showPasswordErrorMsgRegister = true
            this.passwordValidateErrorRegister = true
            this.passwordErrorMsgRegister = res.msg
          }
        })
      }
    },
    logout () {
      axios.get('/user/logout').then(response => {
        let res = response.data
        if (res.code === 200) {
          this.$store.commit('updateUserEmail', '')
          alert('退出成功')
        }
      })
    },
    usernameInput (event) {
      this.showUsernameErrorMsg = false
      this.$refs.username.focus()
    },
    usernameInputRegister (event) {
      this.showUsernameErrorMsgRegister = false
      this.$refs.usernameRegister.focus()
    },
    validateUsername () {
      if (this.username === '') {
        this.showUsernameErrorMsg = true
        this.usernameValidateError = false
        this.usernameErrorMsg = '请输入邮箱'
        return false
      } else if (!(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.username))) {
        // 判断是否为正确的邮箱
        this.showUsernameErrorMsg = true
        this.usernameValidateError = true
        this.usernameErrorMsg = '请输入正确的邮箱'
        return false
      } else {
        this.showUsernameErrorMsg = false
        return true
      }
    },
    validateUsernameRegister () {
      if (this.usernameRegister === '') {
        this.showUsernameErrorMsgRegister = true
        this.usernameValidateErrorRegister = false
        this.usernameErrorMsgRegister = '请输入邮箱'
        return false
      } else if (!(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.usernameRegister))) {
        // 判断是否为正确的邮箱
        this.showUsernameErrorMsgRegister = true
        this.usernameValidateErrorRegister = true
        this.usernameErrorMsgRegister = '请输入正确的邮箱'
        return false
      } else {
        this.showUsernameErrorMsgRegister = false
        return true
      }
    },
    passwordInput () {
      this.showPasswordErrorMsg = false
      this.$refs.password.focus()
    },
    passwordInputRegister () {
      this.showPasswordErrorMsgRegister = false
      this.$refs.passwordRegister.focus()
    },
    validatePassword () {
      if (this.password === '') {
        this.showPasswordErrorMsg = true
        this.passwordValidateError = false
        this.passwordErrorMsg = '请输入密码'
        return false
      } else {
        this.showUsernameErrorMsg = false
        return true
      }
    },
    validatePasswordRegister () {
      if (this.passwordRegister === '') {
        this.showPasswordErrorMsgRegister = true
        this.passwordValidateErrorRegister = false
        this.passwordErrorMsgRegister = '请输入密码'
        return false
      } else if (!(/\w{5,17}$/.test(this.passwordRegister))) {
        this.showPasswordErrorMsgRegister = true
        this.passwordValidateErrorRegister = true
        this.passwordErrorMsgRegister = '请输入符合格式的密码'
        return false
      } else {
        this.showUsernameErrorMsgRegister = false
        return true
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
  border-bottom: 1px solid #efefef;
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
.login-main > p {
  margin: 36px 0;
  text-align: center;
  height: 2rem;
  line-height: 2rem;
  font-size: 1.4rem;
  color: #555;
}
.login-main > p > a {
  color: #175199;
  text-decoration: none;
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
.login-input .login-validate-error {
  text-align: right;
  background-color: transparent !important;
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
