<template>
  <el-table :showHeader='list===null ? false : true' :data="list" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange" ref="multipleTable">
    <el-table-column type="selection" width="35"></el-table-column>

    <!-- <el-table-column v-for="" :align="center" :label="label" width="80">
      <template slot-scope="scope">
        <span>{{scope.row.id}}</span>
      </template>
    </el-table-column> -->

    <!-- <el-table-column align="center" label="活动名称" width="80">
      <template slot-scope="scope">
        <span>{{scope.row.id}}</span>
      </template>
    </el-table-column>

    <el-table-column width="180" align="center" label="有效时间">
      <template slot-scope="scope">
        <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
      </template>
    </el-table-column>

    <el-table-column width="140" align="center" label="活动标签">
      <template slot-scope="scope">
        <span>{{scope.row.author}}</span>
      </template>
    </el-table-column>

    <el-table-column width="100" label="活动状态">
      <template slot-scope="scope">
        <svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>
      </template>
    </el-table-column>

    <el-table-column class-name="status-col" label="订单实付金额" width="110">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column min-width="300px" label="付款订单数">
      <template slot-scope="scope">
        <template v-if="scope.row.edit">
          <el-input class="edit-input" size="small" v-model="scope.row.title"></el-input>
          <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
        </template>
        <span v-else>{{ scope.row.title }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="300px" label="付款人数">
      <template slot-scope="scope">
        <template v-if="scope.row.edit">
          <el-input class="edit-input" size="small" v-model="scope.row.title"></el-input>
          <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
        </template>
        <span v-else>{{ scope.row.title }}</span>
      </template>
    </el-table-column> -->

    <el-table-column align="center" label="操作" width="120">
      <template slot-scope="scope">
        <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">Ok</el-button>
        <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">Edit</el-button>
      </template>
    </el-table-column>

  </el-table>
</template>

<script>
import { fetchList } from '@/api/article'
export default {
  name: 'list',
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
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
    }
  }
}
</script>

<style>

</style>