<template>
  <div class="app-container">
    <el-button v-if="componentId !== 'list'" size="small" icon="el-icon-back" @click="go" style="margin-bottom: 1em;">返回上一页</el-button>
    <component :is="componentId" @coupon="coupon"></component>
  </div>
</template>

<script>
import vCouponList from './coupon-list.vue'
import vCouponEdit from './coupon-edit.vue'
export default {
  data() {
    return {
      componentId: 'list'
    }
  },
  components: {
    'list': vCouponList,
    'edit': vCouponEdit
  },
  methods: {
    coupon(v) {
      this.componentId = 'edit'
      console.log('偶是父组件哇')
      console.log(v)
    },
    go() {
      this.componentId = 'list'
    }
  }
}
</script>

<style scoped>

</style>
