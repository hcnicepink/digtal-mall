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
            <img :src="src === '' ? 'http://localhost:3000/images/avatar/user.png' : src">
            <input v-show="false" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="uploadAvatar($event)">
          </label>
        </div>
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
      src: 'http://localhost:3000/images/avatar/user.png',
      file: {}
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
        this.src = res.result
      })
    }
  }
}
</script>
<style scoped>
.personal {
  margin-top: 50px;
}
.personal span.title {
  font-size: 16px;
  color: #666;
}
.personal .avatar {
  position: relative;
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
  top: 15px;
  height: 70px;
  width: 70px;
  cursor: pointer;
}
.personal .avatar label.upload-avatar img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
