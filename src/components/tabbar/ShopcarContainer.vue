<template>
  <div class="shopcar-container">
    <div class="goodslist-shopcar">
      <div class="mui-card" v-for="item in shopcarlist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch></mt-switch>
            <img :src="item.thumb_path" alt="" />
            <div class="info">
              <h3>{{ item.title }}</h3>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox style="display:inline-block"></numbox>
                <a href="javascript:;">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner"></div>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox.vue'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      shopcarlist: []
    }
  },
  created() {
    this.getCarInfo()
  },
  methods: {
    getCarInfo() {
      // 获取 store 中 所有商品ID ，后拼接出一个以逗号分割的字符串
      var arr = []
      this.$store.state.car.forEach(item => arr.push(item.id))
      // 如果购物车中没有商品，直接返回不请求数据接口
      if (arr.length <= 0) return
      this.$http
        .get('api/goods/getshopcarlist/' + arr.join(','))
        .then(result => {
          if (result.body.status !== 0) return Toast('shopcar err')
          this.shopcarlist = result.body.message
        })
    }
  },
  components: {
    numbox
  }
}
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goodslist-shopcar {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
      justify-content: space-around;
      img {
        width: 60px;
        height: 60px;
        margin: 0 2px;
      }
      .info {
        display: flex;
        flex-direction: column;
        h3 {
          font-size: 13px;
          color: cornflowerblue;
        }
        p {
          margin-top: 8px;
          .price {
            color: #f00;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
