<template>
  <div class="photoinfo-container">
    <h3>{{ photoContentById.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoContentById.add_time | dateFormat }}</span>
      <span>点击：{{ photoContentById.click }} 次</span>
    </p>

    <hr />

    <!-- 缩略图 -->
    <div class="thumbs">
      <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
    </div>

    <!-- content -->
    <div class="content" v-html="photoContentById.content"></div>
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
      photoContentById: {},
      slide1: []
    }
  },
  created() {
    this.getPhotoContent()
    this.getPreview()
  },
  methods: {
    getPhotoContent() {
      this.$http.get('api/getimageInfo/' + this.id).then(result => {
        if (result.body.status !== 0) return Toast('err for photo info')
        this.photoContentById = result.body.message[0]
      })
    },
    getPreview() {
      this.$http.get('api/getthumimages/' + this.id).then(result => {
        if (result.body.status !== 0) return Toast('err for photo info')
        result.body.message.forEach(item => {
          item.w = 600
          item.h = 400
          item.msrc = item.src
        })
        this.slide1 = result.body.message
      })
    },
    handleClose() {}
  },
  components: {
    comment
  }
}
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    font-size: 16px;
    color: cornflowerblue;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  .thumbs {
    /deep/ .my-gallery {
      //deep深层作用选择器
      display: flex;
      flex-wrap: wrap; //默认换行
      figure {
        width: 30%;
        margin: 5px;
        img {
          width: 100%;
          box-shadow: 0 0 8px #999;
          margin: 4px;
        }
      }
    }
  }
}
</style>
