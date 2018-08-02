<template>
  <div style="padding: 10px;">
    <!-- <el-row :gutter="20" style="background-color: red;">
      <el-col :span="6"><div class="bg-purple"></div></el-col>
      <el-col :span="6"><div class="bg-purple"></div></el-col>
      <el-col :span="6"><div class="bg-purple"></div></el-col>
      <el-col :span="6"><div class="bg-purple"></div></el-col>
    </el-row> -->
    <!-- <p>此模块暂不开放</p> -->
    <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
      <el-step title="商品类型" >1</el-step>
      <el-step title="基本信息" >2</el-step>
      <el-step title="价格库存" >3</el-step>
      <el-step title="其他信息" >4</el-step>
    </el-steps>
    <component :is="componentId" @ac="ac"></component>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  </div>
</template>

<script>
import vA1 from './a1.vue'
import vA2 from './a2.vue'
export default {
  data() {
    return {
      activeList: ['vA1', 'vA2'],
      active: 1,
      componentId: 'vA1'
    }
  },
  components: {
    vA1, vA2
  },
  methods: {
    next() {
      this.componentId = 'vA2'
      if (this.active++ > 2) {
        this.active = 1
        this.componentId = 'vA1'
      }
    },
    ac(val) {
      alert(val)
    }
  }
}
</script>

<style scoped>
.bg-purple {
  min-height: 36px;
  background-color: red;
}
</style>
