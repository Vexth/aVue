<template>
  <div style="display: flex;">
    <div class="left">
      <div class="img">
        <span name="left">
          <b>
            <i v-if="form1.fullDiscount === '1'">￥</i>
            <span v-if="form1.fullDiscount === '1'">{{form1.couponValue1}}</span>
            <span v-else-if="form1.fullDiscount === '2'">{{form1.couponValue2}} 折</span>
            <i v-if="form1.couponConditionType === '2'">￥</i>
            <span v-if="form1.couponConditionType === '2'">{{form1.couponValue1}}</span>
            <span v-else-if="form1.couponConditionType === '3'">{{form1.couponValue2}} 折</span>
          </b>
          <span style="font-size: 16px;">
            <span v-if="form1.couponConditionType === '1'">无门槛优惠券</span>
            <span v-else-if="form1.couponConditionType === '2'">满{{form1.couponConditionValue}}元可用</span>
            <span v-else-if="form1.couponConditionType === '3'">满{{form1.couponConditionValue}}元可用</span>
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
      <el-form :model="form1" label-width="130px">
        <el-form-item label="优惠券标题：">
          <el-input v-model="form1.couponName"></el-input>
        </el-form-item>
        <el-form-item label="发放总量：">
          <el-input v-model="form1.couponNum"></el-input>
        </el-form-item>
        <el-form-item label="券种选择：">
          <el-radio-group v-model="form1.couponConditionType">
            <el-radio @change="typeClick" label="1">现金券</el-radio>
            <el-radio @change="typeClick" label="2">满减券</el-radio>
            <el-radio @change="typeClick" label="3">折扣券</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="优惠内容：" v-if="form1.couponConditionType !== null">
          <el-radio-group v-model="form1.fullDiscount" v-if="form1.couponConditionType === '1'">
            <el-radio label="1">
              <span>减</span> 
              <el-input class="w100" v-model="form1.couponValue1"></el-input> 
              <span>元</span>
            </el-radio>
            <el-radio label="2">
              <span>打</span> 
              <el-input class="w100" v-model="form1.couponValue2"></el-input> 
              <span>折</span>
            </el-radio>
          </el-radio-group>
          <div v-if="form1.couponConditionType === '2'">
            订单满 <el-input class="w100" v-model="form1.couponConditionValue"></el-input> 元时享受优惠，减 <el-input class="w100" v-model="form1.couponValue1"></el-input> 元
          </div>
          <div v-if="form1.couponConditionType === '3'">
            订单满 <el-input class="w100" v-model="form1.couponConditionValue"></el-input> 元时享受优惠，打 <el-input class="w100" v-model="form1.couponValue2"></el-input> 折
          </div>
        </el-form-item>
        <el-form-item label="适用范围：">
          <el-radio-group v-model="form1.productScope">
            <el-radio label="1">全店商品</el-radio>
            <el-radio label="2">指定商品</el-radio>
            <el-radio label="3">指定商品不可用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="添加商品：" v-if="form1.productScope !== '1'">
          <el-button size="small" type="primary" icon="el-icon-plus" @click="plus" plain>添加商品</el-button>
          <span v-if="form1.productIdList.length !== 0">已选{{form1.productIdList.length}}件商品</span>
        </el-form-item>
      </el-form>
      <p>领取和使用规则：</p>
      <el-form :model="form" label-width="130px">
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
        <el-form-item label="分享设置：">
          <el-checkbox-group v-model="form.isShare">
            <el-checkbox label="1" name="type">是否显示分享按钮</el-checkbox>
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
      <v-tabs ref="vTabs" :label="label" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="sub">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import formatDate from '../timeToString.js'

import vTabs from './zujian/vTabs.vue'

import { couponCreate } from '../server'
export default {
  data() {
    return {
      dialogVisible: false,
      label: {
        name1: '选择商品',
        name2: '已择商品'
      },
      form1: {
        couponName: '',
        couponNum: '',
        couponConditionType: null,
        fullDiscount: null,
        couponConditionValue: '',
        couponValue1: '',
        couponValue2: '',
        productScope: '1',
        productIdList: []
      },
      form: {
        decription: '',
        forUser: null,
        isRemind: null,
        isShare: null,
        limitNum: '',
        isLimitNum: null,
        validTimeType: null,
        value1: [],
        validDays1: '',
        validDays2: '',
        value2: []
      },
      validTimeTypeTime: '',
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
    typeClick(v) {
      this.form1.couponValue1 = ''
      this.form1.couponValue2 = ''
      this.form1.couponConditionValue = ''
      this.form1.fullDiscount = null
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
    sub() {
      this.dialogVisible = false
      const list = this.$refs.vTabs.TableList().map(res => res.product.id)
      this.form1.productIdList = list
      console.log(list)
    },
    isForm1Coupon(v, s, con = null) {
      if (this.form1[v] === con) {
        this.$message.error(s)
        return
      }
    },
    onSubmit() {
      const list = {}
      list['productScope'] = this.form1.productScope

      this.isForm1Coupon('couponName', '请填写优惠券标题！', '')
      list['couponName'] = this.form1.couponName

      this.isForm1Coupon('couponNum', '请填写优惠券发放总量！', '')
      list['couponNum'] = this.form1.couponNum

      this.isForm1Coupon('couponConditionType', '请选择券种选择！')
      list['couponConditionType'] = this.form1.couponConditionType

      if (this.form1.couponConditionType === '1') {
        this.isForm1Coupon('fullDiscount', '请选择优惠内容！')
        list['fullDiscount'] = this.form1.fullDiscount

        if (this.form1.fullDiscount === '1') {
          this.isForm1Coupon('couponValue1', '请填写优惠内容！', '')
          list['couponValue'] = this.form1.couponValue1
        }
        if (this.form1.fullDiscount === '2') {
          this.isForm1Coupon('couponValue2', '请填写优惠内容！', '')
          list['couponValue'] = this.form1.couponValue2
        }
      } else if (this.form1.couponConditionType === '2') {
        this.isForm1Coupon('couponConditionValue', '请填写优惠条件！', '')
        list['couponConditionValue'] = this.form1.couponConditionValue

        this.isForm1Coupon('couponValue1', '请填写优惠内容！', '')
        list['couponValue'] = this.form1.couponValue1
      } else if (this.form1.couponConditionType === '3') {
        this.isForm1Coupon('couponConditionValue', '请填写优惠条件！', '')
        list['couponConditionValue'] = this.form1.couponConditionValue

        this.isForm1Coupon('couponValue2', '请填写优惠内容！', '')
        list['couponValue'] = this.form1.couponValue2
      }

      if (this.form1.productIdList.length !== 0) {
        list['productIdList'] = this.form1.productIdList
      }

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

      couponCreate(list).then(res => res.code === 200 ? this.$router.push('/ump/coupon') : console.log(res)).catch(err => console.log(err))
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
