<template>
  <div>
    <comment :artid="this.$route.params.id"></comment>
  </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
export default {
  components: {
    comment
  }
}
</script>

<style lang="scss" scoped></style>
