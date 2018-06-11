<template>
  <div class="order">
    <nav-header></nav-header>
    <div class="container">
      <breadcrumb :data="breadcrumb"></breadcrumb>
      <div class="order-address">
        <div class="order-address-title">收货人信息</div>
        <ul class="order-address-list clearfix">
          <li class="order-address-checkbox" @click="checkIndex = index" v-for="(elem, index) in addressList" :key="index" :class="{'check': checkIndex === index}">
            <div class="order-address-checkbox-top">
              <div class="order-address-checkbox-name">{{ elem.receiver }}</div>
              <div class="order-address-checkbox-phone">{{ elem.cellphone }}</div>
            </div>
            <div class="order-address-checkbox-content">{{ `${pcaa[86][elem.province]}${pcaa[elem.province][elem.city]}${pcaa[elem.city][elem.county]}${elem.address}` }}</div>
            <div class="order-address-checkbox-ctrl">
              <div @click="deleteAddress(index)" class="order-address-checkbox-delete"></div>
              <div @click="editAddress(elem)" class="order-address-checkbox-edit"></div>
            </div>
          </li>
          <li class="order-address-checkbox" @click="addModal = true">
            <div class="order-address-addAddress">
              <i></i>
              添加新地址
            </div>
          </li>
        </ul>
      </div>
      <div class="order-product">
        <div class="order-product-title">确认订单信息</div>
        <div class="order-product-list">
          <table>
            <thead>
              <tr>
                <th>商品</th>
                <th>单价(元)</th>
                <th>数量</th>
                <th>小计(元)</th>
                <th>配送方式</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(elem, index) in cartList" v-if="elem.is_check === true" :key="index">
                <td>
                  <a target="_blank" :href="elem.goods.href">
                    <img :src="elem.goods.pic[0].md">
                    <span class="name">{{ elem.goods.name }}</span><span class="spec">{{ elem.goods.spec }}</span>
                  </a>
                </td>
                <td>{{ elem.goods.price | currency('￥') }}</td>
                <td>{{ elem.count }}</td>
                <td>{{ elem.goods.price * elem.count | currency('￥') }}</td>
                <td>快递配送：运费<span>￥0.00</span></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>合计:<span>
                  {{ totalPrice | currency('￥') }}
                  </span></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="order-total clearfix">
        <div class="order-total-pay">
          <div class="order-total-pay-header">选择支付方式</div>
          <div class="order-total-pay-content">
            <div class="order-total-row clearfix">
              <div class="order-total-pay-title">支付宝</div>
              <ul class="order-total-pay-list clearfix">
                <li class="order-total-pay-label alipay" @click="payMode = 'alipay'">
                  <div class="order-total-pay-radio" :class="{'check': payMode === 'alipay'}"></div>
                  <div class="order-total-pay-img"></div>
                </li>
              </ul>
            </div>
            <div class="order-total-row clearfix">
              <div class="order-total-pay-title">微信支付</div>
              <ul class="order-total-pay-list clearfix">
                <li class="order-total-pay-label wechat" @click="payMode = 'wechat'">
                  <div class="order-total-pay-radio" :class="{'check': payMode === 'wechat'}"></div>
                  <div class="order-total-pay-img"></div>
                </li>
              </ul>
            </div>
            <div class="order-total-row clearfix">
              <div class="order-total-pay-title">网上银行</div>
              <ul class="order-total-pay-list clearfix">
                <li class="order-total-pay-label boc" @click="payMode = 'boc'">
                  <div class="order-total-pay-radio" :class="{'check': payMode === 'boc'}"></div>
                  <div class="order-total-pay-img"></div>
                </li>
                <li class="order-total-pay-label ccb" @click="payMode = 'ccb'">
                  <div class="order-total-pay-radio" :class="{'check': payMode === 'ccb'}"></div>
                  <div class="order-total-pay-img"></div>
                </li>
                <li class="order-total-pay-label abc" @click="payMode = 'abc'">
                  <div class="order-total-pay-radio" :class="{'check': payMode === 'abc'}"></div>
                  <div class="order-total-pay-img"></div>
                </li>
                <li class="order-total-pay-label icbc" @click="payMode = 'icbc'">
                  <div class="order-total-pay-radio" :class="{'check': payMode === 'icbc'}"></div>
                  <div class="order-total-pay-img"></div>
                </li>
                <li class="order-total-pay-label comm" @click="payMode = 'comm'">
                  <div class="order-total-pay-radio" :class="{'check': payMode === 'comm'}"></div>
                  <div class="order-total-pay-img"></div>
                </li>
                <li class="order-total-pay-label cmb" @click="payMode = 'cmb'">
                  <div class="order-total-pay-radio" :class="{'check': payMode === 'cmb'}"></div>
                  <div class="order-total-pay-img"></div>
                </li>
                <li class="order-total-pay-label psbc" @click="payMode = 'psbc'">
                  <div class="order-total-pay-radio" :class="{'check': payMode === 'psbc'}"></div>
                  <div class="order-total-pay-img"></div>
                </li>
                <li class="order-total-pay-label cib" @click="payMode = 'cib'">
                  <div class="order-total-pay-radio" :class="{'check': payMode === 'cib'}"></div>
                  <div class="order-total-pay-img"></div>
                </li>
                <li class="order-total-pay-label shbank" @click="payMode = 'shbank'">
                  <div class="order-total-pay-radio" :class="{'check': payMode === 'shbank'}"></div>
                  <div class="order-total-pay-img"></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="order-total-content">
          <div class="order-total-row clearfix">
            总金额<div class="order-total-price">{{ totalPrice | currency('￥') }}</div>
          </div>
          <div class="order-total-row clearfix">
            运费<div class="order-total-price">{{ 0 | currency('￥') }}</div>
          </div>
          <div class="order-total-line"></div>
          <div class="order-total-row clearfix">
            应付<div class="order-total-price total">{{ totalPrice | currency('￥') }}</div>
          </div>
          <div class="order-total-row clearfix">
            <div class="button" @click="orderConfirm">下单并支付</div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
    <modal
      :show="addModal"
      transition="fadeup"
      :width="1000"
      @close="() => {
        this.addModal = false
        this.addAddressData.name = ''
        this.addAddressData.phone = ''
        this.addAddressData.province = ''
        this.addAddressData.city = ''
        this.addAddressData.county = ''
        this.addAddressData.detailAddress = ''
        this.addAddressData.isDefault = false
      }">
      <div class="header" slot="header">
        添加新地址
      </div>
      <div class="main" slot="main">
        <div class="row">
          <span>收货人姓名 <span>*</span></span><input v-model="addAddressData.name" placeholder="长度不超过15个字" type="text">
          <span>收货人手机号 <span>*</span></span><input v-model="addAddressData.phone" placeholder="请输入11位手机号" type="text">
        </div>
        <div class="row">
          <span>收货人地址 <span>*</span></span><select v-model="addAddressData.province">
            <option disabled value="">省/直辖市</option>
            <option v-for="(elem, key) in pcaa[86]" :key="key" :value="key">{{ elem }}</option>
          </select>
          <select v-model="addAddressData.city">
            <option disabled value="">城市</option>
            <option v-for="(elem, key) in pcaa[addAddressData.province]" :key="key" :value="key">{{ elem }}</option>
          </select>
          <select v-model="addAddressData.county">
            <option disabled value="">区/县</option>
            <option v-for="(elem, key) in pcaa[addAddressData.city]" :key="key" :value="key">{{ elem }}</option>
          </select>
        </div>
        <div class="row">
          <span>详细地址 <span>*</span></span><input v-model="addAddressData.detailAddress" placeholder="请输入不少于4不超过150个字的详细地址，例如：路名，门牌号" type="text">
        </div>
        <div class="row">
          <div @click="addAddress" class="confirm">确认</div>
          <div @click="() => {
            this.addModal = false
            this.addAddressData.name = ''
            this.addAddressData.phone = ''
            this.addAddressData.province = ''
            this.addAddressData.city = ''
            this.addAddressData.county = ''
            this.addAddressData.detailAddress = ''
            this.addAddressData.isDefault = false
          }" class="cancel">取消</div>
        </div>
      </div>
      </modal>
  </div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import Breadcrumb from '@/components/Breadcrumb'
import Modal from '@/components/Modal'
import axios from 'axios'
import { pcaa } from 'area-data'
export default {
  components: {
    NavHeader,
    NavFooter,
    Breadcrumb,
    Modal
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
            content: '订单确认',
            href: '/orderConfirm'
          }
        ])
        res.result.addressList.forEach((elem, index) => {
          if (elem.is_default === true) {
            this.checkIndex = index
          }
        })
      }
    })
  },
  methods: {
    addAddress () {
      axios.post('/user/addAddress', this.addAddressData).then(response => {
        let res = response.data
        if (res.code === 200) {
          this.$store.commit('updateAddressList', res.result)
          this.addModal = false
          this.addAddressData.name = ''
          this.addAddressData.phone = ''
          this.addAddressData.province = ''
          this.addAddressData.city = ''
          this.addAddressData.county = ''
          this.addAddressData.detailAddress = ''
          this.addAddressData.isDefault = false
          this.addModal = false
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
    editAddress (elem) {
      this.addAddressData.name = elem.receiver
      this.addAddressData.phone = elem.cellphone
      this.addAddressData.province = elem.province
      this.addAddressData.city = elem.city
      this.addAddressData.county = elem.county
      this.addAddressData.detailAddress = elem.address
      this.addAddressData.isDefault = false
      this.addModal = true
    },
    orderConfirm () {
      axios.post('user/orderConfirm', {address: this.addressList[this.checkIndex]}).then(response => {
        let res = response.data
        if (res.code === 200) {
          alert(res.msg)
          this.$router.push('orderSuccess')
        } else {
          alert(res.msg)
        }
      })
    }
  },
  computed: {
    breadcrumb () {
      return this.$store.state.breadcrumb
    },
    addressList () {
      return this.$store.state.addressList
    },
    cartList () {
      return this.$store.state.cartList
    },
    totalPrice () {
      let total = 0
      this.cartList.forEach(elem => {
        if (elem.is_check === true) {
          total += elem.goods.price * elem.count
        }
      })
      return total
    }
  },
  data () {
    return {
      pcaa,
      addModal: false,
      addAddressData: {
        name: '',
        phone: '',
        province: '',
        city: '',
        county: '',
        detailAddress: '',
        isDefault: false
      },
      checkIndex: 0,
      payMode: 'alipay'
    }
  }
}
</script>
<style scoped>
.order-address-list .check {
  position: relative;
  padding: 0 15px !important;
  border: 2px solid #00c3f5 !important;
}
.order-address-list .check::before {
  position: absolute;
  content: "";
  right: 0;
  bottom: 0;
  border-top: 16px solid #fff;
  border-left: 16px solid #fff;
  border-bottom: 16px solid #00c3f5;
  border-right: 16px solid #00c3f5;
}
.order-address-list .check::after {
  position: absolute;
  content: "";
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  background-size: 16px 16px;
  background-image: url('../assets/check_white.png');
}
.order {
  background-color: #f5f5f5;
}
.order .order-address {
  position: relative;
  padding: 0 40px 10px;
  margin: 10px 0;
  background-color: #FFF;
}
.order .order-address-title {
  padding: 20px 0;
  text-indent: 10px;
  font-size: 18px;
  font-weight: bolder;
  border-bottom: 1px solid #EFEFEF;
}
.order .order-address-list {
  margin: 30px 0 0 0;
  padding: 0;
  overflow: hidden;
  transition: height .8s;
  list-style-type: none;
}
.order-address-checkbox {
  float: left;
  position: relative;
  padding: 1px 16px;
  border: 1px solid #EFEFEF;
  width: 275px;
  height: 144px;
  cursor: pointer;
  margin: 0 0 30px 12px;
  transition: border-color .8s;
}
.order-address-checkbox:hover {
  padding: 0 15px;
  border: 2px solid #00c3f5;
}
.order-address-checkbox-top {
  font-size: 12px;
  padding-top: 15px;
  height: 40px;
  border-bottom: 1px solid #EFEFEF;
  font-weight: bolder;
}
.order-address-checkbox-name {
  float: left;
  width: 125px;
  overflow: hidden;
  white-space: nowrap;
  word-break: keep-all;
  text-overflow: ellipsis;
}
.order-address-checkbox-phone {
  float: right;
}
.order-address-checkbox-content {
  padding-top: 10px;
  word-break: break-all;
  word-wrap: break-word;
  font-size: 12px;
  max-height: 70px;
  overflow: hidden;
  color: #515151;
}
.order-address-checkbox-ctrl {
  position: absolute;
  opacity: 0;
  filter: alpha(opacity=0);
  bottom: -20px;
  left: 0;
  width: 100%;
  height: 20px;
  font-size: 14px;
  padding-top: 5px;
  color: #00c3f5;
}
.order-address-checkbox:hover .order-address-checkbox-ctrl {
  opacity: 1;
}
.order-address-checkbox-delete {
  margin-right: 10px;
  float: right;
}
.order-address-checkbox-delete::after {
  content: "\5220\9664";
}
.order-address-checkbox-edit {
  margin-right: 10px;
  float: right;
}
.order-address-checkbox-edit::after {
  content: "\4FEE\6539";
}
.order-address-addAddress {
  margin-top: 50px;
  text-align: center;
  color: #bfbfbf;
}
.order-address-addAddress i {
  display: block;
  margin: 5px auto;
  height: 24px;
  width: 24px;
  background-image: url('../assets/add.png');
  background-size: 24px 24px;
}
.order-address-checkbox:hover .order-address-addAddress {
  color: #00c3f5;
}
.order-address-checkbox:hover .order-address-addAddress i {
  background-image: url('../assets/add_blue.png');
}
/* 模态框 */
.order .modal .header {
  position: relative;
  height: 50px;
  color: #333;
  line-height: 50px;
  text-align: center;
  border-bottom: 1px solid #EFEFEF;
  font-size: 18px;
  font-weight: bolder;
}
.order .main {
  padding: 30px 0 10px 13px;
}
.order .main .row {
  margin-bottom: 25px;
  height: 37px;
  line-height: 37px;
  font-size: 14px;
  color: #666;
}
.order .main .row:nth-of-type(1) input {
  margin-right: 30px;
  padding-left: 8px;
  height: 37px;
  width: 350px;
}
.order .main .row:nth-of-type(2) select {
  margin-right: 30px;
  padding-left: 8px;
  height: 37px;
  width: 259px;
}
.order .main .row:nth-of-type(3) input {
  margin-right: 30px;
  padding-left: 8px;
  height: 37px;
  width: 845px;
}
.order .main .row > span {
  display: inline-block;
  width: 100px;
  margin-right: 10px;
}
.order .main .row > span > span {
  position: relative;
  top: 2px;
  color: red;
}
.order .main .row:nth-of-type(4) {
  text-align: center
}
.order .main .row:nth-of-type(4) > div {
  margin: 5px 20px;
  display: inline-block;
  padding: 10px 20px;
  line-height: 1.3333;
  border-radius: 3px;
  font-size: 14px;
  width: 118px;
  text-align: center;
  cursor: pointer;
}
.order .main .row:nth-of-type(4) > div.confirm {
  color: #fff;
  background-color: #00c3f5;
}
.order .main .row:nth-of-type(4) > div.confirm:hover {
  color: #fff;
  background-color: #4dcff6;
}
.order .main .row:nth-of-type(4) > div.cancel {
  border-color: #DFDFDF;
  background-color: #DFDFDF;
}
.order .main .row:nth-of-type(4) > div.cancel:hover {
  border-color: #eaeaea;
  background-color: #eaeaea;
}
.order .main .row:nth-of-type(4) > div:active {
  outline: 0;
  background-image: none;
  box-shadow: inset 0 3px 5px rgba(0,0,0,.125);
}
/* 商品信息 */
.order-product {
  padding: 0 40px 30px;
  background-color: #FFF;
}
.order-product-title {
  font-size: 18px;
  text-indent: 10px;
  padding: 25px 0;
  font-weight: bolder;
}
.order-product-list table {
  width: 100%;
  font-size: 14px;
  color: #666;
  text-align: center;
  border: 1px solid #efefef;
}
.order-product-list table thead {
  height: 62px;
  line-height: 62px;
  border: 1px solid #efefef;
  font-size: 18px;
  color: #333;
}
.order-product-list table thead tr th {
  font-weight: bold;
}
.order-product-list table tbody {
  background-color: #fff;
}
.order-product-list table tbody tr {
  border-bottom: 1px solid #efefef;
}
.order-product-list table tbody td:nth-child(1) {
  text-align: left;
  padding: 20px 0;
}
.order-product-list table tbody td:nth-child(1) i {
  margin: 42px 20px;
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: #fff;
  border: 1px solid #bbb;
  border-radius: 2px;
  background-position: -1px -1px;
  cursor: pointer;
}
.order-product-list table tbody tr td:nth-child(1) a {
  position: relative;
  display: inline-block;
  height: 100px;
  line-height: 100px;
  width: 100%;
  text-decoration: none;
}
.order-product-list table tbody tr td:nth-child(1) img {
  position: absolute;
  left: 20px;
  top: 0;
  vertical-align: middle;
  width: 100px;
  height: 100px;
}
.order-product-list table tbody tr td:nth-child(1) span.name {
  display: inline-block;
  position: absolute;
  left: 140px;
  top: 31px;
  height: 14px;
  line-height: 14px;
  width: 240px;
  color: #333
}
.order-product-list table tbody tr td:nth-child(1) span.spec {
  display: inline-block;
  position: absolute;
  left: 140px;
  top: 55px;
  height: 14px;
  line-height: 14px;
  width: 240px;
  color: #666;
}
.order-product-list table tbody td:nth-child(2) {
  font-weight: bold;
  color: #333;
}
.order-product-list table tbody td:nth-child(3) {
  color: #333;
  font-weight: bold;
}
.order-product-list table tbody td:nth-child(4) {
  font-weight: bold;
  color: #e02b41;
}
.order-product-list table tbody td:nth-child(5) i {
  margin: 40px 0;
  display: inline-block;
  width: 20px;
  height: 20px;
  background-image: url('../assets/delete.png');
  background-color: #fff;
  background-size: 20px 20px;
  cursor: pointer;
}
/* 表格宽度 */
.order-product-list table td:nth-child(1) {
  width: 38%;
}
.order-product-list table td:nth-child(2) {
  width: 15%;
}
.order-product-list table td:nth-child(3) {
  width: 15%;
}
.order-product-list table td:nth-child(4) {
  width: 15%;
}
.order-product-list table td:nth-child(5) {
  border-left: 1px solid #efefef;
  width: 17%;
}
.order-product-list table td:nth-child(5) span {
  color: #e02b41;
  font-weight: bold;
}
.order-product-list table tfoot tr {
  height: 70px;
  line-height: 70px;
  background-color: #efefef;
}
.order-product-list table tfoot tr td:nth-child(5) {
  font-size: 20px;
  font-weight: bold;
}
.order-product-list table tfoot tr td:nth-child(5) span {
  color: #e02b41;
  font-weight: bold;
}
.order-total {
  overflow: hidden;
  margin: 10px auto 38px;
  padding: 0 40px 30px;
  color: #898989;
  background-color: #FFF;
}
.order-total-pay {
  overflow: hidden;
  margin-bottom: 30px;
}
.order-total-pay-header {
  color: #333;
  font-size: 18px;
  text-indent: 10px;
  padding: 25px 0;
  font-weight: bolder;
}
.order-total-pay-content {
  padding: 40px 26px 0;
  border: 1px solid #efefef;
}
.order-total-pay .order-total-row {
  margin-bottom: 24px;
}
.order-total-pay .order-total-pay-title {
  float: left;
  width: 60px;
  line-height: 40px;
  font-weight: bolder;
  margin-right: 20px;
  font-size: 14px;
  color: #333;
}
.order-total-pay .order-total-pay-list {
  margin: 0;
  padding: 0;
  float: left;
  width: 1020px;
  margin-right: -200px;
  list-style: none;
}
.order-total-pay .order-total-pay-label {
  position: relative;
  float: left;
  margin-right: 40px;
  margin-bottom: 26px;
  cursor: pointer;
}
.order-total-pay .order-total-pay-radio {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  border-radius: 100%;
  width: 14px;
  height: 14px;
  border: 1px solid #e0e0e0;
  margin-right: 20px;
}
.order-total-pay .order-total-pay-img {
  display: inline-block;
  vertical-align: middle;
  width: 125px;
  height: 40px;
  border: 1px solid #BDBDBD;
}
.order-total-pay .alipay .order-total-pay-img {
  background-image: url('../assets/pay/alipay.png');
  border-color: #FFF;
}
.order-total-pay .wechat .order-total-pay-img {
  background-image: url('../assets/pay/wechat.png');
  border-color: #FFF;
}
.order-total-pay .abc .order-total-pay-img {
  background-image: url('../assets/pay/abc.png');
}
.order-total-pay .boc .order-total-pay-img {
  background-image: url('../assets/pay/boc.png');
}
.order-total-pay .ccb .order-total-pay-img {
  background-image: url('../assets/pay/ccb.png');
}
.order-total-pay .cib .order-total-pay-img {
  background-image: url('../assets/pay/cib.png');
}
.order-total-pay .cmb .order-total-pay-img {
  background-image: url('../assets/pay/cmb.png');
}
.order-total-pay .comm .order-total-pay-img {
  background-image: url('../assets/pay/comm.png');
}
.order-total-pay .icbc .order-total-pay-img {
  background-image: url('../assets/pay/icbc.png');
}
.order-total-pay .psbc .order-total-pay-img {
  background-image: url('../assets/pay/psbc.png');
}
.order-total-pay .shbank .order-total-pay-img {
  background-image: url('../assets/pay/shbank.png');
}
.order-total .order-total-content {
  float: right;
  width: 318px;
  font-size: 14px;
}
.order-total .order-total-row {
  padding: 0 2px;
  margin-bottom: 20px;
}
.order-total .order-total-price {
    float: right;
}
.order-total .order-total-line {
  width: 100%;
  height: 1px;
  background-color: #EFEFEF;
  margin-bottom: 20px;
}
.order-total .order-total-price.total {
  color: #e02b41;
  font-size: 20px;
  font-weight: bolder;
}
.order-total-row .button {
  float: right;
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
.order-total-row .button:hover {
  color: #fff;
  background-color: #4dcff6;
}
.order-total-row .button:active {
  outline: 0;
  background-image: none;
  box-shadow: inset 0 3px 5px rgba(0,0,0,.125);
}
.order-total-pay-label .check::after {
  position: absolute;
  border-radius: 100%;
  content: ' ';
  background: #29b1ec;
  width: 6px;
  height: 6px;
  left: 3px;
  top: 3px;
}
</style>
