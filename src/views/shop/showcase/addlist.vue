<template>
  <div class="app-container">
    <el-steps :active="active" finish-status="success" simple style="margin-bottom: 20px">
      <el-step title="基本信息" ></el-step>
      <el-step title="商品信息" ></el-step>
    </el-steps>
    <component :is="componentId" @next="next" @onSubmit="onSubmit"></component>
  </div>
</template>

<script>
import { productCreate } from '../server'
import vGoodsInfo from './goodsinfo.vue'
import vInfoList from './infolist.vue'
export default {
  data() {
    return {
      active: 1,
      componentId: 'vGoodsInfo',
      list: {
        product: {},
        skuList: []
      }
    }
  },
  components: {
    vGoodsInfo, vInfoList
  },
  methods: {
    next(str, val, item) {
      this.list[str] = val
      this.active = item.id
      this.componentId = item.v
    },
    onSubmit(val) {
      this.list.product = {...this.list.product, ...val.product}
      this.list.skuList = val.skuList
      if (val['suite'] !== undefined) {
        this.list['suite'] = val['suite']
        this.list['itemList'] = val['itemList']
      }
      productCreate(this.list).then(res => {
        sessionStorage.removeItem("list")
        res.code === 200 ? this.$router.push('/showcase/goodslist') : console.log(res)
      }).catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>
