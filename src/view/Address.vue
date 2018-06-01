<template>
  <div class="address">
    <nav-header></nav-header>
    <div class="container">
      <breadcrumb :data="breadcrumb"></breadcrumb>
      <div class="add-address">
        <h1 class="title">新增收货地址<span>（您目前已有地址<i>2</i>个，最多还可以增加<i>8</i>个）</span></h1>
        <div class="row">
          <span>收货人姓名</span><input v-model="name" placeholder="长度不超过15个字" type="text">
          <span>收货人手机号</span><input v-model="phone" placeholder="请输入11位手机号" type="text">
        </div>
        <div class="row">
          <span>收货人地址</span><select v-model="province">
            <option disabled value="">省/直辖市</option>
            <option v-for="(elem, key) in areaData[86]" :key="key" :value="key">{{ elem }}</option>
          </select>
          <select v-model="city">
            <option disabled value="">城市</option>
            <option v-for="(elem, key) in areaData[province]" :key="key" :value="key">{{ elem }}</option>
          </select>
          <select v-model="county">
            <option disabled value="">区/县</option>
            <option v-for="(elem, key) in areaData[city]" :key="key" :value="key">{{ elem }}</option>
          </select>
        </div>
        <div class="row">
          <span>详细地址</span><input v-model="detailAddress" placeholder="请输入不少于4不超过150个字的详细地址，例如：路名，门牌号" type="text">
        </div>
        <div @click="addAddress" class="button">保存</div>
        <label class="set-default"><input v-model="isDefault" type="checkbox">&nbsp;设为默认</label>
      </div>
      <div class="already-address">
        <h1 class="title">已有地址</h1>
        <table>
          <thead>
            <tr>
              <th>收货人姓名</th>
              <th>收货人地址</th>
              <th>收货人手机号</th>
              <th>操作</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(elem, index) in addressList" :key="index">
              <td>{{ elem.receiver }}</td>
              <td>{{ `${areaData[86][elem.province]}${areaData[elem.province][elem.city]}${areaData[elem.city][elem.county]}${elem.address}` }}</td>
              <td>{{ elem.cellphone }}</td>
              <td><a class="edit" href="javascript:;" @click="editAddress(elem)">修改</a><a class="delete" href="javascript:;" @click="deleteAddress(index)">删除</a></td>
              <td v-if="elem.is_default === true" class="default"> √ 默认地址</td>
              <td v-else class="set-default"><span @click="setDefault(index)">设为默认</span></td>
            </tr>
          </tbody>
        </table>
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
import { pcaa } from 'area-data'
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
            content: '地址管理',
            href: '/address'
          }
        ])
      }
    })
  },
  computed: {
    breadcrumb () {
      return this.$store.state.breadcrumb
    },
    addressList () {
      return this.$store.state.addressList
    }
  },
  data () {
    return {
      areaData: pcaa,
      name: '',
      phone: '',
      province: '',
      city: '',
      county: '',
      detailAddress: '',
      isDefault: false
    }
  },
  methods: {
    addAddress () {
      axios.post('/user/addAddress', {
        name: this.name,
        phone: this.phone,
        province: this.province,
        city: this.city,
        county: this.county,
        detailAddress: this.detailAddress,
        isDefault: this.isDefault
      }).then(response => {
        let res = response.data
        if (res.code === 200) {
          this.$store.commit('updateAddressList', res.result)
          this.name = ''
          this.phone = ''
          this.province = ''
          this.city = ''
          this.county = ''
          this.detailAddress = ''
          this.isDefault = ''
        }
        alert(res.msg)
      })
    },
    deleteAddress (index) {
      axios.post('/user/deleteAddress', {
        index: index
      }).then(response => {
        let res = response.data
        this.$store.commit('updateAddressList', res.result)
      })
    },
    setDefault (index) {
      axios.post('/user/setAddressDefault', {
        index: index
      }).then(response => {
        let res = response.data
        this.$store.commit('updateAddressList', res.result)
      })
    },
    editAddress (elem) {
      this.name = elem.receiver
      this.phone = elem.cellphone
      this.province = elem.province
      this.city = elem.city
      this.county = elem.county
      this.detailAddress = elem.address
      this.isDefault = elem.is_default
    }
  }
}
</script>
<style scoped>
.add-address {
  padding: 10px 0 10px 20px;
}
.add-address h1.title {
  margin-bottom: 30px;
  color: #666;
}
.add-address h1.title span {
  font-size: 14px;
  font-weight: normal;
  color: #797979;
}
.add-address h1.title span i {
  color: #00c3f5;
  font-style: normal;
  font-weight: bold;
}
.add-address .row {
  margin-bottom: 25px;
  height: 37px;
  line-height: 37px;
  font-size: 14px;
  color: #666;
}
.add-address .row:nth-of-type(1) input {
  margin-right: 30px;
  padding-left: 8px;
  height: 37px;
  width: 350px;
}
.add-address .row:nth-of-type(2) select {
  margin-right: 30px;
  padding-left: 8px;
  height: 37px;
  width: 259px;
}
.add-address .row:nth-of-type(3) input {
  margin-right: 30px;
  padding-left: 8px;
  height: 37px;
  width: 845px;
}
.add-address .row span {
  display: inline-block;
  width: 100px;
  margin-right: 10px;
}
.add-address .button {
  display: inline-block;
  margin: 10px 0 0 110px;
  padding: 10px 20px;
  line-height: 1.3333;
  border-radius: 3px;
  font-size: 14px;
  width: 118px;
  text-align: center;
  color: #fff;
  background-color: #00c3f5;
  cursor: pointer;
}
.add-address .button:hover {
  color: #fff;
  background-color: #4dcff6;
}
.add-address .button:active {
  outline: 0;
  background-image: none;
  box-shadow: inset 0 3px 5px rgba(0,0,0,.125);
}
.add-address .set-default {
  margin-left: 20px;
  display: inline-block;
  font-size: 14px;
  line-height: 40px;
  height: 40px;
  cursor: pointer;
}
.add-address .set-default input {
  position: relative;
  top: 1px;
}
input::-webkit-input-placeholder{
    color:#ddd;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#ddd;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#ddd;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:#ddd;
}
.already-address {
  padding: 30px 0 10px 20px;
}
.already-address h1.title {
  margin-bottom: 30px;
  color: #666;
}
.already-address table {
  width: 100%;
  font-size: 14px;
  color: #666;
  text-align: center;
}
.already-address table thead {
  background-color: #fafafa;
  height: 50px;
  line-height: 50px;
}
.already-address table thead tr th {
  font-weight: normal;
}
.already-address table tbody tr {
  height: 50px;
  line-height: 50px;
}
.already-address table tbody tr:hover {
  background-color: #fdfdfd;
  border: 1px solid #4dcff6;
}
.already-address table tbody tr a {
  font-size: 12px;
  text-decoration: none;
}
.already-address table tbody tr .edit {
  margin-right: 8px;
  color: #666;
}
.already-address table tbody tr .edit:hover {
  color: #00c3f5
}
.already-address table tbody tr .delete {
  color: #c6c6c6;
}
.already-address table tbody tr .default {
  color: #00c3f5;
  font-weight: bold;
}
.already-address table tbody tr .set-default span {
  visibility: hidden;
  padding: 0 5px;
  display: inline-block;
  background-color: #00c3f5;
  color: #fff;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  border-radius: 3px;
  cursor: pointer;
}
.already-address table tbody tr:hover .set-default span {
  visibility: visible;
}
/* 表格宽度 */
.already-address table td:nth-child(1) {
  width: 15%;
}
.already-address table td:nth-child(2) {
  width: 40%;
}
.already-address table td:nth-child(3) {
  width: 15%;
}
.already-address table td:nth-child(4) {
  width: 15%;
}
.already-address table td:nth-child(5) {
  width: 15%;
}
</style>
