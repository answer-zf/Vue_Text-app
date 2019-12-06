<template>
  <div class="goodsdesc-container">
    <h3 class="title">{{ goodsdesc.title }}</h3>
    <hr />
    <div class="content" v-html="goodsdesc.content"></div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      goodsdesc: {}
    }
  },
  created() {
    this.getGoodsDesc()
  },
  methods: {
    getGoodsDesc() {
      this.$http
        .get('api/goods/getdesc/' + this.$route.params.id)
        .then(result => {
          if (result.body.status !== 0) return Toast('goodsinfo err')
          this.goodsdesc = result.body.message[0]
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.goodsdesc-container {
  padding: 4px;
  h3 {
    font-size: 16px;
    color: cornflowerblue;
    text-align: center;
    margin: 15px 0;
  }
  /deep/.content {
    p {
      margin: 0;
    }
    img {
      width: 100%;
      vertical-align: middle;
    }
  }
}
</style>
