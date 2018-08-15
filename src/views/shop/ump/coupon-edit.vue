<template>
  <div style="display: flex;">
    <div class="left">
      <div class="img">
        <span name="left">
          <b>
            <i>￥</i>
            <span v-if="form.fullDiscount === '1'">{{form.couponValue1}}</span>
            <span v-else-if="form.fullDiscount === '2'">{{form.couponValue2}}</span>
            <span v-else>价格</span>
          </b>
          <span style="font-size: 16px;">
            <span v-if="form.couponConditionType === '1'">无门槛</span>
            <span v-else-if="form.couponConditionType === '2'">满{{form.couponConditionValue}}元可用</span>
            <span v-else>使用类型</span>
          </span>
        </span>
        <span name="rigth">
          <span class="bt">{{form.couponName === '' ? '优惠券标题' : form.couponName}}</span>
          <span style="border-bottom: 1px dashed #c0c4cc;display: block;">
            <span v-if="form.validTimeType === '1'">{{validTimeTypeTime}}</span>
            <span v-else-if="form.validTimeType === '2'">领券当日起{{form.validDays1}}天内可用</span>
            <span v-else-if="form.validTimeType === '3'">领券次日起{{form.validDays2}}天内可用</span>
            <span v-else>使用时间</span>
          </span>
          <span>此处显示详情</span>
        </span>
      </div>
    </div>
    <div class="rigth">
      <p>基本设置：</p>
      <el-form ref="form" :model="form" label-width="130px">
        <el-form-item label="优惠券标题：">
          <el-input v-model="form.couponName"></el-input>
        </el-form-item>
        <el-form-item label="发放总量：">
          <el-input v-model="form.couponNum"></el-input>
        </el-form-item>
        <el-form-item label="可用商品：">
          <el-button size="small" type="primary" icon="el-icon-plus" @click="plus" plain>添加商品</el-button>
        </el-form-item>
        <el-form-item label="使用门槛：">
          <el-radio-group v-model="form.couponConditionType">
            <el-radio label="1">无门槛</el-radio>
            <el-radio label="2">订单满 <el-input class="w100" v-model="form.couponConditionValue"></el-input> 元</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="优惠内容：">
          <el-radio-group v-model="form.fullDiscount">
            <el-radio label="1">满减 <el-input class="w100" v-model="form.couponValue1"></el-input> 元</el-radio>
            <el-radio label="2">折扣 <el-input class="w100" v-model="form.couponValue2"></el-input> 元</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="使用时间：">
          <el-radio-group v-model="form.validTimeType">
            <el-radio class="elradio" label="1">
              <el-date-picker
                @change="logTimeChange"
                v-model="form.value1"
                type="datetimerange"
                :picker-options="pickerOptions2"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
              </el-date-picker>
            </el-radio>
            <el-radio class="elradio" style="margin: 5px 0;" label="2">领券当日起 <el-input class="w100" v-model="form.validDays1"></el-input> 天内可用</el-radio>
            <el-radio class="elradio" label="3">领券次日起 <el-input class="w100" v-model="form.validDays2"></el-input> 天内可用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分享设置：">
          <el-checkbox-group v-model="form.isShare">
            <el-checkbox label="1" name="type">是否显示分享按钮</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <p>领取和使用规则：</p>
      <el-form ref="form" :model="form" label-width="130px">
        <el-form-item label="优惠券领取时间：">
          <el-date-picker
            v-model="form.value2"
            type="datetimerange"
            :picker-options="pickerOptions2"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="领取人限制：">
          <el-radio-group v-model="form.forUser">
            <el-radio label="0">不限制，所有人可以领取</el-radio>
            <el-radio label="1">只有店铺会员可以领取</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="每人限领次数：">
          <el-radio-group v-model="form.isLimitNum">
            <el-radio label="0">不限制</el-radio>
            <el-radio label="1"><el-input class="w100" v-model="form.limitNum"></el-input> 次</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="过期提醒：">
          <el-checkbox-group v-model="form.isRemind">
            <el-checkbox label="1" name="type">优惠券过期前提醒买家</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="购买限制：">
          <el-checkbox-group v-model="form.isProductOriginal">
            <el-checkbox label="1" name="type">优惠券仅购买原价商品时可用</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="使用说明：">
          <el-input type="textarea" v-model="form.decription"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="选择商品"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <v-tabs :label="label" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import formatDate from '../timeToString.js'

import vTabs from './zujian/vTabs.vue'
export default {
  data() {
    return {
      dialogVisible: false,
      label: {
        name1: '选择商品',
        name2: '已择商品',
      },
      form: {
        decription: '', // 使用说明
        couponName: '', // 优惠券标题
        couponNum: '', // 发放总量
        couponSendType: null, // 全平台（店铺）优惠券 / 商品优惠券
        couponConditionType: null, // 使用门槛类型
        couponConditionValue: '', // 订单满
        fullDiscount: null,
        couponValue1: '', // 满减
        couponValue2: '', // 折扣
        forUser: null, // 领取人限制
        isRemind: null, //过期提醒
        isShare: null, //分享设置
        limitNum: '', // 每人限领次数
        isLimitNum: null, // 每人限领次数类型
        validTimeType: null, // 使用时间类型
        value1: [], // 使用时间
        validDays1: '', // 领券当日起
        validDays2: '', // 领券次日起
        value2: []  // 优惠券领取时间
      },
      validTimeTypeTime: '',
      pickerOptions2: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      }
    }
  },
  props: {
    couponSendType: {
      type: Object,
      default: {}
    }
  },
  watch: {
    couponSendType: {
      immediate:true,
      handler(v) {
        this.form.couponSendType = v.couponSendType
      }
    }
  },
  components: {
    vTabs
  },
  methods: {
    logTimeChange() {
      this.validTimeTypeTime = formatDate(this.form.value1[0], 'yyyy-mm-dd') + ' - ' + formatDate(this.form.value1[1], 'yyyy-mm-dd')
    },
    isDate(v) {
      return Object.prototype.toString.call(v) === '[object Date]'
    },
    plus() {
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？').then(_ => {
        this.dialogVisible = false
        done()
      }).catch(_ => {})
    },
    onSubmit() {
      let list = {}
      if (this.form.couponName === '') {
        this.$message.error('请填写优惠券标题！')
        return
      }
      list['couponName'] = this.form.couponName

      if (this.form.couponNum === '') {
        this.$message.error('请填写优惠券发放总量！')
        return
      }
      list['couponNum'] = this.form.couponNum

      if (this.form.couponConditionType === null) {
        this.$message.error('请选择使用门槛！')
        return
      }
      if (this.form.couponConditionType === '2') {
        if (this.form.couponConditionValue === '') {
          this.$message.error('请填写订单满多少元！')
          return
        } else {
          list['couponConditionValue'] = this.form.couponConditionValue
        }
      }
      list['couponConditionType'] = this.form.couponConditionType

      if (this.form.fullDiscount === null) {
        this.$message.error('请选择优惠内容！')
        return
      }
      if (this.form.fullDiscount === '1') {
        if (this.form.couponValue1 === '') {
          this.$message.error('请填写订单满减多少元！')
          return
        } else {
          list['couponValue'] = this.form.couponValue1
        }
      }
      if (this.form.fullDiscount === '2') {
        if (this.form.couponValue2 === '') {
          this.$message.error('请填写订单折扣多少元！')
          return
        } else {
          list['couponValue'] = this.form.couponValue2
        }
      }
      list['fullDiscount'] = this.form.fullDiscount

      if (this.form.validTimeType === null) {
        this.$message.error('请选择使用时间！')
        return
      }
      if (this.form.validTimeType === '1') {
        if (this.form.value1.length === 0) {
          this.$message.error('请选择开始结束时间！')
          return
        } else {
          list['validStartTime'] = this.isDate(this.form.value1[0]) ? formatDate(this.form.value1[0]) : this.form.value1[0]
          list['validEndTime'] = this.isDate(this.form.value1[1]) ? formatDate(this.form.value1[1]) : this.form.value1[1]
        }
      }
      if (this.form.validTimeType === '2') {
        if (this.form.validDays1 === '') {
          this.$message.error('请填写领券当日起多少天内可用！')
          return
        } else {
          list['validDays'] = this.form.validDays1
        }
      }
      if (this.form.validTimeType === '3') {
        if (this.form.validDays2 === '') {
          this.$message.error('请填写领券次日起多少天内可用！')
          return
        } else {
          list['validDays'] = this.form.validDays2
        }
      }
      list['validTimeType'] = this.form.validTimeType

      if (this.form.value2.length === 0) {
        this.$message.error('请选择优惠券领取时间！')
        return
      }
      list['sendStartTime'] = this.isDate(this.form.value2[0]) ? formatDate(this.form.value2[0]) : this.form.value2[0]
      list['sendEndTime'] = this.isDate(this.form.value2[1]) ? formatDate(this.form.value2[1]) : this.form.value2[1]
      

      if (this.form.forUser === null) {
        this.$message.error('请选择领取人限制！')
        return
      }
      list['forUser'] = this.form.forUser

      if (this.form.isLimitNum === null) {
        this.$message.error('请选择每人限领次数！')
        return
      }
      if (this.form.isLimitNum === '1') {
        if (this.form.limitNum === '') {
          this.$message.error('请填写每人限领次数！')
          return
        } else {
          list['limitNum'] = this.form.limitNum
        }
      }
      list['isLimitNum'] = this.form.isLimitNum

      if (this.form.decription === '') {
        this.$message.error('请填写使用说明！')
        return
      }
      list['decription'] = this.form.decription
      list['isProductOriginal'] = this.form.isProductOriginal ? 1 : 0
      list['isRemind'] = this.form.isRemind ? 1 : 0
      list['isShare'] = this.form.isShare ? 1 : 0
      list['couponSendType'] = this.form.couponSendType

      // // productIdList:["string"] 商品条数
      console.log(list)
    }
  }
}
</script>

<style scoped>
.elradio {
  display: block;
  margin: 0;
}
.w100 {
  width: 100px;
}
.left {
  width: 450px;
  margin-right: 50px;
  background: url('../../../../static/img/iphone.png') no-repeat;
  position: relative;
}
.left .img {
  background: url('../../../../static/img/youhuiquan.png') no-repeat;
  background-size: 100% 100%;
  width: 360px;
  position: absolute;
  left: 45px;
  top: 125px;
  height: 100px;
  display: flex;
}
.left .img span {
  display: inline-block;
}
.left .img span[name="left"] {
  width: 122px;
  height: 100px;
  text-align: center;
  color: #fff;
}
b {
  color: #fff;
  font-size: 32px;
  display: block;
  margin-top: 18px;
}
b i {
  font-style: normal;
  font-size: 20px;
}
.left .img span[name="rigth"] {
  width: 237px;
  height: 100px;
  color: #909399;
  padding-left: 10px;
  padding-right: 10px;
}
.left .img span[name="rigth"] span {
  line-height: 26px;
}
.bt {
  margin-top: 14px;
  width: 144px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
p {
  font-weight: 700;
}
</style>
