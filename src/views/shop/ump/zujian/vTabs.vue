<template>
  <el-tabs type="border-card">
    <el-tab-pane :label="label.name1">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="商品分类：">
          <el-select v-model="formInline.groupId" placeholder="选择商品分类" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.groupId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称：">
          <el-input v-model="formInline.title" placeholder="商品名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="商品信息">
          <template slot-scope="scope">{{ scope.row.product.title }}</template>
        </el-table-column>
        <el-table-column label="库存" width="120">
          <template slot-scope="scope">{{ scope.row.stockAmount }}</template>
        </el-table-column>
      </el-table>
      <v-pagination v-if="pagination.total !== 0" :pagination="pagination" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" />
    </el-tab-pane>
    <el-tab-pane :label="label.name2">
      <el-table
        ref="multipleTable2"
        :data="tableData2"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="">
          <template slot-scope="scope">{{ scope.row.product.title }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label=""
          width="120">
          <template slot-scope="scope">{{ scope.row.stockAmount }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label=""
          width="200">
          <template slot-scope="scope">
            <el-button size="small" @click="confirmEdit(scope.row)" type="danger" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { tree, shopProductList } from '../../server'

import vPagination from '../../pagination/pagination.vue'
export default {
  components: {
    vPagination
  },
  data() {
    return {
      formInline: {
        title: '',
        groupId: ''
      },
      options: [],
      tableData: [],
      tableData2: [],
      pagination: {
        total: 100,
        size: 10,
        page: 1,
        sizes: [10, 20, 50, 100]
      }
    }
  },
  props: ['label'],
  mounted() {
    this.getList()
    tree().then(res => this.options = res.data)
  },
  methods: {
    getList() {
      this.listLoading = false
      const params = this.formInline
      params['pageNum'] = this.pagination.page
      params['pageSize'] = this.pagination.size
      shopProductList(params).then(res => {
        this.pagination.total = res.total
        const items = res.data
        this.tableData = items
        this.listLoading = false
      }).catch(err => console.log(err))
    },
    handleSizeChange(val) {
      this.pagination.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.pagination.page = val
      this.getList()
    },
    handleSelectionChange(val) {
      this.tableData2 = val
    },
    confirmEdit(row) {
      this.$refs.multipleTable.toggleRowSelection(row)
      this.tableData2 = this.tableData2.filter(res => res.product.id !== row.product.id)
    },
    TableList() {
      return this.tableData2
    },
    onSubmit() {
      this.getList()
    }
  }
}
</script>

<style>

</style>
