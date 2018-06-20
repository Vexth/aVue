<template>
  <div class="app-container">

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

      <el-table-column align="center" label="Actions" width="120">
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
      this.listLoading = true
      this.axios.get('shop1/wechat/productList?appId=wxdda83d03c2d1521c').then(response => {
        const items = response.data.data
        this.list = items
        this.listLoading = false
      })
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
