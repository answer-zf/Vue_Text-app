<template>
  <div class="newsinfo-container">
    <h3 class="title">{{ dataNewsInfo.title }}</h3>
    <p class="subtitle">
      <span>{{ dataNewsInfo.add_time | dateFormat }}</span>
      <span>点击：{{ dataNewsInfo.click }}次</span>
    </p>
    <hr />
    <div class="content" v-html="dataNewsInfo.content"></div>
    <!-- 评论子组件 -->
    <comment :artid="id"></comment>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import comment from '../subcomponents/comment.vue'
export default {
  data() {
    return {
      id: this.$route.params.id,
      dataNewsInfo: {}
    }
  },
  created() {
    this.getNewsList()
  },
  methods: {
    getNewsList() {
      this.$http.get('api/getnew/' + this.id).then(result => {
        if (result.body.status !== 0) return Toast('err for newsinfo')
        this.dataNewsInfo = result.body.message[0]
      })
    }
  },
  components: {
    comment
  }
}
</script>

<style lang="scss" scoped>
.newsinfo-container {
  padding: 0 10px;
  .title {
    font-size: 16px;
    margin: 15px 0;
    text-align: center;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    color: cornflowerblue;
    font-size: 13px;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
