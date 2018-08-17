<template>
  <div class="app-container">
    <el-tabs type="border-card" @tab-click="tabClick">
      <el-tab-pane label="新建专题">
        <el-row :gutter="12">
          <el-col :span="8">
            <el-card shadow="never">
              <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="标题：">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="时间：">
                  <el-date-picker
                    v-model="ruleForm.time"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="缩略图：">
                  <v-zu-index :s="'share'" ref="ShareImage" @sub="ShareImage" @cha="ShareImage" />
                </el-form-item>
                <el-form-item label="正文：">
                  <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm(ruleForm)">上架</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="已上线专题">
        <v-table :index="'1'" />
      </el-tab-pane>
      <el-tab-pane label="下架专题">
        <v-table :index="'2'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import vZuIndex from '../showcase/zujian/zuindex.vue'
import vTable from './components/vTable.vue'

import { shopConfigList, shopConfigVisable, shopConfigSave } from '../server'
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        time: '',
        desc: '',
        img: {}
      }
    }
  },
  components: {
    vZuIndex, vTable
  },
  mounted() {
    this.list()
  },
  methods: {
    tabClick(targetName) {
      console.log(targetName.index)
    },
    list() {
      shopConfigList(6).then(res => console.log(res))
    },
    ShareImage(val) {
      this.ruleForm.img = val[0]
      this.$refs.hareImage.isBool()
    },
    submitForm(v) {
      // let list = {
      //   cellType: 6,
      //   cellLabel: this.ruleForm.name,
      //   navigateParam: this.ruleForm.minImg['id'],
      //   imageId: this.ruleForm.maxImg['id']
      // }
      // shopConfigSave(list).then(res => console.log(res))
    }
  }
}
</script>

<style scoped>

</style>
