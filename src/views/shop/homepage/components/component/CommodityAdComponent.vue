<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="商品名称：">
        <el-input v-model="formInline.title" placeholder="商品名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="商品分组：">
        <el-select v-model="formInline.groupId" placeholder="商品分组" clearable>
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.groupId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" border fit highlight-current-row style="width: 100%" tooltip-effect="dark" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="45"></el-table-column>

      <el-table-column align="center" label="图片" width="80">
        <template slot-scope="scope">
          <img :src="scope.row.product.imgDescList[0].url" alt="" srcset="">
        </template>
      </el-table-column>

      <el-table-column align="center" label="商品ID">
        <template slot-scope="scope">
          <span :title="scope.row.product.id" style="text-align: left;display: inline-block;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.product.id}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="商品">
        <template slot-scope="scope">
          <span :title="scope.row.product.title" style="text-align: left;display: inline-block;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.product.title}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="价格">
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="库存">
        <template slot-scope="scope">
          <span>{{scope.row.stockAmount}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

    </el-table>
    <v-pagination v-if="pagination.total !== 0" :pagination="pagination" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></v-pagination>
  </div>
</template>

<script>
import { tree, shopProductList } from '../../../server'

import vPagination from '@/views/shop/pagination/pagination.vue'
export default {
  components: {
    vPagination
  },
  data() {
    return {
      SelectionChange: [],
      list: [],
      options: [],
      formInline: {
        title: '',
        groupId: '',
      },
      pagination: {
        total: 0,
        size: 10,
        page: 1,
        sizes: [10, 20, 50, 100]
      }
    }
  },
  mounted() {
    this.getList()
    this.getGroupOption()
  },
  methods: {
    getGroupOption() {
      // // GET /api/v1/shop/product/group/tree
      tree().then(res => res.code === 200 ? this.options = res.data : console.log(res)).catch(err => console.log(err))
    },
    getList() {
      const params = this.formInline
      params['pageNum'] = this.pagination.page
      params['pageSize'] = this.pagination.size
      shopProductList(params).then(res => {
        this.pagination.total = res.total
        const items = res.data
        this.list = items
      }).catch(err => console.log(err))
    },
    handleSelectionChange(item) {
      this.SelectionChange = item
    },
    sub() {
      return this.SelectionChange
    },
    handleSizeChange(val) {
      this.pagination.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.pagination.page = val
      this.getList()
    },
    onSubmit() {
      this.getList()
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
}
</style>
