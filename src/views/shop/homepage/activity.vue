<template>
  <div class="app-container">
    <div class="banner-list">
      <div class="item name">
        <span>设置活动栏名称：</span>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>

      <div style="display: inline-block;">
        <v-card v-for="i in selected" :key="i" :num="i" @clickInput="clickInput" />
        <v-plus v-if="isXs" :form="form" @plus="plus" />
      </div>

      <p></p>
      <el-button style="margin-top: 20px;margin-left: 10px;" type="primary" @click="onSubmit">保存</el-button>
      
    </div>
  </div>
</template>

<script>
import vCard from './card.vue'
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
      }
    }
  },
  components: {
    vCard, vPlus
  },
  methods: {
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
      this.selected.indexOf(val) > -1 ? this.selected = this.selected.filter(k => k !== val) : this.selected.push(val)
    },
    onSubmit() {
      console.log('xxx')
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
.box-card{
  text-align: center;
  width: 300px;
  height: 480px;
  margin-top: 20px;
  float: left;
  margin-right: 10px;
}
.name {
  display: flex;
  width: 320px;
}
.name span {
  line-height: 36px;
  display: inline-block;
  width: 180px;
}
</style>