<template>
  <div class="app-container">
    <el-button v-if="componentId !== 'list'" size="small" icon="el-icon-back" @click="go" style="margin-bottom: 1em;">返回上一页</el-button>
    <component :is="componentId" @coupon="coupon"></component>
  </div>
</template>

<script>
import { couponEditResponse } from '../server'

import vCouponList from './coupon-list.vue'
import vCouponEdit from './coupon-edit.vue'
import vCouponEdit1 from './coupon-edit1.vue'
export default {
  data() {
    return {
      componentId: 'list'
    }
  },
  components: {
    'list': vCouponList,
    'edit': vCouponEdit,
    'edit1': vCouponEdit1
  },
  methods: {
    coupon(v) {
      this.componentId = v.couponId === undefined ? 'edit' : 'edit1'
    },
    go() {
      this.componentId = 'list'
    }
  }
}
</script>

<style scoped>

</style>
