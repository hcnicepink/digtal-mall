<template>
  <div class="member">
    <nav-header></nav-header>
    <div class="container">
      <breadcrumb :data="breadcrumb"></breadcrumb>
      <div class="personal">
        <div class="avatar">
          <span class="title">
            头像
          </span>
          <label class="upload-avatar">
            <img :src="userInfo.avatar === '' ? 'http://localhost:3000/images/avatar/user.png' : userInfo.avatar">
            <input v-show="false" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="uploadAvatar($event)">
          </label>
        </div>
        <div class="input"><span class="title">电话</span><input v-model="userInfo.phone" type="text" placeholder="请输入电话"></div>
        <div class="input"><span class="title">昵称</span><input type="text" v-model="userInfo.nickname" placeholder="请输入昵称"></div>
        <div class="input"><span class="title">性别</span><label><input value="1" type="radio" v-model="userInfo.gender">&emsp;男</label><label><input type="radio" value="2" v-model="userInfo.gender">&emsp;女</label></div>
        <div class="input"><span class="title">密码</span><input type="password" placeholder="旧密码"><input type="password" placeholder="新密码"></div>
        <div class="button">保存</div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import Breadcrumb from '@/components/Breadcrumb'
import axios from 'axios'
export default {
  components: {
    NavHeader,
    NavFooter,
    Breadcrumb
  },
  mounted () {
    axios.get('/user/checkLogin').then(response => {
      let res = response.data
      if (res.code === 201) {
        alert('请登录后重试')
        this.$router.push('/')
      } else {
        this.userInfo = res.result.userInfo
        this.$store.commit('updateBreadcrumb', [
          {
            content: '个人信息',
            href: '/member'
          }
        ])
      }
    })
  },
  data () {
    return {
      src: '',
      file: {},
      userInfo: {}
    }
  },
  computed: {
    breadcrumb () {
      return this.$store.state.breadcrumb
    }
  },
  methods: {
    uploadAvatar (event) {
      this.file = event.target.files[0]
      let formData = new FormData()
      formData.append(`${this.$store.state.userEmail},${Date.now()}.${this.file.name.substring(this.file.name.lastIndexOf('.') + 1)}`, this.file)
      console.log(this.file)
      axios.post('/user/uploadAvatar', formData, {
        'Content-Type': 'multipart/form-data'
      }).then(response => {
        let res = response.data
        this.userInfo.avatar = res.result
      })
    }
  }
}
</script>
<style scoped>
.personal {
  margin: 50px 0;
}
.personal span.title {
  font-size: 16px;
  color: #666;
}
.personal .avatar {
  position: relative;
  margin-bottom: 10px;
  padding-left: 50px;
  height: 100px;
  line-height: 100px;
}
.personal .avatar span.title {
  display: inline-block;
  height: 100px;
  line-height: 100px;
}
.personal .avatar label.upload-avatar {
  position: absolute;
  display: inline-block;
  left: 150px;
  top: 10px;
  height: 82px;
  width: 82px;
  border: 1px dotted #ddd;
  cursor: pointer;
}
.personal .avatar label.upload-avatar img {
  width: 100%;
  height: 100%;
}
.personal .input {
  padding-left: 50px;
  height: 80px;
  line-height: 80px;
}
.personal .input label {
  display: inline-block;
  padding-left: 10px;
  margin-right: 70px;
  width: 70px;
  font-size: 14px;
  height: 80px;
  line-height: 80px;
  cursor: pointer;
}
.personal .input span.title {
  display: inline-block;
  margin-right: 70px;
}
.personal .input input[type="text"],
.personal .input input[type="password"] {
  display: inline-block;
  padding-left: 10px;
  margin-right: 20px;
  height: 48px;
  width: 352px;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid #ddd;
}
.personal .input input[type="text"]:focus,
.personal .input input[type="password"]:focus {
  outline: none;
  border-bottom: 1px solid #999;
}
.personal .button {
  margin: 30px 0 0 150px;
  display: inline-block;
  padding: 10px 30px;
  line-height: 1.33333;
  border-radius: 3px;
  font-size: 14px;
  width: 138px;
  text-align: center;
  color: #fff;
  background-color: #00c3f5;
  cursor: pointer;
}
.personal .button:hover {
  color: #fff;
  background-color: #4dcff6;
}
.personal .button:active {
  outline: 0;
  background-image: none;
  box-shadow: inset 0 3px 5px rgba(0,0,0,.125);
}
</style>
