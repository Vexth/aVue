<template>
  <div class="app-container">
    <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题：">
        <el-input style="width: 400px;" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="分享图：">
        <v-zu-index ref="ShareImage" @sub="ShareImage" @cha="ShareImage" />
      </el-form-item>
      <el-form-item label="正文：">
        <el-input type="textarea" style="width: 400px;" :autosize="{ minRows: 2 }" v-model="ruleForm.textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="submitForm(ruleForm)">上架</el-button>
        <el-button type="primary" :disabled="cellId === null"  @click="ConfigVisable(ruleForm)">下架</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import vZuIndex from '../showcase/zujian/zuindex.vue'

import { shopConfigList, shopConfigVisable, shopConfigSave } from '../server'
export default {
  data() {
    return {
      cellId: null,
      ruleForm: {
        name: '',
        textarea: '',
        img: []
      }
    }
  },
  components: {
    vZuIndex
  },
  methods: {
    ConfigList() {
      shopConfigList().then(res => {
        if (res.code === 200) {
          const data = res.data
          console.log(data)
          // this.cellId = data.cellId
          // this.selected = data['children'] === undefined ? [] : data['children']
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => console.log(err))
    },
    ShareImage(val) {
      this.ruleForm.img = val
    },
    ConfigVisable() {
      shopConfigVisable(this.cellId).then(res => this.list()).catch(err => console.log(err))
    },
    submitForm(v) {
      console.log(this.ruleForm)
    }
  }
}
</script>

<style>

</style>
