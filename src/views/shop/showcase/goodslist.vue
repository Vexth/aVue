<template>
  <div class="app-container">

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="商品名称或编码：">
        <el-input v-model="formInline.user" placeholder="商品名称或编码"></el-input>
      </el-form-item>
      <el-form-item label="商品分组：">
        <el-select v-model="formInline.region" placeholder="商品分组">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品类型：">
        <el-select v-model="formInline.region" placeholder="商品类型">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="指定车型：">
        <el-select v-model="formInline.region" placeholder="指定车型">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column width="180px" align="center" label="商品类目">
        <template slot-scope="scope">
          <span>{{scope.row.keyword}}</span>
        </template>
      </el-table-column> -->

      <el-table-column align="center" label="商品名称">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>

      <el-table-column width="400px" label="描述">
        <template slot-scope="scope">
          <span>{{ scope.row.brief }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="primary" @click='confirmEdit(scope.row)' size="small" icon="el-icon-edit">Edit</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'

export default {
  data() {
    return {
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      formInline: {
        user: '',
        region: ''
      }
    }
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
      this.listLoading = false
      // this.axios.get('shop1/wechat/productList?appId=wxdda83d03c2d1521c').then(response => {
      //   const items = response.data.data
      //   this.list = items
      //   this.listLoading = false
      // }).catch(err => console.log(err))
    },
    confirmEdit(row) {
      // GET /api/v1/wechat/productDetail
      // console.log(row.id)
      this.$router.push({ path: '/showcase/modifygoods', query: { id: row.id }})
      // row.edit = false
      // row.originalTitle = row.title
      // this.$message({
      //   message: 'The title has been edited',
      //   type: 'success'
      // })
    },
    onSubmit() {
      console.log('submit!')
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
