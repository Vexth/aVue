<template>
  <div>
    <p class="p">新建优惠券</p>
    <p>
      <el-button type="success" size="small" plain @click="success">新增优惠券</el-button>
    </p>
    <p class="p">管理优惠券</p>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="优惠券名称：">
        <el-input v-model="formInline.couponName" placeholder="优惠券名称"></el-input>
      </el-form-item>
      <el-form-item label="优惠券状态：">
        <el-select v-model="formInline.statusCode" placeholder="优惠券状态">
          <el-option label="已结束" value="0"></el-option>
          <el-option label="进行中" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优惠券类别：">
        <el-select v-model="formInline.couponConditionType" placeholder="优惠券类别">
          <el-option label="现金券" value="1"></el-option>
          <el-option label="满减券" value="2"></el-option>
          <el-option label="折扣券" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <v-table :row="row" :list="list" @response="response" @show="show" />
    <v-pagination v-if="pagination.total !== 0" :pagination="pagination" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" />
  </div>
</template>

<script>
import vTable from './zujian/vTable.vue'
import vPagination from '../pagination/pagination.vue'

import { couponSelectParmas, couponEditResponse, couponEditRequest, couponCreate, couponStopSend } from '../server'
export default {
  data() {
    return {
      formInline: {
        couponName: '',
        statusCode: '',
        couponConditionType: ''
      },
      row: [
        {
          align: "center",
          label: "优惠券名称",
          width: "",
          name: 'couponName'
        },
        {
          align: "center",
          label: "类型",
          width: "200",
          name: 'couponSendType',
          p: {
            '1': '全平台（店铺）优惠券',
            '2': '商品优惠券'
          }
        },
        {
          align: "center",
          label: "优惠内容",
          width: "",
          name: 'couponContent'
        },
        {
          align: "center",
          label: "已领取/剩余",
          width: "180",
          name: 'collectRemaining'
        },
        {
          align: "center",
          label: "已使用",
          width: "110",
          name: 'usedNum'
        },
        {
          align: "center",
          label: "支付金额",
          width: "100",
          name: 'payAmount'
        },
        {
          align: "center",
          label: "客单价",
          width: "100",
          name: 'customerPrice'
        },
        {
          align: "center",
          label: "状态/操作",
          width: "",
          fn: `fn`
        }
      ],
      list: null,
      listLoading: true,
      pagination: {
        total: 100,
        size: 10,
        page: 1,
        sizes: [5, 10, 20, 50, 100]
      }
    }
  },
  components: {
    vTable, vPagination
  },
  mounted() {
    this.couponSelectParmas()
  },
  methods: {
    couponSelectParmas() {
      let list = {
        pageSize: this.pagination.size,
        pageNum: this.pagination.page
      }
      list = {...list, ...this.formInline}
      couponSelectParmas(list).then(res => {
        if (res.code === 200) {
          this.list = res.data
          this.pagination.total = res.total
        } else {
          console.log(res)
        }
      }).catch(err => console.log(err))
    },
    success(v) {
      this.$emit('coupon', v)
    },
    response(v) {
      this.success(v)
    },
    show(v) {
      this.$confirm('确认停止发放吗？').then(_ => {
        couponStopSend(v.couponId).then(res => res.code === 200 ? this.couponSelectParmas(): console.log(res)).catch(err => console.log(err))
        done()
      }).catch(_ => {})
    },
    onSubmit() {
      this.couponSelectParmas()
    },
    handleSizeChange(val) {
      this.pagination.size = val
      this.couponSelectParmas()
    },
    handleCurrentChange(val) {
      this.pagination.page = val
      this.couponSelectParmas()
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
