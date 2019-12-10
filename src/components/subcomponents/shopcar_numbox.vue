<template>
  <div>
    <div class="mui-numbox" data-numbox-min="1" style="height: 25px;">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input
        id="test"
        class="mui-input-numbox"
        type="number"
        :value="initcount"
        ref="numbox"
        @change="countChanged"
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
  },
  methods: {
    countChanged() {
      this.$store.commit('updateGoodslist', {
        id: this.goodsid,
        count: this.$refs.numbox.value
      })
    }
  },
  props: ['initcount', 'goodsid']
}
</script>

<style lang="scss" scoped></style>
