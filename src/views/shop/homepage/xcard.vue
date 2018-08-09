<template>
  <el-card class="box-card">
    <div v-if="bool" slot="header" class="clearfix">
      <span>活动物品栏 - {{num+1}}</span>
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
        <span class="img">
          <img style="width: 68%;" :src="list['product']['imageUrl']" />
          <span class="title">{{list['product']['title']}}</span>
          <span style="display: block;text-align: left;padding-left: 5px;color: red;">￥ {{list['product']['priceUnderline']}}</span>
        </span>
        <i v-if="isSelected" class="index el-icon-check"></i>
      </p>
      <div class="primary">
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { shopProductBrief } from '../server'
export default {
  data() {
    return {
      isXzsd: false,
      isSelected: false,
      input: '',
      list: {}
    }
  },
  props: {
    num: Number,
    bool: Boolean,
    item: {
      type: Object,
      required: true,
      default: {}
    }
  },
  watch: {
    item: {
      immediate: true,
      handler(newVal, oldVal) {
        this.isSelected = newVal['isShow'] === 0 ? true : false
        if (newVal['isShow'] !== undefined) {
          this.isXzsd = true
        }
        this.list = newVal['product'] === undefined ? {} : newVal
        if (newVal['product'] !== undefined) {
          this.input = newVal['navigateParam']
        }
      },
      deep: true
    }
  },
  methods: {
    clickInput() {
      this.list['navigateParam'] = this.input
      // GET /api/v1/shop/page/main/config/product/brief 微信主页配置 获取商品简要信息
      shopProductBrief(this.input).then(res => {
        if (res.code === 200) {
          this.list['product'] = res.data
          this.isXzsd = true
          this.isSelected = false
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => console.log(err))
    },
    sel() {
      if (this.item.cellId === undefined) {
        this.$message.error('请先保存在做此操作！')
        return
      }
      this.isSelected = !this.isSelected
      this.$emit('sel', this.item.cellId)
    },
    onSubmit() {
      this.$emit('onSubmit', this.list)
    }
  }
}
</script>

<style scoped>
.box-card{
  text-align: center;
  width: 300px;
  height: 520px;
  margin-top: 20px;
  float: left;
  margin-right: 10px;
  position: relative;
}
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
  height: 340px;
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

.img{
  width: 182px;
  display: inline-block;
  height: 100%;
  background: #fff;
}
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin: 5px;
  line-height: 14px;
}
</style>
