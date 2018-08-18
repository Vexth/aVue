<template>
  <div class="app-container">
    <el-tabs type="border-card" @tab-click="tabClick">
      <el-tab-pane label="新建专题">
        <el-row :gutter="12">
          <el-col :span="8">
            <el-card shadow="never">
              <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="标题：">
                  <el-input v-model="ruleForm.cellLabel"></el-input>
                </el-form-item>
                <el-form-item label="时间：">
                  <el-date-picker
                    v-model="ruleForm.time_var1"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="缩略图：">
                  <v-zu-index ref="ShareImage" @sub="ShareImage" @cha="ShareImage" />
                </el-form-item>
                <el-form-item label="正文：">
                  <el-input type="textarea" v-model="ruleForm.str_var2"></el-input>
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
        <v-table :index="'1'" :tableData="ShelfList" @isClick="isClick" />
      </el-tab-pane>
      <el-tab-pane label="下架专题">
        <v-table :index="'2'" :tableData="ObtainedList" @isClick="isClick" @danger="danger" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import vZuIndex from '../showcase/zujian/zuindex.vue'
import vTable from './components/vTable.vue'

import formatDate from '../timeToString.js'
import { shopConfigList, shopConfigVisable, shopConfigSave, shopConfigDelete } from '../server'
export default {
  data() {
    return {
      ShelfList: [],
      ObtainedList: [],
      ruleForm: {
        navigateType: -1,
        parentId: null,
        cellType: 9,
        isShow: 0,
        cellLabel: '',
        time_var1: '',
        str_var2: '',
        img: [],
        int_arr1: []
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
      this.ShelfList = []
      this.ObtainedList = []
      shopConfigList({cellType: this.ruleForm.cellType}).then(res => {
        const list = res.data
        this.ruleForm.parentId = list.cellId
        this.ruleForm.cellType = list.cellType
        if (list.children !== undefined) {
          list.children.map(res => res.isShow === 1 ? this.ObtainedList.push(res) : this.ShelfList.push(res))
        }
      })
    },
    ShareImage(val) {
      this.ruleForm.img = val
    },
    isClick(v) {
      shopConfigVisable({cellId: v}).then(res => this.list()).catch(err => console.log(err))
    },
    danger(v) {
      shopConfigDelete({cellId: v}).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.list()
      }).catch(err => console.log(err))
    },
    submitForm(v) {
      if (v.cellLabel === '') {
        this.$message.error('请填写标题！')
        return
      }
      if (v['img'] === undefined) {
        this.$message.error('请选择分享图！')
        return
      }
      if (v.str_var2 === '') {
        this.$message.error('请填写正文！')
        return
      }
      v['img'].map(res => v.int_arr1.push(res.id))
      delete v['img']

      v.time_var1 = formatDate(v.time_var1)

      shopConfigSave(v).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.$refs.ShareImage.boolList()
        this.ruleForm = {
          navigateType: -1,
          parentId: null,
          cellType: 9,
          isShow: 0,
          cellLabel: '',
          time_var1: '',
          str_var2: '',
          img: [],
          int_arr1: []
        }
        this.list()
      }).catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>
