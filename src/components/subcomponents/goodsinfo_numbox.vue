<template>
  <div>
    <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="quantity">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input
        id="test"
        class="mui-input-numbox"
        type="number"
        value="1"
        @change="countChanged"
        ref="numbox"
      />
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
  mounted() {
    mui('.mui-numbox').numbox()
    console.log(this.quantity)
  },
  methods: {
    countChanged() {
      this.$emit('getCount', parseInt(this.$refs.numbox.value))
    }
  },
  props: ['quantity'],
  watch: {
    // 由于异步获取数据的原因，需要监听值的改变来动态更新最大值。
    quantity: newVal => {
      mui('.mui-numbox')
        .numbox()
        .setOption('max', newVal)
    }
  }
}
</script>

<style lang="scss" scoped></style>
