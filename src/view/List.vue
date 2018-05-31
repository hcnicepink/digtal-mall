<template>
  <div>
    <nav-header></nav-header>
    <div class="main">
      <div class="container">
        <breadcrumb :data="breadcrumb"></breadcrumb>
        <div class="selector">
          <div class="sl-prop">
            <div class="sl-line-wrap">
              <div class="mod-key">
                <span>品牌：</span>
              </div>
              <div class="mod-value">
                <ul class="mod-value-list clearfix">
                  <li :class="{'active': typeof brandid === 'undefined'}" @click="updateBrandId(undefined)">全部</li>
                  <li
                    v-for="(elem, index) in brand"
                    :key="index"
                    :class="{'active': brandid === elem._id}"
                    @click="updateBrandId(elem._id)">{{ elem.name }}</li>
                </ul>
              </div>
            </div>
            <div class="sl-line-wrap">
              <div class="mod-key">
                <span>价格：</span>
              </div>
              <div class="mod-value">
                <ul class="mod-value-list clearfix">
                  <li :class="{'active': typeof priceRange === 'undefined'}" @click="updatePriceRange(undefined)">全部</li>
                  <li
                    v-for="(elem, index) in price"
                    :key="index"
                    :class="{'active': priceRange === elem.range}"
                    @click="updatePriceRange(elem.range)">{{ elem.content }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="filter clearfix">
          <ul class="filter-order">
            <li
            v-for="(elem, index) in sort"
            :key="index"
            :class="{'active': elem.key === sortType}"
            @click="updateOrder(elem.key)">{{ elem.name }}
            <i v-show="elem.key === sortType" :class="{'opposite': sortFlag === true}"></i></li>
          </ul>
          <div class="filter-condition">
            <label @click="() => {
              if (typeof this.haveStock === 'undefined') {
                this.haveStock = true
              } else {
                this.haveStock = undefined
              }
              this.updateGoodsList()}"><i :class="{'check': typeof haveStock !== 'undefined'}"></i>仅显示有货商品</label>
          </div>
        </div>
        <div class="goods-list">
          <ul class="goods-list-wrap clearfix">
            <transition-group name="fadedown">
              <li v-for="(elem, index) in goodsList" class="gl-item" :key="index">
                <a :href="`/detail?id=${elem._id}`">
                  <div class="gl-item-wrap">
                    <img :src="elem.pic[0].md" alt="">
                    <p class="price">{{ elem.price | currency('￥') }}</p>
                    <p class="title">{{ elem.title }}</p>
                  </div>
                </a>
              </li>
            </transition-group>
          </ul>
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
    // 更新货物列表
    let query = this.$route.query
    if (query.categoryid === 'all') {
      this.categoryid = undefined
    } else {
      this.categoryid = query.categoryid
    }
    this.updateGoodsList()
    // 更新面包屑导航
    let category
    axios.get('/category').then(response => {
      let res = response.data
      if (res.code === 200) {
        category = res.result
      }
      if (this.$route.query.categoryid === 'all') {
        this.$store.commit('updateBreadcrumb', [
          {
            href: '/list/?categoryid=all',
            content: '全部商品'
          }
        ])
      } else {
        category.forEach((elem, index) => {
          if (elem._id === this.$route.query.categoryid) {
            this.$store.commit('updateBreadcrumb', [
              {
                href: '/list/?categoryid=all',
                content: '全部商品'
              },
              {
                href: `/list/?categoryid=${elem._id}`,
                content: elem.name
              }
            ])
          }
        })
      }
    })
    // 获取品牌信息
    axios.get('/brand').then(response => {
      let res = response.data
      if (res.code === 200) {
        this.brand = res.result
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.brandid = undefined
    this.priceRange = undefined
    this.sortType = 'sold_count'
    this.sortFlag = false
    // 更新货物列表
    let query = to.query
    if (query.categoryid === 'all') {
      this.categoryid = undefined
    } else {
      this.categoryid = query.categoryid
    }
    this.updateGoodsList()
    // 更新面包屑导航
    if (to.query.categoryid === 'all') {
      this.$store.commit('updateBreadcrumb', [
        {
          href: '/list/?categoryid=all',
          content: '全部商品'
        }
      ])
    } else {
      this.$store.state.category.forEach((elem, index) => {
        if (elem._id === to.query.categoryid) {
          this.$store.commit('updateBreadcrumb', [
            {
              href: '/list/?categoryid=all',
              content: '全部商品'
            },
            {
              href: `/list/?categoryid=${elem._id}`,
              content: elem.name
            }
          ])
        }
      })
    }
    next()
  },
  data () {
    return {
      brand: [],
      categoryid: undefined,
      brandid: undefined,
      page: 1,
      priceRange: undefined,
      keyword: undefined,
      price: [
        {
          range: 0,
          content: '0~499'
        },
        {
          range: 1,
          content: '500~999'
        },
        {
          range: 2,
          content: '1000~1999'
        },
        {
          range: 3,
          content: '1999~4999'
        },
        {
          range: 4,
          content: '>5000'
        }
      ],
      sort: [
        {
          key: 'sold_count',
          name: '销量'
        },
        {
          key: 'shelf_time',
          name: '时间'
        },
        {
          key: 'price',
          name: '价格'
        }
      ],
      sortType: 'sold_count',
      sortFlag: false,
      haveStock: undefined,
      goodsList: []
    }
  },
  computed: {
    breadcrumb () {
      return this.$store.state.breadcrumb
    }
  },
  methods: {
    updateGoodsList () {
      axios.get('/goods/', {
        params: {
          categoryid: this.categoryid,
          brandid: this.brandid,
          page: this.page,
          priceRange: this.priceRange,
          keyword: this.keyword,
          sortType: this.sortType,
          sortFlag: this.sortFlag ? 1 : -1,
          haveStock: this.haveStock
        }
      }).then(response => {
        let res = response.data
        if (res.code === 200) {
          this.goodsList = res.result
        }
      })
    },
    updateBrandId (id) {
      this.brandid = id
      this.updateGoodsList()
    },
    updatePriceRange (range) {
      this.priceRange = range
      this.updateGoodsList()
    },
    updateOrder (sortType) {
      if (sortType === this.sortType) {
        this.sortFlag = !this.sortFlag
      } else {
        this.sortType = sortType
        this.sortFlag = false
      }
      this.updateGoodsList()
    }
  }
}
</script>
<style scoped>
.main {
  background-color: #f8f8f8;
}
.goods-list-wrap {
  margin: 0;
  padding: 0;
  height: auto;
}
.goods-list-wrap a {
  text-decoration: none;
}
.gl-item {
  float: left;
  margin: 0 12px 12px 0;
  width: 298px;
  list-style-type: none;
  background-color: #fff;
  transition: transform .2s linear;
}
.gl-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}
.gl-item-wrap {
  padding: 20px 30px 0;
}
.gl-item-wrap img {
  display: block;
  margin: 20px auto;
  width: 200px;
  height: 200px;
}
.gl-item-wrap .price {
  color: #e02b41;
  font-size: 20px;
}
.gl-item-wrap .title {
  color: #666;
  font-size: 14px;
  height: 38px;
  overflow: hidden;
}
.gl-item-wrap .title:hover {
  color: #e02b41;
}

.fadedown-enter-active, .fadedown-leave-active {
  transition: all .3s;
}
.fadedown-enter, .fadedown-leave-to {
  opacity: 0;
  transform: translateY(-10%)
}
.selector {
  font-size: 14px;
  border: 1px solid #efefef;
  background: #FFF;
  padding: 15px 10px;
  margin-bottom: 10px;
  overflow: hidden;
}
.sl-line-wrap {
  position: relative;
  line-height: 46px;
  height: auto;
}
.sl-line-wrap .mod-key {
  float: left;
  width: 75px;
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  color: #333;
}
.sl-line-wrap .mod-value {
  margin: 0 83px 0 95px;
  overflow: hidden;
  zoom: 1;
  background: #fff;
}
.sl-line-wrap .mod-value .mod-value-list {
  margin: 0;
  padding: 0;
}
.sl-line-wrap .mod-value .mod-value-list li {
  float: left;
  margin-right: 62px;
  list-style: none;
  cursor: pointer;
}
.sl-line-wrap .mod-value .mod-value-list li:hover {
  color: #00c3f5;
}
.active {
  color: #00c3f5;
}
.filter {
  position: relative;
  margin: 30px 0 20px;
  font-size: 14px;
  color: #666;
}
.filter-order {
  float: left;
}
.filter-condition {
  float: right;
}
.filter-order {
  margin: 0;
  padding: 0;
}
.filter-order li {
  float: left;
  margin-right: 20px;
  height: 20px;
  line-height: 20px;
  width: 50px;
  list-style: none;
  cursor: pointer;
}
.filter-order li:hover {
  color: #00c3f5;
}
.filter-order li i {
  position: relative;
  top: 2px;
  display: inline-block;
  width: 14px;
  height: 14px;
  background-size: 14px 14px;
  background-repeat: no-repeat;
  background-image: url('../assets/order-arrow.png');
  transition: transform .3s;
}
.opposite {
  transform: rotate(-180deg)
}
.filter-condition {
  position: relative;
}
.filter-condition label {
  padding-left: 20px;
  cursor: pointer;
}
.filter-condition label i {
  position: absolute;
  left: 0;
  top: 3px;
  width: 14px;
  height: 14px;
  background-color: #fff;
  border: 1px solid #ccc;
}
.check {
  background-image: url('../assets/check.png');
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 12px 12px;
}
</style>
