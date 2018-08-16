<template>
  <div class="app-container">
    <el-tabs v-model="activeNameTitle" @tab-click="handleClickTitle">
      <el-tab-pane v-for="item in navlistTitle" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
    </el-tabs>

    <v-order-list-hander @query="query" @Export="Export" />

    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="item in navlist" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
    </el-tabs>

    <v-order-list-table :rows="rows" :list="list" @star="star" @cancel="cancel" @cancel1="cancel1" @duo="duo" @edit="edit" />
    <el-dialog title="更多详情" :visible.sync="dialogFormVisible">
      <v-order-list-more :form="form" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="more">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import vOrderListTable from './orderListTable.vue'
import vOrderListHander from './orderListHander.vue'
import vOrderListMore from './orderListMore.vue'
import formatDate from '@/views/shop/timeToString'

import { shopOrderList, shopOrderModifyStar, shopOrderClose, shopOrderDetail, shopOrderModifyRemark, shopOrderModifyPrice } from '../server'
export default {
  data() {
    return {
      form: {
        orderId: '',
        receiveAddress: '',
        vendorRemark: '',
        userCarInfo: '',
        appointmentServiceTimeBegin: '',
        appointmentServiceTimeEnd: '',
        isTrue: true
      },
      dialogFormVisible: false,
      activeNameTitle: '-1',
      navlistTitle: [
        { name: '-1', label: '全部订单' }
      ],
      activeName: '-1',
      navlist: [
        { name: '-1', label: '全部' },
        { name: '0', label: '待付款' },
        { name: '1', label: '已付款 / 等待服务 / 待发货' },
        { name: '2', label: '服务完成 / 已发货' },
        { name: '3', label: '买家确认服务完成 / 买家确认收货 / 已完成' },
        { name: '4', label: '已关闭' }
      ],
      rows: [
        {
          label: '商品',
          width: '20'
        },
        {
          label: '单价/数量',
          width: '9'
        },
        {
          label: '售后',
          width: '9'
        },
        {
          label: '买家/电话',
          width: '9'
        },
        {
          label: '下单时间',
          width: '9'
        },
        {
          label: '需付金额',
          width: '14'
        },
        {
          label: '订单状态',
          width: '15'
        },
        {
          label: '备注',
          width: '15'
        }
      ],
      list: [],
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.queryList({})
  },
  components: {
    vOrderListTable, vOrderListHander, vOrderListMore
  },
  methods: {
    handleClickTitle(tab, event) {
      // console.log(tab.name, event)
    },
    handleClick(tab, event) {
      const list = {}
      if (tab.name !== '-1') {
        list['orderStatus'] = tab.name
      }
      this.queryList(list)
    },
    queryList(list) {
      // post /api/v1/shop/order/list 查询订单列表
      shopOrderList(list).then(res => {
        res.data.forEach(e => {
          e.refundType = `${e.refundType}`
        })
        this.list = res.data
      }).catch(err => console.log(err))
    },
    // 查询
    query(val) {
      const list = {}
      if (val['queryType'] === '1' && val['orderId'] !== '') {
        list['orderId'] = val['orderId']
      }
      if (val['queryType'] === '2' && val['username'] !== '') {
        list['username'] = val['username']
      }
      if (val['queryType'] === '3' && val['mobilePhone'] !== '') {
        list['mobilePhone'] = val['mobilePhone']
      }
      if (val['title'] !== '') {
        list['title'] = val['title']
      }
      // if (val['username'] !== '') {
      //   list['orderId'] = val['orderId']
      //   list['username'] = val['username']
      // }
      if (val['markingType'] !== '-1') {
        list['markingType'] = val['markingType']
      }
      if (val['orderFromType'] !== '-1') {
        list['orderFromType'] = val['orderFromType']
      }
      if (val['orderStatus'] !== '-1') {
        list['orderStatus'] = val['orderStatus']
      }
      if (val['paymentType'] !== '-1') {
        list['paymentType'] = val['paymentType']
      }
      if (val['refundType'] !== '-1') {
        list['refundType'] = val['refundType']
      }
      if (val['createTimeBegin'] !== '') {
        list['createTimeBegin'] = val['createTimeBegin']
      }
      if (val['createTimeEnd'] !== '') {
        list['createTimeEnd'] = val['createTimeEnd']
      }
      this.queryList(list)
    },
    // 导出
    Export(val) {
      console.log(val)
    },
    // 加星
    star(val) {
      const list = {
        orderId: val.orderId,
        isStar: val.isStar
      }
      // POST /api/v1/shop/order/modify/star 设置订单加星状态
      shopOrderModifyStar(list).then(res => {
        if (res.code === 200) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => console.log(err))
    },
    // 取消发货
    cancel1() {
      this.queryList({})
    },
    // 取消订单
    cancel(val) {
      const list = {
        orderId: val.orderId
      }
      // DELETE /api/v1/shop/order/close 关闭订单
      shopOrderClose({ params: list }).then(res => {
        if (res.code === 200) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.queryList({})
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => console.log(err))
    },
    // 更多详情
    duo(val) {
      this.dialogFormVisible = true
      // GET /api/v1/shop/order/detail 获取订单详情
      shopOrderDetail(val.orderId).then(res => {
        const list = res.data
        this.form = {
          orderId: list.orderId,
          receiveAddress: list.receiveAddress,
          vendorRemark: list.vendorRemark,
          userCarInfo: list.userCarInfo,
          appointmentServiceTimeBegin: list.appointmentServiceTimeBegin,
          appointmentServiceTimeEnd: list.appointmentServiceTimeEnd,
          isTrue: true
        }
      }).catch(err => console.log(err))
    },
    // 修改更多详情
    more() {
      const list = {
        orderId: this.form.orderId,
        receiveAddress: this.form.receiveAddress,
        vendorRemark: this.form.vendorRemark,
        userCarInfo: this.form.userCarInfo
      }
      if (this.form.appointmentServiceTimeBegin !== null) {
        list['appointmentServiceTimeBegin'] = formatDate(this.form.appointmentServiceTimeBegin)
      }
      if (this.form.appointmentServiceTimeEnd !== null) {
        list['appointmentServiceTimeEnd'] = formatDate(this.form.appointmentServiceTimeEnd)
      }
      // POST /api/v1/shop/order/modify/remark 更新商家备注信息
      shopOrderModifyRemark(list).then(res => {
        if (res.code === 200) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.dialogFormVisible = false
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => console.log(err))
    },
    // 修改价格
    edit(i, edit, val) {
      // POST /api/v1/shop/order/modify/price 修改订单价格
      if (edit.indexOf(i) === -1) {
        const list = {
          orderId: val.orderId,
          modifyPrice: val.actualNeedMoney
        }
        shopOrderModifyPrice(list).then(res => {
          if (res.code === 200) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.queryList({})
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => console.log(err))
      }
    }
  }
}
</script>
<style scoped>
#app .main-container {
  min-height: 100%;
  -webkit-transition: margin-left 0.28s;
  transition: margin-left 0.28s;
  margin-left: 180px;
  overflow-x: initial!important;
}
</style>
