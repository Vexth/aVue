<template>
  <div>
    <p>{{row['couponStatus'] === 0 ? '已结束' : '进行中'}}</p>
    <p class="p" v-if="row['couponStatus'] !== 0">
      <a>推广</a>
      <a @click="response(row)">编辑</a>
      <a @click="show(row)">停止发放</a>
    </p>
  </div>
</template>

<script>
export default {
  props: ['row'],
  methods: {
    show(v) {
      this.$emit('show', v)
    },
    response(v) {
      this.$emit('response', v)
    }
  }
}
</script>

<style scoped>
.p {color: #409EFF;}
</style>
