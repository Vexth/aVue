<template>
  <div>
    <p class="p">新建赠品</p>
    <p>
      <el-button type="success" size="small" plain @click="success">新建赠品</el-button>
    </p>
    <p class="p">管理赠品</p>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="优惠券名称：">
        <el-input v-model="formInline.couponName" placeholder="优惠券名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="优惠券状态：">
        <el-select v-model="formInline.statusCode" placeholder="优惠券状态" clearable>
          <el-option label="已结束" value="0"></el-option>
          <el-option label="进行中" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优惠券类别：">
        <el-select v-model="formInline.couponConditionType" placeholder="优惠券类别" clearable>
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
export default {
  data() {
    return {
      row: [
        {
          align: 'center',
          label: '活动名称',
          width: '',
          name: ''
        },
        {
          align: 'center',
          label: '类型有效时间',
          width: '200',
          name: ''
        },
        {
          align: 'center',
          label: '活动状态',
          width: '',
          name: ''
        },
        {
          align: 'center',
          label: '已赠送',
          width: '180',
          name: ''
        },
        {
          align: 'center',
          label: '已领取',
          width: '110',
          name: ''
        },
        {
          align: 'center',
          label: '操作',
          width: '',
          fn: `fn`
        }
      ]
    }
  },
  components: {
    vTable
  },
  methods: {
    success(v) {
      this.$emit('coupon', v)
    },
    response(v) {
      this.success(v)
    }
  }
}
</script>
