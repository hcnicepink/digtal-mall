<template>
  <div>
    <nav-header></nav-header>
    <div class="main">
      <div class="container">
        <breadcrumb :data="breadcrumb"></breadcrumb>
        <div class="goods-list">
          <ul class="goods-list-wrap clearfix">
            <transition-group name="fadedown">
              <li v-for="(elem, index) in goodsList" class="gl-item" :key="index">
                <a href="#">
                  <div class="gl-item-wrap">
                    <img :src="elem.pic[0].md" alt="">
                    <p class="price">{{ '￥' + elem.price }}</p>
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
      axios.get('/goods/all').then(response => {
        let res = response.data
        if (res.code === 200) {
          this.$store.commit('uptateGoodsList', res.result)
        }
      })
    } else {
      axios.get('/goods/', {
        params: query
      }).then(response => {
        let res = response.data
        if (res.code === 200) {
          this.$store.commit('uptateGoodsList', res.result)
        }
      })
    }
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
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    // 更新货物列表
    let query = to.query
    if (query.categoryid === 'all') {
      axios.get('/goods/all').then(response => {
        let res = response.data
        if (res.code === 200) {
          this.$store.commit('uptateGoodsList', res.result)
        }
      })
    } else {
      axios.get('/goods/', {
        params: query
      }).then(response => {
        let res = response.data
        if (res.code === 200) {
          this.$store.commit('uptateGoodsList', res.result)
        }
      })
    }
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
    }
  },
  computed: {
    goodsList () {
      return this.$store.state.goodsList
    },
    breadcrumb () {
      return this.$store.state.breadcrumb
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
  transition: all .5s;
}
.fadedown-enter, .fadedown-leave-to {
  opacity: 0;
  transform: translateY(-10%)
}
</style>
