<template>
  <div class="cmt-container">
    <h3>发表评论：</h3>
    <hr />
    <textarea
      placeholder="评论沙发即可拉伸大家都撒"
      maxlength="120"
      v-model="newcomment"
    ></textarea>
    <mt-button type="primary" size="large" @click="addComment">评论</mt-button>
    <div class="cmt-list">
      <div
        class="cmt-item"
        v-for="(item, i) in commentsData"
        :key="item.add_time"
      >
        <div class="cmt-title">
          第{{ i + 1 }}楼&nbsp;&nbsp;用户：{{
            item.user_name
          }}&nbsp;&nbsp;发布时间：{{ item.add_time | dateFormat }}
        </div>
        <div class="cmt-body">{{ item.content }}</div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="show"
      >加载更多</mt-button
    >
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      pageindex: 1,
      commentsData: [],
      newcomment: ''
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    getComments() {
      this.$http
        .get('api/getcomments/' + this.artid + '?pageindex=' + this.pageindex)
        .then(result => {
          if (result.body.status !== 0) return Toast('err')
          // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
          this.commentsData = this.commentsData.concat(result.body.message)
        })
      // console.log(this.artid)
      // console.log(this.$route.params.id)
    },
    show() {
      this.pageindex++
      this.getComments()
    },
    addComment() {
      if (this.newcomment.trim().length === 0) {
        return Toast('forbidden')
      }
      this.$http
        .post('api/postcomment/' + this.artid, {
          content: this.newcomment.trim()
        })
        .then(result => {
          if (result.body.status !== 0) return Toast('err')
          // 客户端无刷新 手动拼接数据
          var newcmt = {
            user_name: '匿名用户',
            add_time: Date.now(),
            content: this.newcomment.trim()
          }
          this.commentsData.unshift(newcmt)
          this.newcomment = ''
        })
    }
  },
  props: ['artid']
}
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 10px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        padding-left: 10px;
        line-height: 35px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
