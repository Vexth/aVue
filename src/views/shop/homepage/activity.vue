<template>
  <div class="app-container">
    <div class="banner-list">
      <div class="item name">
        <span>设置活动栏名称：</span>
        <el-input style="float: left;width: 200px;" v-model="input" placeholder="请输入内容"></el-input>
        <el-button style="margin-left: 20px;" type="primary">保存</el-button>
      </div>

      <div style="display: inline-block;">
        <v-x-card v-for="(s, i) in selected" :key="i" :bool="true" :item="s" :num="i" @sel="sel" />
        <v-plus v-if="isXs" :form="form" @plus="plus" />
      </div>
    </div>
  </div>
</template>

<script>
import vXCard from './xcard.vue'
import vPlus from './plus.vue'
export default {
  data() {
    return {
      input: '',
      isXs: true,
      img: '../../../../../static/img/demo.png',
      selected: [],
      form: {
        val: '点击添加活动物品栏',
        item: '最多八个'
      },
      cellType: 3
    }
  },
  components: {
    vXCard, vPlus
  },
  mounted() {
    this.configList()
  },
  methods: {
    configList() {
      // GET /api/v1/shop/page/main/config/list 微信主页配置 列表
      this.axios.get(`api/v1/shop/page/main/config/list?cellType=${this.cellType}`).then(res => {
        if (res.data.code === 200) {
          const data = res.data.data
          this.input = data.cellLabel
          this.selected = data.children
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => console.log(err))
    },
    clickInput(val) {
      console.log(val)
    },
    plus(val) {
      this.selected.push(val)
      if (this.selected.length === 8) {
        this.isXs = !this.isXs
      }
    },
    sel(val) {
      console.log(val)
      // this.selected.indexOf(val) > -1 ? this.selected = this.selected.filter(k => k !== val) : this.selected.push(val)
    }
  }
}
</script>

<style scoped>
* {
  font-size: 14px;
}
.banner-list{
  background: #f4f6f9;
  display: inline-block;
  padding: 20px;
  border: 1px solid #d8dbe3;
  margin: 0;
  width: 100%;
}
.name {
  /* display: flex;
  width: 320px; */
}
.name span {
  line-height: 36px;
  display: inline-block;
  width: 115px;
  float: left;
}
</style>