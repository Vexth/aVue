<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="item in navlist" :key="item.name" :label="item.label" :name="item.name">{{item.name}}</el-tab-pane>
    </el-tabs>
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
      ]
    }
  },
  mounted() {
    this.axios.get('api/ting?method=baidu.ting.billboard.billList&type=1&size=10&offset=0').then(res => console.log(res))
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.name, event)
    }
  }
}
</script>
<style scoped>

</style>
