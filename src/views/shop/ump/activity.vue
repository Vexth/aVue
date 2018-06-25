<template>
  <div class="app-container">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="所有促销" name="first"></el-tab-pane>
      <el-tab-pane label="未开始" name="second"></el-tab-pane>
      <el-tab-pane label="进行中" name="third"></el-tab-pane>
      <el-tab-pane label="已结束" name="fourth"></el-tab-pane>
    </el-tabs>
    <el-button v-if="bool" type="success" style="margin-bottom: 15px;" @click="changeComponent">新建{{title}}</el-button>
    
    <component :is="bol"></component>
  </div>
</template>

<script>
import add from './add.vue'
import list from './list.vue'

export default {
  data() {
    return {
      activeName2: 'first',
      title: '',
      bol: 'list',
      bool: true
    }
  },
  components: {
    'add': add,
    'list': list
  },
  created() {
    this.title = this.$route.query.name
    console.log(this.$route.query)
  },
  methods: {
    changeComponent() {
      this.bool = false
      this.bol = this.bol === 'list' ? 'add' : 'list'
    },
    handleClick(tab, event) {
      this.bool = true
      this.bol = 'list'
      console.log(tab, event)
    }
  }
}
</script>

<style>

</style>
