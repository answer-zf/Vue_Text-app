<template>
  <div class="app-container">
    <!-- header -->
    <mt-header fixed title="尚京vue项目">
      <span slot="left" @click="goback" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>

    <!-- router-view -->
    <transition>
      <router-view></router-view>
    </transition>

    <!-- tabbar -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-zf" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-zf" to="/member">
        <span class="mui-icon mui-icon-contact"> </span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-zf" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">
            {{ $store.getters.optCount }}
          </span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-zf" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false
    }
  },
  created() {
    this.flag = this.$route.path === '/home' ? false : true
  },
  methods: {
    goback() {
      this.$router.go(-1)
    }
  },
  watch: {
    '$route.path': function(newVal) {
      if (newVal === '/home') {
        this.flag = false
      } else {
        this.flag = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mint-header {
  z-index: 99;
}
.app-container {
  padding-top: 40px;
  overflow-x: hidden;
  padding-bottom: 50px;
}
.v-enter {
  transform: translateX(100%);
  opacity: 0;
}
.v-leave-to {
  transform: translateX(-100%);
  opacity: 0;
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.6s ease;
}
.mui-bar-tab .mui-tab-item-zf.mui-active {
  color: #007aff;
}
.mui-bar-tab .mui-tab-item-zf {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}
.mui-bar-tab .mui-tab-item-zf .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-zf .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
