<template>
  <div class="app-container">
    <el-tabs type="border-card" @tab-click="tabClick">
      <el-tab-pane label="新建专题" >
        <v-home-img ref="vHomeImg" @submitForm="submitForm" :listData="listData1" />
      </el-tab-pane>
      <el-tab-pane label="已上线专题">
        <v-table :tableData="ShelfList" :index="'1'" @isClick="click" />
      </el-tab-pane>
      <el-tab-pane label="下架专题">
        <v-table :tableData="ObtainedList" :index="'2'" @isClick="click" @danger="danger" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import vHomeImg from './components/vhomeImg.vue'
import vTable from './components/vTable.vue'

import { shopConfigList, shopConfigVisable, shopConfigSave, shopConfigDelete } from '../server'
export default {
  data() {
    return {
      listData1: {},
      listData: {},
      dialogVisible: false,
      ShelfList: [],
      ObtainedList: [],
      ruleForm: {
        navigateType: -1,
        parentId: null,
        cellType: null,
        isShow: 1
      }
    }
  },
  components: {
    vHomeImg, vTable
  },
  mounted() {
    this.list()
  },
  methods: {
    list() {
      this.ShelfList = []
      this.ObtainedList = []
      shopConfigList(6).then(res => {
        const list = res.data
        this.ruleForm.parentId = list.cellId
        this.ruleForm.cellType = list.cellType
        if (list.children.length > 0) {
          list.children.map(res => res.isShow === 0 ? this.ObtainedList.push(res) : this.ShelfList.push(res))
        }
      })
    },
    tabClick() {
      this.listData = {}
    },
    click(v) {
      shopConfigVisable(v).then(res => this.list()).catch(err => console.log(err))
    },
    danger(v) {
      shopConfigDelete(v).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.list()
      }).catch(err => console.log(err))
    },
    // primary(v) {
    //   this.dialogVisible = true
    //   this.listData = v
    // },
    handleClose() {
      this.$confirm('确认关闭？').then(_ => {
        this.dialogVisible = false
        done()
      }).catch(_ => {})
    },
    submitForm(v) {
      let list = {...this.ruleForm, ...v}
      shopConfigSave(list).then(res => {
        if (res.code === 200) {
          this.$refs.vHomeImg.isList()
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.list()
        } else {
          console.log(res)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
