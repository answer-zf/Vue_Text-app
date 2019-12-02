<template>
  <div>
    <!-- 轮播 -->
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="item in sliderList" :key="item.id">
        <img :src="item.img" />
      </mt-swipe-item>
    </mt-swipe>

    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span>
            <img src="../../images/menu1.png" alt="" />
          </span>
          <div class="mui-media-body">新闻资讯</div></a
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-email"
            ><span class="mui-badge">5</span></span
          >
          <div class="mui-media-body">图片分享</div></a
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-chatbubble"></span>
          <div class="mui-media-body">商品购买</div></a
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-location"></span>
          <div class="mui-media-body">留言反馈</div></a
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-search"></span>
          <div class="mui-media-body">视频专区</div></a
        >
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-phone"></span>
          <div class="mui-media-body">联系我们</div></a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      sliderList: []
    }
  },
  created() {
    this.getSlider()
  },
  methods: {
    getSlider() {
      this.$http
        .get('http://www.liulongbin.top:3005/api/getlunbo')
        .then(result => {
          if (result.body.status === 0) {
            this.sliderList = result.body.message
          } else {
            Toast('加载失败')
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 120px;

  .mint-swipe-item {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;

  .mui-table-view-cell {
    border: none;
  }
}
</style>
