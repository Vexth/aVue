<template>
  <div>
    <el-form ref="form" :model="form" label-width="150px" required>
      <el-form-item label="商品类型：">
        <el-radio v-model="productType" label="0" @change="productTypeClick" >普通商品</el-radio>
        <el-radio v-model="productType" label="1" @change="productTypeClick" >套餐</el-radio>
      </el-form-item>
      <el-form-item label="商品规格：" required>
        <template>
          <div class="guige">
            <v-gui-ge v-for="(item, i) in items" :key="i" :i="i" :productType="productType" @del="del" @sub="sub" />
            <div class="title mb0">
              <el-button @click="addItem" :disabled="isAdd">添加规格项目</el-button>
              <el-button type="primary" :disabled="isSc" @click="addTale">生成规格明细</el-button>
            </div>
          </div>
        </template>
      </el-form-item>
      <el-form-item v-if="isBool" label="规格明细：" required>
        <template>
          <v-tab :row="row" :tableData="tableData" ref="vtab" />
        </template>
      </el-form-item>
      <el-form-item v-if="productType === '1'" label="套餐服务项目：" required>
        <template>
          <v-fw :fw="fw" ref="vfw" @delFW="delFW" />
          <div class="guige">
            <div class="title mb0">
              <el-button @click="addItemFW">添加服务项目</el-button>
              <!-- <el-button type="primary" @click="addTaleFW">生成套餐介绍列表</el-button> -->
            </div>
          </div>
          <div class="guige mt10 df">
            <div>商家备注：</div>
            <div style="width: 95%;">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="suite.remark">
              </el-input>
            </div>
          </div>
        </template>
      </el-form-item>

      <el-form-item v-if="productType === '0'" label="市场价：" required>
				<el-input v-model="priceUnderline" style="width: 200px;"></el-input>
        <el-tooltip placement="right">
          <div slot="content">111111111111111111111</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
			</el-form-item>

      <el-form-item label="套餐卡颜色：" v-if="productType === '1'" required>
        <el-popover
          placement="top"
          width="315"
          v-model="visible2">
          <div class="color">
            <el-button class="span" @click="colorSize" style="background: rgb(235,82,50);"></el-button>
            <el-button class="span" @click="colorSize" style="background: rgb(0,166,97);"></el-button>
            <el-button class="span" @click="colorSize" style="background: rgb(255,133,133);"></el-button>
            <el-button class="span" @click="colorSize" style="background: rgb(142,142,142);"></el-button>
            <el-button class="span" @click="colorSize" style="background: rgb(4,146,230);"></el-button>
            <el-button class="span" @click="colorSize" style="background: rgb(164,33,255);"></el-button>
          </div>
          <el-button class="span" :style="{background: color}" slot="reference"></el-button>
        </el-popover>

        <el-tooltip placement="right">
          <div slot="content">111111111111111111111</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
			</el-form-item>
      <el-form-item label="套餐卡时间期限：" v-if="productType === '1'" required>
        <el-radio-group class="resource" v-model="resource">
          <el-radio label="1">固定日期
            <el-date-picker
              v-model="value5"
              type="datetimerange"
              :picker-options="pickerOptions2"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-radio>
          <el-radio label="2">购买<span style="color: red;">当</span>日起<el-input class="input1" v-model="input1" placeholder="请输入内容" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"></el-input>天内可用</el-radio>
          <el-radio label="3">购买<span style="color: red;">次</span>日起<el-input class="input2" v-model="input2" placeholder="请输入内容" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"></el-input>天内可用</el-radio>
          <el-radio label="4">永远不过期</el-radio>
        </el-radio-group>

        <!-- <el-tooltip placement="right">
          <div slot="content">111111111111111111111</div>
          <i class="el-icon-question"></i>
        </el-tooltip> -->
			</el-form-item>
      <el-form-item label="是否上架：" required>
				<el-checkbox v-model="saleStatus">是否立即上架</el-checkbox>
        <el-tooltip placement="right">
          <div slot="content">111111111111111111111</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
			</el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="!isBool" @click="onSubmit">立即创建</el-button>
        <el-button @click="qx">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { getSkuAttrOption } from '../server'

import vTab from './zujian/tab.vue'
import vGuiGe from './zujian/guige.vue'
import vFw from './zujian/fw.vue'

import formatDate from '../timeToString'
export default {
  name: 'vInfoList',
  data() {
    return {
      value5: [],
      pickerOptions2: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      input1: '',
      input2: '',
      visible2: false,
      isAdd: false,
      isSc: true,
      isBool: false,
      ggNmaeList: [],
      items: [],
      form: {},
      resource: '',
      productType: '0',
      saleStatus: false,
      priceUnderline: '',
      textarea: '',
      color: 'rgb(4, 146, 230)',
      row: [],
      tableData: [],
      hander: [],
      stat: [],
      fw: [],
      suite: {
        colorType: '',
        remark: ''
      },
      varlist: []
    }
  },
  components: {
    vTab, vGuiGe, vFw
  },
  watch: {
    productType(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.items = []
        this.isAdd = false
        this.isSc = true
        this.isBool = false
        this.row = []
        this.tableData = []
      }
    }
  },
  methods: {
    addItemFW() {
      this.fw.push({
        itemName: '',
        itemDesc: '',
        times: '',
        retailPirce: '',
        supplies: '',
        workTime: '',
        period: ''
      })
    },
    delFW(val) {
      this.fw.splice(val, 1)
    },
    addItem() {
      this.isSc = false
      this.items.push({})
      this.tableData = []
      if (this.productType === '0' && this.items.length === 5) {
        this.isAdd = true
        return
      }
      if (this.productType === '1' && this.items.length === 1) {
        this.isAdd = true
        return
      }
    },
    ArrayFun(arr) {
      var results = []
      var result = []
      function doExchange(arr, depth) {
        for (var i = 0; i < arr[depth].length; i++) {
          result[depth] = { ...arr[depth][i], unitPrice: '', stockAmount: '', stockBarcode: '', costPrice: '', imageId: '' }
          if (depth !== arr.length - 1) {
            doExchange(arr, depth + 1)
          } else {
            results.push(JSON.stringify(result))
          }
        }
      }
      doExchange(arr, 0)
      return results
    },
    addTale() {
      const arr = this.items
      const row = []
      for (let i = 0; i < arr.length; i++) {
        const res = arr[i]
        if (res['hander'] === undefined) {
          this.$message.error('请选择规格名和规格值！')
          return
        }
        row.push(res['hander'])
      }
      this.isBool = true
      this.row = row
      this.tableData = this.ArrayFun(this.stat).map(res => JSON.parse(res))
    },
    del(val) {
      this.varlist = JSON.parse(sessionStorage.getItem('list'))
      sessionStorage.removeItem('list')
      this.isAdd = false
      this.items.splice(val, 1)
      this.hander.splice(val, 1)
      this.stat.splice(val, 1)
      this.varlist.splice(val, 1)

      this.isSc = this.items.length === 0 ? true : false
      if (this.items.length === 0) {
        this.isBool = false
      }
      sessionStorage.setItem('list', JSON.stringify(this.varlist))
    },
    colorSize(e) {
      this.visible2 = false
      this.color = e.target.style.background
      this.suite.colorType = e.target.style.background
    },
    productTypeClick(e) {
      this.productType = e
      sessionStorage.removeItem('list')
    },
    sub(val, i) {
      this.hander[i] = val.hander
      this.items[i] = val
      this.stat[i] = val.stat
    },
    onSubmit() {
      var a = this.$refs.vtab.bc()
      var b = a.map(res => {
        var a = res[0]
        delete a.a0
        delete a.a0Id
        return a
      })
      for (let i = 0; i < b.length; i++) {
        const e = b[i]
        if (e.imageId === '') {
          this.$message.error('请上传单品图片！')
          return
        }
        if (e.stockAmount === '') {
          this.$message.error('请填写库存！')
          return
        }
        if (e.unitPrice === '') {
          this.$message.error('请填写价格！')
          return
        }
      }
      if (this.priceUnderline === '' && this.productType === '0') {
        this.$message.error('请填写市场价格！')
        return
      }
      const list = {
        product: {
          productType: this.productType,
          saleStatus: this.saleStatus ? 0 : 1,
          priceUnderline: this.priceUnderline
        },
        skuList: b
      }
      if (this.productType === '1') {
        if (this.suite.remark === '') {
          this.$message.error('请填写商家备注！')
          return
        }
        if (this.color === '') {
          this.$message.error('请选择套餐卡颜色！')
          return
        }
        if (this.fw.length === 0) {
          this.$message.error('请添加服务项目！')
          return
        }
        list['suite'] = this.suite
        list['suite']['limitedTimeType'] = +this.resource
        if (this.resource === '1' && this.value5.length === 0) {
          this.$message.error('请选择固定日期！')
          return
        }
        if (this.resource === '1' && this.value5.length !== 0) {
          list['suite']['limitedStartTime'] = formatDate(this.value5[0])
          list['suite']['limitedEndTime'] = formatDate(this.value5[1])
        }
        if (this.resource === '2') {
          list['suite']['limitedTimeDays'] = this.input1
        }
        if (this.resource === '3') {
          list['suite']['limitedTimeDays'] = this.input2
        }
        list['suite']['colorType'] = this.color
        const a = this.$refs.vfw.bc()
        for (let index = 0; index < a.length; index++) {
          const element = a[index]
          if (element['itemName'] === '') {
            this.$message.error('请填写套餐服务项目名称！')
            return
          }
          if (element['itemDesc'] === '') {
            this.$message.error('请填写服务项目详细介绍！')
            return
          }
          if (element['times'] === '') {
            this.$message.error('请填写服务次数！')
            return
          }
          if (element['retailPirce'] === '') {
            this.$message.error('请填写门市价格！')
            return
          }
          if (element['supplies'] === '') {
            this.$message.error('请填写配件用品！')
            return
          }
          if (element['workTime'] === '') {
            this.$message.error('请填写服务消耗时间！')
            return
          }
          if (element['period'] === '') {
            this.$message.error('请填写建议周期！')
            return
          }
        }
        list['itemList'] = a
      }
      this.$emit('onSubmit', list)
    },
    qx() {
      console.log(this.resource)
      history.go(-1)
    }
  }
}
</script>

<style scoped>
.title {
  background-color: #f8f8f8;
  font-size: 14px;
  font-weight: 700;
  padding: 10px;
  margin-bottom: 20px;
}
.guigeul ul, .guigeul li{
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.guige {
  border: 1px solid #dcdfe6;
  background-color: #fff;
  padding: 10px;
}
.mb0 {
  margin-bottom: 0;
}
.mt10 {
  margin-top: 10px;
}
.df {
  display: flex;
}
.bgf {
  background: #fff;
}
.has-border {
  border-top: 1px solid #ccc;
}

.guigeul {
  border: 1px solid #dcdfe6;
  background-color: #fff;
  padding: 10px;
  display: inline-block;
  width: 100%;
}
.guigeul div {
  /* padding: 10px; */
  width: 180px;
  text-align: center;
  line-height: 56px;
  display: inline-block;
}

.el-icon-question {
  font-size: 14px;
  color: #ccc;
}

.guigeul input {
  width: 120px;
}

.color {
  display: flex;
}
.span {
  width: 38px;
  height: 38px;
  background: rgb(4, 146, 230);
  border-radius: 0;
  border: 0;
}

.resource .el-radio {
  display: block;
  margin-left: 0;
  margin-bottom: 10px;
}
.resource .input {
  width: 120px;
  margin: 0 5px;
}
</style>
