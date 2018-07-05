<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="item in navlist" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
    </el-tabs>
    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange" ref="multipleTable">

      <el-table-column type="selection" width="35"></el-table-column>

      <el-table-column align="center" label="姓名" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
          <!-- <span>{{scope.row.id}}</span> -->
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机号码">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
          <!-- <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span> -->
        </template>
      </el-table-column>

      <el-table-column align="center" label="微信号/微信昵称">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>

      <el-table-column label="购次">
        <template slot-scope="scope">
          <span>{{ scope.row.artist_id }}</span>
          <!-- <svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon> -->
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="积分">
        <template slot-scope="scope">
          <span>{{ scope.row.artist_id }}</span>
          <!-- <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag> -->
        </template>
      </el-table-column>

      <el-table-column label="来源方式">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.country"></el-input>
            <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
          </template>
          <span v-else>{{ scope.row.country }}</span>
        </template>
      </el-table-column>

      <el-table-column label="客户身份">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.title"></el-input>
            <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
          </template>
          <span v-else>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">Ok</el-button>
          <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">Edit</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: '-1',
      navlist: [
        { name: '-1', label: '全部' },
        { name: '0', label: '待付款' },
        { name: '1', label: '待发货' },
        { name: '2', label: '已发货' },
        { name: '3', label: '已完成' },
        { name: '4', label: '已关闭' },
        { name: '5', label: '退款中' }
      ],
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
    this.getList(1)
  },
  methods: {
    handleClick(tab, event) {
      this.getList(tab.name)
      console.log(tab.name, event)
    },
    getList(id) {
      this.listLoading = true
      this.axios.get(`restserver/ting?method=baidu.ting.billboard.billList&type=${id}&size=10&offset=0`).then(res => {
        if (res.status === 200) {
          this.list = res.data.song_list
        }
        this.listLoading = false
      }).catch(err => console.log(err))
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
<style scoped>

</style>
