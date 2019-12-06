<template>
  <div class="goodsinfo-container">
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <div class="ball" v-if="ballflag"></div>
    </transition>
    <!-- 轮播 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="goodsslider">
            <slider :sliderdata="goodsslider"></slider>
          </div>
        </div>
      </div>
    </div>

    <!-- 购买区 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodscontent.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：<del>￥{{ goodscontent.market_price }}</del
            >&nbsp;&nbsp; 销售价：<span class="now-price"
              >￥{{ goodscontent.sell_price }}</span
            >
          </p>
          <p>购买数量： <numbox style="display: inline-block"></numbox></p>
          <mt-button type="primary" size="small">立即购买</mt-button>
          <mt-button type="danger" size="small" @click="ballflag = !ballflag"
            >加入购物车</mt-button
          >
        </div>
      </div>
    </div>
    <!-- 参数区 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodscontent.goods_no }}</p>
          <p>库存情况：{{ goodscontent.stock_quantity }} 件</p>
          <p>上架时间：{{ goodscontent.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="gogoodsdesc(id)"
          >图文介绍</mt-button
        >
        <mt-button type="danger" size="large" plain @click="gogoodscmt(id)"
          >商品评论</mt-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import slider from '../subcomponents/slider.vue'
import numbox from '../subcomponents/goodsinfo_numbox.vue'

export default {
  data() {
    return {
      id: this.$route.params.id, // 将路由对象中的id 挂载到 data 上，方便调用
      goodsslider: [],
      goodscontent: {},
      goodsinfo: {},
      ballflag: false // 控制小球显示隐藏标识符
    }
  },
  created() {
    this.getGetSlider()
    this.getGoodsContent()
  },
  methods: {
    getGetSlider() {
      this.$http.get('api/getthumimages/' + this.id).then(result => {
        if (result.body.status !== 0) return Toast('goodsinfo err')
        result.body.message.forEach(item => {
          item.img = item.src
        })
        this.goodsslider = result.body.message
      })
    },
    getGoodsContent() {
      this.$http.get('api/goods/getinfo/' + this.id).then(result => {
        if (result.body.status !== 0) return Toast('goodscontent err')
        this.goodscontent = result.body.message[0]
      })
    },
    // 编程式导航
    gogoodsdesc(id) {
      this.$router.push({ name: 'goodsdesc', params: { id } })
    },
    gogoodscmt(id) {
      this.$router.push({ name: 'goodscmt', params: { id } })
    },
    // 半程动画
    beforeEnter(el) {},
    enter(el, done) {
      el.offsetWidth
    }
  },
  components: {
    slider,
    numbox
  }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  position: relative;
  .goodsslider {
    /deep/.mint-swipe {
      height: 200px;
      .mint-swipe-item {
        text-align: center;
        img {
          height: 100%;
        }
      }
    }
  }
  .now-price {
    color: #f00;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #f00;
    position: absolute;
    z-index: 99;
    top: 370px;
    left: 146px;
  }
}
</style>
