<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>活动物品栏 - {{num}}</span>
    </div>
    <div class="text">
      <div class="item">
        <span>输入商品ID：</span>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <el-button @click="clickInput" style="margin-top: 20px;" type="primary">查找</el-button>
    </div>
    
    <div v-if="isXzsd" class="xzsp">
      <p><span>选中商品</span></p>
      <p class="selected1" :class="isSelected ? 'selected' : ''" @click="sel">
        <img style="width: 100%;" :src="img" />
        <i v-if="isSelected" class="index el-icon-check"></i>
      </p>
    </div>
    <div class="primary">
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      isXzsd: false,
      isSelected: false,
      input: '',
      img: ''
    }
  },
  props: {
    num: Number
  },
  methods: {
    clickInput() {
      this.isXzsd = true
      this.$emit('clickInput', this.input)
    },
    sel() {
      this.isSelected = !this.isSelected
      this.$emit('sel', this.isSelected)
    },
    onSubmit() {
      this.$emit('sel', this.isSelected)
    }
  }
}
</script>

<style scoped>
.clearfix{
  margin: -18px -20px;
  background: #e7e7e7;
  line-height: 36px;
}
.item span{
  line-height: 36px;
  display: inline-block;
  width: 130px;
}
.item {
  display: flex;
}
.xzsp{
  position: relative;
  margin-top: 25px;
}
.selected1{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding: 15px;
  border-radius: 5px;
  background: #ebecf0;
  width: 230px;
  display: inline-block;
  margin: 40px auto auto auto;
  height: 235px;
  cursor: pointer;
  border: 2px solid transparent;
}

.selected {
  border-color: #07d;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  /* display: none; */
}
.selected:after {
  position: absolute;
  display: block;
  content: " ";
  right: 0;
  top: 0;
  border: 14px solid #07d;
  border-left-color: transparent;
  border-bottom-color: transparent;
  z-index: 1;
}
.selected .index{
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 2;
  font-size: 12px;
  color: #fff;
  font-style: normal;
  font-family: arial;
  width: 13px;
  text-align: center;
  height: 15px;
  line-height: 20px;
}

.primary {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
}
</style>
