<template>
  <div>
    <!-- 滑动条 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id === 0 ? 'mui-active' : '']"
            href=""
            data-wid="tab-top-subpage-1.html"
            v-for="item in category"
            :key="item.id"
            @click="getPhotoListById(item.id)"
          >
            {{ item.title }}
          </a>
        </div>
      </div>
    </div>
    <!-- 图片列表 -->
    <ul class="photo-list">
      <router-link
        :to="'/home/photoinfo/' + item.id"
        v-for="item in list"
        :key="item.id"
        tag="li"
      >
        <img v-lazy="item.img_url" />
        <div class="info">
          <h2 class="info-title">{{ item.title }}</h2>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
// 导入MUI js文件
import mui from '../../lib/mui/js/mui.min.js'

import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      category: [],
      list: []
    }
  },
  created() {
    this.getCategory()
    this.getPhotoListById(0)
  },
  mounted() {
    // 当组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
    // 初始化 滑动控件
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    })
  },
  methods: {
    getCategory() {
      this.$http.get('api/getimgcategory').then(result => {
        if (result.body.status !== 0) return Toast('category err')
        this.category = result.body.message
        this.category.unshift({
          id: 0,
          title: '全部'
        })
      })
    },
    getPhotoListById(cateId) {
      this.$http.get('api/getimages/' + cateId).then(result => {
        if (result.body.status !== 0) return Toast('category err')
        this.list = result.body.message
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 解决滑动控件bug
* {
  touch-action: pan-y;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 5px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy='loading'] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      color: #fff;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      padding: 0 4px;
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>
