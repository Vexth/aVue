<template>
  <div class="app-container">

    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%" ref="multipleTable">

      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="姓名" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="手机号码">
        <template slot-scope="scope">
          <span>{{scope.row.phoneNum}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="QQ">
        <template slot-scope="scope">
          <span>{{scope.row.qqnum}}</span>
        </template>
      </el-table-column>

      <el-table-column label="咨询项目">
        <template slot-scope="scope">
          <p v-for="(v, i) in scope.row.advisoryGroup" :key="i">{{ v }}</p>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="留言">
        <template slot-scope="scope">
          <span>{{ scope.row.message }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" label="我方备注">
        <template slot-scope="scope">
          <template v-if="scope.row.id === id">
            <el-input class="edit-input" size="small" v-model="scope.row.remark"></el-input>
            <!-- <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">刷新</el-button> -->
          </template>
          <span v-else>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.id === id" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">确认</el-button>
          <el-button v-else type="primary" @click='edit(scope.row)' size="small" icon="el-icon-edit">修改</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { advisoryFind, advisoryRemark } from '../server'
export default {
  data() {
    return {
      id: null,
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.advisoryFind()
  },
  methods: {
    advisoryFind() {
      advisoryFind().then(res => {
        res.code === 200 ? this.list = res.data : console.log(res)
        this.listLoading = false
      }).catch(err => console.log(err))
    },
    edit(row) {
      this.id = row.id
    },
    confirmEdit(row) {
      this.id = null
      // row.originalTitle = row.title
      const list = {
        advisoryId: row.id,
        remark: row.remark === null ? '' : row.remark
      }
      advisoryRemark(list).then(res => {
        if (res.code === 200) {
          this.advisoryFind()
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          console.log(res)
        }
      }).catch(err => console.log(err))
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
p {
  margin: 0;
}
</style>
