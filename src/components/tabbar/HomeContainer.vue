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
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" class="" alt="" />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../images/menu2.png" class="" alt="" />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="../../images/menu3.png" class="" alt="" />
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="../../images/menu4.png" class="" alt="" />
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="../../images/menu5.png" class="" alt="" />
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="../../images/menu6.png" class="" alt="" />
          <div class="mui-media-body">联系我们</div>
        </router-link>
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
      this.$http.get('api/getlunbo').then(result => {
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

    img {
      width: 60px;
    }
    .mui-media-body {
      font-size: 13px;
    }
  }
}
</style>
