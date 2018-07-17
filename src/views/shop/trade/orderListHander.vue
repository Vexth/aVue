<template>
  <div class="orderHander">
    <el-row>
      <el-col :span="7">
        <div class="grid-content">
          <el-select style="width: 150px;" v-model="formInline.queryType" placeholder="订单号" clearable>
            <el-option label="订单号" value="1"></el-option>
            <el-option label="收件人姓名" value="2"></el-option>
            <el-option label="收件人手机号" value="3"></el-option>
          </el-select>
          <el-input v-if="formInline.queryType === '1'" v-model="formInline.orderId" placeholder="订单号" clearable></el-input>
          <el-input v-if="formInline.queryType === '2'" v-model="formInline.username" placeholder="收件人姓名" clearable></el-input>
          <el-input v-if="formInline.queryType === '3'" v-model="formInline.mobilePhone" placeholder="收件人手机号" clearable></el-input>
          <!-- <el-input v-else v-model="formInline.orderId" placeholder="收件人手机号z" clearable></el-input> -->
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <span>下单时间：</span>
          <el-date-picker
            v-model="formInline.value"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </div>
      </el-col>
      <el-button @click="query7">近7天</el-button>
      <el-button @click="query30">近30天</el-button>
    </el-row>
    <el-row>
      <el-col :span="7">
        <div class="grid-content">
          <span style="width: 150px;">商品名称：</span>
          <el-input v-model="formInline.title" placeholder="商品名称" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <span>营销方式：</span>
          <el-select v-model="formInline.markingType" placeholder="营销方式" clearable>
            <el-option label="全部" value="-1"></el-option>
            <el-option label="普通" value="0"></el-option>
            <el-option label="其他" value="1"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4" style="margin-left: 80px;">
        <div class="grid-content">
          <span>订单状态：</span>
          <el-select v-model="formInline.orderStatus" placeholder="订单状态" clearable>
            <el-option label="全部" value="-1"></el-option>
            <el-option label="待付款" value="1"></el-option>
            <el-option label="已付款/等待服务/待发货" value="2"></el-option>
            <el-option label="服务完成/已发货" value="3"></el-option>
            <el-option label="买家确认服务完成/买家确认收货/已完成" value="4"></el-option>
            <el-option label="已关闭" value="5"></el-option>
          </el-select>
        </div>
      </el-col>

    </el-row>
    <el-row>
      <el-col :span="7">
        <div class="grid-content">
          <span style="width: 150px;">付款方式：</span>
          <el-select v-model="formInline.paymentType" placeholder="付款方式" clearable>
            <el-option label="全部" value="-1"></el-option>
            <el-option label="微信支付" value="0"></el-option>
            <!--<el-option label="套餐卡" value="1"></el-option>-->
            <!--<el-option label="刷卡" value="2"></el-option>-->
            <!--<el-option label="现金" value="3"></el-option>-->
          </el-select>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <span>售后服务：</span>
          <el-select v-model="formInline.refundType" placeholder="售后服务" clearable>
            <el-option label="全部" value="-1"></el-option>
            <el-option label="无" value="0"></el-option>
            <el-option label="退货中" value="1"></el-option>
            <el-option label="退货完成" value="2"></el-option>
            <el-option label="协商中" value="3"></el-option>
            <el-option label="协商完成" value="4"></el-option>
            <el-option label="退款中" value="5"></el-option>
            <el-option label="退款完成" value="6"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4" style="margin-left: 80px;">
        <!-- 0全部 1小程序，2公众号 -->
        <div class="grid-content">
          <span>订单来源：</span>
          <el-select v-model="formInline.orderFromType" placeholder="订单来源" clearable>
            <el-option label="全部" value="-1"></el-option>
            <el-option label="小程序" value="1"></el-option>
            <el-option label="公众号" value="2"></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <div style="text-align: center;margin-top: 15px;">
      <el-button style="width: 136px;" type="primary" @click="query">查询</el-button>
      <el-button style="width: 136px;" type="primary" @click="Export">导出报表</el-button>
    </div>
  </div>
</template>

<script>
import formatDate from '@/views/shop/timeToString'
export default {
  data() {
    return {
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
      formInline: {
        value: [],
        queryType: '1',
        orderId: '',
        orderStatus: '-1',
        markingType: '-1',
        refundType: '-1',
        orderFromType: '-1',
        username: '',
        mobilePhone: '',
        paymentType: '-1'
      }
    }
  },
  methods: {
    date(i) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * i)
      this.formInline.value = [start, end]
      // console.log(this.formInline.value)
      // this.formInline['createTimeBegin'] = formatDate(this.formInline.value[0])
      // this.formInline['createTimeBegin'] = formatDate(this.formInline.value[1])
    },
    // 近7天
    query7() {
      this.date(7)
    },
    // 近30天
    query30() {
      this.date(30)
    },
    // 查询
    query() {
      if (this.formInline.value.length !== 0) {
        this.formInline['createTimeBegin'] = formatDate(this.formInline.value[0])
        this.formInline['createTimeEnd'] = formatDate(this.formInline.value[1])
      }
      this.$emit('query', this.formInline)
    },
    // 导出
    Export() {
      this.$emit('Export', this.formInline)
    }
  }
}
</script>

<style scoped>
.orderHander {
  background: #f4f6f9;
  display: inline-block;
  padding: 35px;
  border: 1px solid #d8dbe3;
  margin-top: 10px;
  margin-bottom: 15px;
}
.el-col-4 {
  width: 281px;
}
.el-col-7{
  width: 491px;
}

.el-input{
  width: 200px;
}

.grid-content {
  min-height: 36px;
  margin-bottom: 35px;
}
.grid-content span {
  width: 70px;
  font-size: 14px;
  display: inline-block;
  text-align: right;
}
</style>
