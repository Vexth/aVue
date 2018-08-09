<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%" ref="multipleTable">
      <el-table-column align="center" label="会员套餐卡ID" >
        <template slot-scope="scope">
          <span>{{scope.row.packageId}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="会员套餐卡名称">
        <template slot-scope="scope">
          <span class="span" @click="addTab(scope.row)">{{scope.row.packageName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="会员套餐卡持有人ID">
        <template slot-scope="scope">
          <span>{{scope.row.userId}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="会员套餐卡持有人昵称" >
        <template slot-scope="scope">
          <span>{{scope.row.nickName}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="会员套餐卡持有人联系电话" >
        <template slot-scope="scope">
          <span>{{scope.row.mobilePhone}}</span>
        </template>
      </el-table-column>

    </el-table>
    <v-pagination :pagination="pagination" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" />

    <el-dialog title="" width="80%" :visible.sync="outerVisible">
      <el-dialog
        width="30%"
        title="备注"
        :visible.sync="innerVisible"
        append-to-body>
        <el-form ref="form" label-width="100px">
          <el-form-item label="操作备注：">
            <el-input type="textarea" v-model="vendorRemark" placeholder="填写操作备注后方可保存修改内容"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="sub">保存</el-button>
        </div>
      </el-dialog>
      <div>
        <p>会员ID：{{nickList.userId}} &nbsp;&nbsp;&nbsp;&nbsp; 会员昵称：{{nickList.nickName}}</p>
        <div class="cont">
          <div class="size">
            <p>{{nickList.packageName}}</p>
            <el-table
              :data="nickList.packageItemList"
              border
              style="width: 100%">
              <el-table-column
                prop="itemName"
                label="服务项目"
                align="center">
              </el-table-column>
              <el-table-column
                prop="itemRemainingTimes"
                label="剩余次数"
                align="center">
                <template slot-scope="scope">
                  <span v-if="isTimes !== scope.row.itemId">{{scope.row.itemRemainingTimes}}</span>
                  <el-input v-else v-model="scope.row.itemRemainingTimes" placeholder="请输入内容" style="width: 200px;"></el-input>
                  <i @click="isTimes !== scope.row.itemId ? clickTimes(scope.row) : clickTimes({})" :class="isTimes !== scope.row.itemId ? 'el-icon-edit-outline' : 'el-icon-circle-check'"></i>
                </template>
              </el-table-column>
            </el-table>
            <el-button type="primary" style="margin-top: 15px;" @click="innerVisible = true">保存</el-button>
          </div>
          <div class="size">
            <p>修改记录</p>
            <div v-for="(item, i) in nickList.operationLogList" :key="i" class="list listName">
              <p>修改时间：{{item.createTime}}</p>
              <p>操作人员：{{item.operatorUser}}</p>
              <p>修改内容：{{item.operatorContent}}</p>
              <!-- <p style="display: inline-block;width: 100%;min-height: 30px;">
                <span style="float: left;">修改内容：</span>
                <ul style="float: left;margin: 0;list-style-type: none;padding: 0;">
                  <li v-for="(items, i) in item.itemList" :key="i">{{items.userPackageItemName}}(数量×{{items.amount}})</li>
                </ul>
              </p> -->
              <p>操作备注：{{item.operatorRemark}}</p>
            </div>
            <!-- {{nickList.operationLogList}} -->
          </div>
          <div class="size">
            <p>服务历史记录</p>
            <div v-for="(item, i) in nickList.reservationList" :key="i" class="list">
              <div>
                <p>服务时间：{{item.createTime}}</p>
                <p>所属套餐：{{item.userPackageName}}</p>
                <p class="p">
                  <span>服务项目：</span>
                  <ul>
                    <li v-for="(items, i) in item.itemList" :key="i">{{i+1}}. {{items.userPackageItemName}}(数量×{{items.amount}})</li>
                  </ul>
                </p>
                <p>服务车辆：{{item.userRemark}}</p>
                <p v-if="item.reservationStatus === 0">服务状态：用户确认服务完成</p>
                <p v-if="item.reservationStatus === 1">服务状态：预约已提交</p>
                <p v-if="item.reservationStatus === 2">服务状态：预约已确认</p>
                <p v-if="item.reservationStatus === 3">服务状态：预约已取消</p>
                <p v-if="item.reservationStatus === 4">服务状态：商家确认服务完成</p>
                <!-- 1:预约已提交  2:预约已确认   3:预约已取消   4:商家确认服务完成   0:用户确认服务完成 -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { shopUserPackageList, shopUserPackageDetail, shopUserPackageModify } from '../server'
import vPagination from '../pagination/pagination.vue'

export default {
  data() {
    return {
      vendorRemark: '',
      isTimes: null,
      nickList: {},
      outerVisible: false,
      innerVisible: false,
      pagination: {
        total: null,
        size: 10,
        page: null,
        sizes: [10, 20, 50, 100]
      },
      itemRow: {},
      tableData: [],
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  components: {
    vPagination
  },
  created() {
    this.PackageList()
  },
  methods: {
    PackageList() {
      shopUserPackageList().then(res => {
        if (res.code === 200) {
          this.listLoading = false
          this.list = res.data
        } else {
          console.log(res)
        }
      }).catch(err => console.log(err))
    },
    PackageDetail(v) {
      shopUserPackageDetail(v).then(res => res.code === 200 ? this.nickList = res.data : console.log(res)).catch(err => console.log(err))
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    clickTimes(row) {
      this.isTimes = row['itemId']
      // console.log(row)
    },
    addTab(row) {
      this.nickList = []
      this.outerVisible = true
      this.itemRow = row
      this.PackageDetail(row)
    },
    sub() {
      if (this.vendorRemark === '') {
        this.$message.error('请填写操作备注！')
        return
      }
      const list = {
        packageId: this.nickList.packageId,
        userId: this.nickList.userId,
        itemList: this.nickList.packageItemList,
        vendorRemark: this.vendorRemark
      }
      // console.log(list)
      shopUserPackageModify(list).then(res => {
        if (res.code === 200) {
          console.log(res)
          this.PackageDetail(this.itemRow)
          this.innerVisible = false
        } else {
          console.log(res)
        }
      }).catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
i {
  cursor: pointer;
}
p {
  margin: 0;
  padding: 0;
  line-height: 55px;
  font-size: 16px;
}
.span{
  color: rgb(64, 158, 255);
  cursor: pointer;
}

.cont {
  min-height: 200px;
  display: flex;
}
.cont .size {
  width: 33%;
  border: 1px solid #ebeef5;
  margin-left: 10px;
  padding-bottom: 10px;
}
.cont .size p {
  line-height: 55px;
  font-size: 18px;
  border-bottom: 1px solid #ebeef5;
  text-align: center;
}
.cont .size:nth-child(1) {
  border: 0;
  margin-left: 0;
  text-align: center;
}
.cont .size:nth-child(1) p {
  border: 1px solid #ebeef5;
  border-bottom: 0;
}

.list {
  padding: 10px;
  background: #f2f2f2;
  width: 95%;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 5px;
}
.cont .list p {
  font-size: 14px;
  line-height: 30px;
  text-align: left;
}
.cont .list div{
  padding: 10px;
  background: #fff;
  border-radius: 5px;
}

p.p{
  display: inline-block;
  width: 100%;
  min-height: 30px;
}
p.p span {
  float: left;
}
p.p ul {
  float: left;
  margin: 0;
  list-style-type: none;
  padding: 0;
}
</style>
