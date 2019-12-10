import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    car: JSON.parse(localStorage.getItem('car') || '[]')
  },
  mutations: {
    addToCar(state, goodsinfo) {
      var flag = false // 判断是否为同一个商品的表示符
      // 如果是同一个商品，只需要增加商品数量
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      // 如果不是同一个商品，则添加商品信息
      if (!flag) {
        state.car.push(goodsinfo)
      }
      // 每当更新 car加数据存储到本地 localStorage 中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    // 当购物车页面中的数量发生改变，同步数据
    updateGoodslist(state, goodsinfo) {
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    deleteGoodsInfo(state, goodsid) {
      // var index = state.car.findIndex(item => {
      //   return item.id == goodsid
      // })
      // state.car.splice(index, 1)
      state.car.some((item, i) => {
        if (item.id == goodsid) {
          state.car.splice(i, 1)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updataGoodsSelected(state, goodsinfo) {
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.selected = goodsinfo.selected
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    optCount(state) {
      var c = 0
      state.car.forEach(item => {
        c += parseInt(item.count)
      })
      return c
    },
    // 建立一个对象，将 id 与 count 建立联系，
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsAmount(state) {
      var o = {
        count: 0,
        amount: 0
      }
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count
          o.amount += item.count * item.price
        }
      })
      return o
    }
  }
})

import moment from 'moment'
Vue.filter('dateFormat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(dataStr).format(pattern)
})

import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.root = 'http://www.liulongbin.top:3005'
Vue.http.options.emulateJSON = true

// MUI 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// Mint-UI样式按需导入
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)

// Mint-UI 全部导入
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import router from './router.js'

import app from './App.vue'

const vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,
  store
})
console.log(vm)
