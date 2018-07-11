<template>
  <div class="app-container">
    <el-tabs v-model="activeNameTitle" @tab-click="handleClickTitle">
      <el-tab-pane v-for="item in navlistTitle" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
    </el-tabs>

    <v-order-list-hander @query="query" @Export="Export" />

    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="item in navlist" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
    </el-tabs>

    <v-order-list-table :rows="rows" :list="list" @star="star" @cancel="cancel" @confirm="confirm" />
  </div>
</template>
<script>
import vOrderListTable from './orderListTable.vue'
import vOrderListHander from './orderListHander.vue'
export default {
  data() {
    return {
      activeNameTitle: '-1',
      navlistTitle: [
        { name: '-1', label: '全部订单' },
        { name: '0', label: '同城订单' },
        { name: '1', label: '自提订单' }
      ],
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
          label: '订单状态',
          width: '9'
        },
        {
          label: '需付金额',
          width: '9'
        },
        {
          label: '地址',
          width: '17'
        },
        {
          label: '备注',
          width: '9'
        }
      ],
      list: [],
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
  components: {
    vOrderListTable, vOrderListHander
  },
  methods: {
    handleClickTitle(tab, event) {
      console.log(tab.name, event)
    },
    handleClick(tab, event) {
      this.getList(tab.name)
      console.log(tab.name, event)
    },
    getList(id) {
      this.axios.get(`restserver/ting?method=baidu.ting.billboard.billList&type=${id}&size=10&offset=0`).then(res => {
        if (res.status === 200) {
          this.list = res.data.song_list
        }
      }).catch(err => console.log(err))
    },
    // 查询
    query(val) {
      console.log(val)
    },
    // 导出
    Export(val) {
      console.log(val)
    },
    // 加星
    star(val) {
      console.log(val)
    },
    // 确认已付款
    confirm(val) {
      console.log(val)
    },
    // 取消订单
    cancel(val) {
      console.log(val)
    }
  }
}
</script>
<style scoped>

</style>
