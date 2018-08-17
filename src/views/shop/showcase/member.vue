<template>
  <div class="app-container">

    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%" ref="multipleTable">
      <el-table-column align="center" label="预约号ID" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.reservationId}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" align="center" label="预约申请时间">
        <template slot-scope="scope">
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>

      <el-table-column width="300" align="center" label="客户/电话">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}/{{scope.row.userPhone}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="申请项目内容">
        <template slot-scope="scope">
          <el-table
            :data="scope.row.itemList"
            border
            style="width: 100%">
            <el-table-column
              prop="userPackageItemId"
              label="ID"
              width="180" align="center">
            </el-table-column>
            <el-table-column
              prop="userPackageItemName"
              label="服务项目"
              width="180" align="center">
            </el-table-column>
            <el-table-column
              prop="amount"
              label="数量"
              width="180" align="center">
              <template slot-scope="scope">
                <i class="el-icon-remove" @click="remove(scope.row)"></i>
                <span>{{scope.row.amount}}</span>
                <i class="el-icon-circle-plus" @click="plus(scope.row)"></i>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="del(scope.row)" icon="el-icon-delete">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="服务车辆" width="110">
        <template slot-scope="scope">
          <span>{{scope.row.userRemark}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="更多" width="120">
        <template slot-scope="scope">
          <el-button type="primary" @click='edit(scope.row)' size="mini">查看更多</el-button>
        </template>
      </el-table-column>

      <el-table-column width="110" align="center" label="状态">
        <template slot-scope="scope">
          <div v-if="scope.row.reservationStatus === 1">
            <span>预约已提交</span>
            <el-button style="margin-top: 5px;margin-bottom: 8px;" type="primary" size="mini" @click="yueQuery(scope.row)">预约确认</el-button>
            <el-button style="margin-left: 0px;" size="mini" @click="quexiao(scope.row)">预约取消</el-button>
          </div>
          <div v-else-if="scope.row.reservationStatus === 2">
            <span>预约已确认</span>
            <el-button style="margin-top: 5px;margin-bottom: 8px;" type="primary" size="mini" @click="completion(scope.row)">服务完成</el-button>
            <el-button style="margin-left: 0px;" size="mini" @click="quexiao">预约取消</el-button>
          </div>
          <div v-else-if="scope.row.reservationStatus === 3">
            <span>预约已取消</span>
          </div>
          <div v-else-if="scope.row.reservationStatus === 4">
            <span>商家确认服务完成</span>
          </div>
          <div v-else-if="scope.row.reservationStatus === 0">
            <span>用户确认服务完成</span>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <v-pagination v-if="pagination.total !== 0" :pagination="pagination" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" />

    <el-dialog title="更多详情" :visible.sync="dialogFormVisible" :before-close="beforeClose">
      <el-form :model="form">
        <el-form-item label="服务项目所属套餐：" :label-width="formLabelWidth">
          <span>{{form.userPackageName}}</span>
        </el-form-item>
        <el-form-item label="备注：" :label-width="formLabelWidth">
          <el-input v-model="form.vendorRemark" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="预约服务时间：" :label-width="formLabelWidth">
          <el-date-picker
            v-model="value"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="beforeClose">取 消</el-button>
        <el-button type="primary" @click="sub">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reservationList, itemDecrease, itemDelete, itemIncrease, modifyRemark, modifyStatus } from '../server'
import formatDate from '../timeToString.js'
import vPagination from '../pagination/pagination.vue'

export default {
  data() {
    return {
      pagination: {
        total: 100,
        size: 10,
        page: 1,
        sizes: [10, 20, 50, 100]
      },
      visible2: false,
      dialogFormVisible: false,
      form: {
        reservationId: null,
        userPackageName: '',
        vendorRemark: '',
        appointmentServiceTimeBegin: '',
        appointmentServiceTimeEnd: ''
      },
      formLabelWidth: '140px',
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value: [],
      list: null,
      listLoading: true
    }
  },
  components: {
    vPagination
  },
  created() {
    this.dataList()
  },
  methods: {
    pClick(title) {
      return new Promise(resolve => {
        this.$confirm(`${title}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resolve()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消!'
          })
        })
      }, reject => reject)
    },
    pRes(res, title) {
      if (res.code === 200) {
        this.$message({
          type: 'info',
          message: `${title}成功`
        })
        this.dataList()
      } else {
        console.log(res)
      }
    },
    dataList() {
      let list = {
        pageNum: this.pagination.page,
        pageSize: this.pagination.size
      }
      reservationList(list).then(res => {
        if (res.code === 200) {
          this.list = res.data
          const total = res.data.length
          this.pagination.total = total
          this.pagination.page = 1
        } else {
          console.log(res)
        }
        this.listLoading = false
      }).catch(err => console.log(err))
    },
    edit(v) {
      this.form.reservationId = v.reservationId
      this.form.userPackageName = v.userPackageName
      this.form.vendorRemark = v.vendorRemark
      if (v.appointmentServiceTimeBegin === undefined && v.appointmentServiceTimeEnd === undefined) {
        this.value = []
      } else {
        this.value = [v.appointmentServiceTimeBegin, v.appointmentServiceTimeEnd]
      }
      this.dialogFormVisible = true
    },
    beforeClose() {
      this.dialogFormVisible = false
      this.value = []
    },
    remove(v) {
      this.pClick('此操作会减少服务数量').then(res => itemDecrease(v).then(res => this.pRes(res, '减少')).catch(err => console.log(err)))
    },
    plus(v) {
      this.pClick('此操作会增加服务数量').then(res => itemIncrease(v).then(res => this.pRes(res, '增加')).catch(err => console.log(err)))
    },
    del(v) {
      this.pClick('此操作会删除服务数量').then(res => itemDelete(v).then(res => this.pRes(res, '删除')).catch(err => console.log(err)))
    },
    yueQuery(v) {
      const list = {
        reservationId: v.reservationId,
        statusCode: 2
      }
      this.pClick('预约确认').then(() => modifyStatus(list).then(res => this.pRes(res, '预约确认')).catch(err => console.log(err)))
    },
    completion(v) {
      const list = {
        reservationId: v.reservationId,
        statusCode: 4
      }
      this.pClick('服务完成').then(() => modifyStatus(list).then(res => this.pRes(res, '服务完成')).catch(err => console.log(err)))
    },
    quexiao(v) {
      const list = {
        reservationId: v.reservationId,
        statusCode: 3
      }
      this.pClick('预约取消').then(() => modifyStatus(list).then(res => this.pRes(res, '预约取消')).catch(err => console.log(err)))
    },
    sub() {
      if (this.form.vendorRemark === '') {
        this.$message.error('请填写备注！')
        return
      }
      if (this.value.length === 0) {
        this.$message.error('请选择服务开始与结束时间！')
        return
      }
      this.form.appointmentServiceTimeBegin = Object.prototype.toString.call(this.value[0]) === '[object Date]' ? formatDate(this.value[0]) : this.value[0]
      this.form.appointmentServiceTimeEnd = Object.prototype.toString.call(this.value[1]) === '[object Date]' ? formatDate(this.value[1]) : this.value[1]
      delete this.form.userPackageName

      modifyRemark(this.form).then(res => {
        this.pRes(res, '修改备注')
        this.dialogFormVisible = false
      }).catch(err => console.log(err))
    },
    handleSizeChange(val) {
      this.pagination.size = val
      this.dataList()
    },
    handleCurrentChange(val) {
      this.pagination.page = val
      this.dataList()
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
.el-icon-remove, .el-icon-circle-plus {
  cursor: pointer;
}
</style>
