<template>
  <div>
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="item in sliderdata" :key="item.img">
        <img :src="item.img" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  props: ['sliderdata']
}
</script>

<style lang="scss" scoped></style>
