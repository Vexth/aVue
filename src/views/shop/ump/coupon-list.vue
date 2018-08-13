<template>
  <div>
    <p class="p">新建优惠券</p>
    <p>
      <el-button type="primary" size="small" plain @click="primary">全平台（店铺）优惠券</el-button>
      <el-button type="success" size="small" plain @click="success">商品优惠券</el-button>
    </p>
    <p class="p">管理优惠券</p>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="优惠券名称：">
        <el-input v-model="formInline.user" placeholder="优惠券名称"></el-input>
      </el-form-item>
      <el-form-item label="优惠券状态：">
        <el-select v-model="formInline.region" placeholder="优惠券状态">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优惠券类别：">
        <el-select v-model="formInline.region" placeholder="优惠券类别">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" v-loading.body="listLoading" border fit style="width: 100%" >

      <el-table-column align="center" label="优惠券名称" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="类型">
        <template slot-scope="scope">
          <!-- <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span> -->
          {{scope.row.status}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="优惠内容">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="已领取/剩余">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="已使用" align="center" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="支付金额">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="客单价">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态/操作" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
          <p>
            <a>推广</a>
            <a>编辑</a>
            <a>停止发放</a>
          </p>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
export default {
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      list: null,
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
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    primary() {
      this.$emit('coupon', '子组件primary')
    },
    success() {
      this.$emit('coupon', '子组件success')
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style scoped>
.p {
  background: #cccccc4f;
  margin: 0;
  padding: 1em;
  margin-bottom: 1em;
}
p a {
  color: #409EFF;
}
</style>
