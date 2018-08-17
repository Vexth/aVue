<template>
  <div class="app-container">
    <el-button v-if="componentId !== 'list'" size="small" icon="el-icon-back" @click="go" style="margin-bottom: 1em;">返回上一页</el-button>
    <component :is="componentId" :couponSendType="couponSendType" @coupon="coupon"></component>
  </div>
</template>

<script>
import { couponEditResponse } from '../server'

import vCouponList from './coupon-list.vue'
import vCouponEdit from './coupon-edit.vue'
export default {
  data() {
    return {
      componentId: 'list',
      couponSendType: {}
    }
  },
  components: {
    'list': vCouponList,
    'edit': vCouponEdit
  },
  methods: {
    coupon(v) {
      this.couponSendType = v
      this.componentId = 'edit'
      // if (v !== '1' || v !== '2') {
      //   couponEditResponse({couponId: v.couponId}).then(res => res.code === 200 ? console.log(res) : console.log(res)).catch(err => console.log(err))
      // }
    },
    go() {
      this.componentId = 'list'
    }
  }
}
</script>

<style scoped>

</style>
