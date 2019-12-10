<template>
  <div class="shopcar-container">
    <div class="goodslist-shopcar">
      <div class="mui-card" v-for="(item, i) in shopcarlist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              v-model="$store.getters.getGoodsSelected[item.id]"
              @change="
                seletedChanged(
                  item.id,
                  $store.getters.getGoodsSelected[item.id]
                )
              "
            ></mt-switch>
            <img :src="item.thumb_path" alt="" />
            <div class="info">
              <h3>{{ item.title }}</h3>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox
                  style="display:inline-block"
                  :initcount="$store.getters.getGoodsCount[item.id]"
                  :goodsid="item.id"
                ></numbox>
                <a
                  href="javascript:;"
                  @click.prevent="deletegoods(item.id, val)"
                  >删除</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner account">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span class="red">{{ $store.getters.getGoodsAmount.count }}</span
              >件， 总价
              <span class="red"
                >￥{{ $store.getters.getGoodsAmount.amount }}</span
              >元
            </p>
          </div>
          <mt-button type="danger">结算 </mt-button>
        </div>
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
    },
    deletegoods(id, i) {
      this.shopcarlist.splice(i, 1)
      this.$store.commit('deleteGoodsInfo', id)
    },
    seletedChanged(id, val) {
      // this.shopcarlist.splice(i, 1)
      // console.log(id + '------' + i)
      this.$store.commit('updataGoodsSelected', { id, selected: val })
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
  .account {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: #f00;
      font-weight: 700;
      font-size: 16px;
    }
  }
}
</style>
