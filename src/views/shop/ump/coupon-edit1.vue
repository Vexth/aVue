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
          <el-input v-model="form1.couponName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="发放总量：">
          <el-input v-model="form1.couponNum" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="券种选择：">
          <el-radio-group v-model="form1.couponConditionType" disabled>
            <el-radio label="1" >现金券</el-radio>
            <el-radio label="2" >满减券</el-radio>
            <el-radio label="3" >折扣券</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="优惠内容：" v-if="form1.couponConditionType !== null">
          <el-radio-group v-model="form1.fullDiscount" v-if="form1.couponConditionType === '1'" disabled>
            <el-radio label="1">
              <span>减</span> 
              <el-input class="w100" v-model="form1.couponValue1" :disabled="true"></el-input> 
              <span>元</span>
            </el-radio>
            <el-radio label="2">
              <span>打</span> 
              <el-input class="w100" v-model="form1.couponValue2" :disabled="true"></el-input> 
              <span>折</span>
            </el-radio>
          </el-radio-group>
          <div v-if="form1.couponConditionType === '2'">
            订单满 <el-input class="w100" v-model="form1.couponConditionValue" :disabled="true"></el-input> 元时享受优惠，减 <el-input class="w100" :disabled="true" v-model="form1.couponValue1"></el-input> 元
          </div>
          <div v-if="form1.couponConditionType === '3'">
            订单满 <el-input class="w100" v-model="form1.couponConditionValue" :disabled="true"></el-input> 元时享受优惠，打 <el-input class="w100" :disabled="true" v-model="form1.couponValue2"></el-input> 折
          </div>
        </el-form-item>
        <el-form-item label="适用范围：">
          <el-radio-group v-model="form1.productScope" disabled>
            <el-radio label="1">全店商品</el-radio>
            <el-radio label="2">指定商品</el-radio>
            <el-radio label="3">指定商品不可用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="添加商品：" v-if="form1.productScope !== '1'">
          <el-button size="small" type="primary" icon="el-icon-plus" disabled plain>添加商品</el-button>
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
          <el-radio-group v-model="form.forUser" disabled>
            <el-radio label="0">不限制，所有人可以领取</el-radio>
            <el-radio label="1">只有店铺会员可以领取</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="每人限领次数：">
          <el-radio-group v-model="form.isLimitNum" disabled>
            <el-radio label="0">不限制</el-radio>
            <el-radio label="1"><el-input class="w100" v-model="form.limitNum" :disabled="true"></el-input> 次</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="过期提醒：">
          <el-checkbox-group v-model="form.isRemind" disabled>
            <el-checkbox label="1" name="type">优惠券过期前提醒买家</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="购买限制：">
          <el-checkbox-group v-model="form.isProductOriginal" disabled>
            <el-checkbox label="1" name="type">优惠券仅购买原价商品时可用</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="分享设置：">
          <el-checkbox-group v-model="form.isShare" disabled>
            <el-checkbox label="1" name="type">是否显示分享按钮</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="使用说明：">
          <el-input type="textarea" v-model="form.decription" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import formatDate from '../timeToString.js'

import { couponEditResponse, couponEditRequest } from '../server'
export default {
  data() {
    return {
      couponId: null,
      label: {
        name1: '选择商品',
        name2: '已择商品',
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
  mounted() {
    this.couponId = localStorage.getItem('couponId')
    this.couponEditResponse({couponId: this.couponId})
  },
  methods: {
    couponEditResponse(v) {
      couponEditResponse(v).then(res => {
        if (res.code === 200) {
          let list = res.data
          this.form1.couponName = list.couponName
          this.form1.couponNum = list.couponNum
          this.form1.couponConditionType = `${list.couponConditionType}`
          this.form1.fullDiscount = `${list.fullDiscount}`
          this.form1.couponConditionValue = list.couponConditionValue
          if (this.form1.couponConditionType === '1') {
            if (this.form1.fullDiscount === '1') {
              this.form1.couponValue1 = list['couponValue']
            }
            if (this.form1.fullDiscount === '2') {
              this.form1.couponValue2 = list['couponValue']
            }
          } else if (this.form1.couponConditionType === '2') {
            this.form1.couponValue1 = list['couponValue']
          } else if (this.form1.couponConditionType === '3') {
            this.form1.couponValue2 = list['couponValue']
          }
          this.form1.productScope = `${list.productScope}`
          this.form1.productIdList = list.productIdList

          this.form.validTimeType = `${list.validTimeType}`
          if (this.form.validTimeType === '1') {
            this.form.value1 = [list.validStartTime, list.validEndTime]
          }
          if (this.form.validTimeType === '2') {
            this.form.validDays1 = list['validDays']
          }
          if (this.form.validTimeType === '3') {
            this.form.validDays2 = list['validDays']
          }
          this.form.value2 = [list.sendStartTime, list.sendEndTime]
          this.form.forUser = `${list.forUser}`
          this.form.isLimitNum = `${list.isLimitNum}`
          this.form.limitNum = list.limitNum
          this.form.isShare = list.isShare === 1 ? true : false
          this.form.isProductOriginal = list.isProductOriginal === 1 ? true : false
          this.form.isRemind = list.isRemind === 1 ? true : false
          this.form.decription = list.decription
        } else {
          console.log(res)
        }
      }).catch(err => console.log(err))
    },
    logTimeChange() {
      this.validTimeTypeTime = formatDate(this.form.value1[0], 'yyyy-mm-dd') + ' - ' + formatDate(this.form.value1[1], 'yyyy-mm-dd')
    },
    isDate(v) {
      return Object.prototype.toString.call(v) === '[object Date]'
    },
    onSubmit() {
      let list = {}

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
      list['couponId'] = this.couponId

      couponEditRequest(list).then(res => res.code === 200 ? this.$router.push('/ump/coupon') : console.log(res)).catch(err => console.log(err))
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
