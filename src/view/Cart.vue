<template>
  <div class="cart">
    <nav-header></nav-header>
    <div class="container">
      <breadcrumb :data="breadcrumb"></breadcrumb>
      <table>
        <thead>
          <tr>
            <th>商品</th>
            <th>单价(元)</th>
            <th>数量</th>
            <th>小计(元)</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(elem, index) in cartList" :key="index">
            <td>
              <i @click="() => {
                cartList[index].is_check = !cartList[index].is_check
                updateCartList()}" :class="{'check': elem.is_check}"></i>
              <a target="_blank" :href="elem.goods.href">
                <img :src="elem.goods.pic[0].md">
                <span class="name">{{ elem.goods.name }}</span><span class="spec">{{ elem.goods.spec }}</span>
              </a>
            </td>
            <td>{{ elem.goods.price | currency('￥') }}</td>
            <td><input-number :num="elem.count" @updateNum="(num) => {
              cartList[index].count = num
              updateCartList()}"></input-number></td>
            <td>{{ elem.goods.price * elem.count | currency('￥') }}</td>
            <td><i @click="() => {
              cartList.splice(index, 1)
              updateCartList()}"></i></td>
          </tr>
        </tbody>
      </table>
      <div class="cart-footer clearfix">
        <p class="left">
          <i @click="checkAll(!isCheckedAll)" :class="{'check': isCheckedAll}"></i>
          <span>
            全选&emsp;&emsp;共
            <span>{{ (() => {
              if ($store.state.cartList === null) return 0
              let count = 0;
              $store.state.cartList.forEach(elem => {
                count += elem.count
              })
              return count
              })() }}</span>
            件商品，已选择
            <span>
              {{ (() => {
                    let count = 0
                    cartList.forEach((elem) => {
                      if (elem.is_check === true) {
                        count += elem.count
                      }
                    })
                    return count
                  })()
              }}</span>
              件
          </span>
        </p>
        <div class="checkout">
          去结算
        </div>
        <p class="right">
          合计（不含运费）
          <span>
          {{ (() => {
            let total = 0
            cartList.forEach(elem => {
              if (elem.is_check === true) {
                total += elem.goods.price * elem.count
              }
            })
            return total
          })() | currency('￥') }}
          </span>
        </p>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import Breadcrumb from '@/components/Breadcrumb'
import InputNumber from '@/components/InputNumber'
import axios from 'axios'
export default {
  components: {
    NavHeader,
    NavFooter,
    Breadcrumb,
    InputNumber
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
            content: '购物车',
            href: '/cart'
          }
        ])
      }
    })
  },
  computed: {
    breadcrumb () {
      return this.$store.state.breadcrumb
    },
    cartList () {
      return this.$store.state.cartList
    },
    isCheckedAll () {
      let flag = true
      this.cartList.forEach(elem => {
        if (elem.is_check === false) {
          flag = false
        }
      })
      return flag
    }
  },
  methods: {
    updateCartList () {
      this.$store.commit('updateCartList', this.cartList)
      axios.post('/user/updateCart', this.cartList).then(response => {
        let res = response.data
        if (res.code === 200) {
          this.$store.commit('updateCartList', res.result)
        }
      })
    },
    checkAll (flag) {
      this.cartList.forEach(elem => {
        elem.is_check = flag
      })
      this.updateCartList()
    }
  }
}
</script>
<style scoped>
.cart table {
  margin: 20px 0 0 0;
  width: 100%;
  font-size: 14px;
  color: #666;
  text-align: center;
}
.cart table thead {
  background-color: #fafafa;
  height: 50px;
  line-height: 50px;
}
.cart table thead tr th {
  font-weight: normal;
}
.cart table tbody tr {
  border-bottom: 1px solid #ddd;
}
.cart table tbody td:nth-child(1) {
  text-align: left;
  padding: 20px 0;
}
.cart table tbody td:nth-child(1) i {
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
.cart table tbody tr td:nth-child(1) a {
  position: relative;
  display: inline-block;
  height: 100px;
  line-height: 100px;
  width: calc(100% - 64px);
  text-decoration: none;
}
.cart table tbody tr td:nth-child(1) img {
  position: absolute;
  left: 0;
  top: 0;
  vertical-align: middle;
  width: 100px;
  height: 100px;
}
.cart table tbody tr td:nth-child(1) span.name {
  display: inline-block;
  position: absolute;
  left: 120px;
  top: 31px;
  height: 14px;
  line-height: 14px;
  width: 60%;
  color: #666
}
.cart table tbody tr td:nth-child(1) span.spec {
  display: inline-block;
  position: absolute;
  left: 120px;
  top: 55px;
  height: 14px;
  line-height: 14px;
  width: 60%;
  color: #999;
}
.cart table tbody td:nth-child(2) {
  font-weight: bold;
}
.cart table tbody td:nth-child(4) {
  font-weight: bold;
  color: #e02b41;
}
.cart table tbody td:nth-child(5) i {
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
.cart table td:nth-child(1) {
  width: 40%;
}
.cart table td:nth-child(2) {
  width: 15%;
}
.cart table td:nth-child(3) {
  width: 15%;
}
.cart table td:nth-child(4) {
  width: 15%;
}
.cart table td:nth-child(5) {
  width: 15%;
}
.cart .check {
  background-image: url('../assets/check_full.png');
}
.cart .cart-footer {
  margin-bottom: 40px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  color: #666;
}
.cart .cart-footer .left {
  position: relative;
  float: left;
  height: 71px;
  line-height: 71px;
  margin: 0;
}
.cart .cart-footer .left i {
  margin: 27px 20px;
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: #fff;
  border: 1px solid #bbb;
  border-radius: 2px;
  background-position: -1px -1px;
  cursor: pointer;
}
.cart .cart-footer .left > span {
  position: absolute;
  top: 0;
  left: 56px;
  width: 400px;
  display: inline-block;
  height: 71px;
  line-height: 71px;
}
.cart .cart-footer .left > span > span:nth-child(1) {
  font-weight: bold;
}
.cart .cart-footer .left > span > span:nth-child(2) {
  font-weight: bold;
  color: #00c3f5;
}
.cart .cart-footer .right {
  float: right;
  margin: 0;
  height: 71px;
  line-height: 71px;
}
.cart .cart-footer .right span {
  font-size: 20px;
  color: #e02b41;
  font-weight: bold;
}
.cart .cart-footer .checkout {
  float: right;
  margin: 15px 40px;
  padding: 10px 20px;
  line-height: 1.33333;
  border-radius: 3px;
  font-size: 14px;
  width: 100px;
  text-align: center;
  color: #fff;
  background-color: #00c3f5;
  cursor: pointer;
}
</style>
