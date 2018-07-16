<template>
  <div class="app-container">
    <el-button type="primary" @click="DialogVisible = true" size="small" icon="el-icon-edit">新增一级分类</el-button>
    <el-button type="primary" size="small" icon="el-icon-edit">新增二级分类</el-button>
    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%; margin-top: 20px;" @selection-change="handleSelectionChange" ref="multipleTable">

      <el-table-column align="center" label="一级分组">
        <template slot-scope="scope">
          <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">修改</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog
      title="修改"
      :visible.sync="DialogVisible"
      width="50%"
      center>
      <v-dialog-img ref="DialogImg" :isTrue="isTrue" :selected="selected" :selectedImgList="selectedImgList" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sub">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'

import vDialogImg from '../showcase/dialogImg.vue'

export default {
  data() {
    return {
      selected: [],
      selectedImgList: [],
      isTrue: false,
      DialogVisible: false,
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  components: {
    vDialogImg
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        const items = response.data.items
        this.list = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html

          v.originalTitle = v.title //  will be used when user click the cancel botton

          return v
        })
        this.listLoading = false
      })
    },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    sub() {
      this.selectedImgList = this.$refs.DialogImg.tpSub()
      console.log(this.selectedImgList)
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
