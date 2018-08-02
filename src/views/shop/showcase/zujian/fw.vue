<template>
  <div>
    <div class="fw" v-for="(v, i) in fw" :key="i">
      <div>
        <span style="text-align: center;">第{{SectionToChinese(i+1) || i+1}}项</span>
        <el-button type="danger" @click="del(i)">删除</el-button>
      </div>
      <div>
        <span>套餐服务项目名称：</span>
        <el-input v-model="v.itemName" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>服务项目详细介绍：</span>
        <el-input type="textarea" :rows="5" v-model="v.itemDesc" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>服务次数：</span>
        <el-input v-model="v.times" placeholder="请输入内容" style="width: 300px;" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"></el-input>
        <font>次</font>
      </div>
      <div>
        <span>门市价格：</span>
        <el-input v-model="v.retailPirce" placeholder="请输入内容" style="width: 300px;" onkeyup="value=value.replace(/[^\d^\.]+/g,'')"></el-input>
        <font>元</font>
      </div>
      <div>
        <span>配件用品：</span>
        <el-input type="textarea" :rows="5" v-model="v.supplies" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>服务消耗时间：</span>
        <el-input v-model="v.workTime" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>建议周期：</span>
        <el-input v-model="v.period" placeholder="请输入内容"></el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    fw: Array
  },
  methods: {
    SectionToChinese(section) {
      const chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"]
      const chnUnitSection = ["", "万", "亿", "万亿", "亿亿"]
      const chnUnitChar = ["", "十", "百", "千"]

      let strIns = ''
      let chnStr = ''
      let unitPos = 0
      let zero = true
      while (section > 0) {
        let v = section % 10
        if (v === 0) {
          if (!zero) {
            zero = true
            chnStr = chnNumChar[v] + chnStr
          }
        } else {
          zero = false
          strIns = chnNumChar[v]
          strIns += chnUnitChar[unitPos]
          chnStr = strIns + chnStr
        }
        unitPos++
        section = Math.floor(section / 10)
      }
      return chnStr
    },
    del(v) {
      this.$emit('delFW', v)
    },
    bc() {
      return this.fw
    }
  }
}
</script>

<style scoped>
.fw {
  padding: 10px;
  border: 1px solid #dcdfe6;
  margin-bottom: 10px;
  border-radius: 5px;
}
.fw div span {
  display: inline-block;
  width: 130px;
  text-align: right;
  margin: 5px 0px;
}
.el-input, .el-textarea {
  display: inline-block;
  width: 80%;
}
.el-input {
  width: 60%;
}
.el-textarea {
  vertical-align: top;
}
</style>
