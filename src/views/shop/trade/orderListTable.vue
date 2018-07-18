<template>
  <div>
    <ul class="row">
      <li :style="{width: item.width+'%'}" v-for="(item, i) in rows" :key="i">
        <span>{{item.label}}</span>
      </li>
    </ul>
    <div v-if="list.length === 0" class="table" style="padding: 24px;text-align: center;">暂无数据</div>
    <ul class="table" v-for="(item, i) in list" :key="i">
      <li class="cont">
        <div class="fl">
          <span>订单号：{{item.orderId}}</span>
        </div>
        <div class="fr">
          <el-button class="button" size="mini" @click="ChangDuo(i, item)">更多详情</el-button>
          <i @click="onStar(i, item)" :class="item.isStar === 1 ? 'el-icon-star-on' :'el-icon-star-off'"></i>
        </div>
      </li>
      <li class="contList">
        <ul>
          <li style="width: 20%; border-right: 0;" :style="{'padding-top: ': item.goodsList > 1 ? '20px' : '' }">
            <div class="imgName" v-for="(v, i) in item.goodsList" :key="i">
              <img class="fl" :src="v.imgUrl" />
              <div class="fl name">
                <p :title="v.goodsName">{{v.goodsName}}</p>
                <p :title="v.goodsAttrs">{{v.goodsAttrs}}</p>
              </div>
            </div>
          </li>
          <li :style="{'width': '9%', 'border-left': '1px solid rgb(216, 219, 227)', 'height': item.goodsList.length * 97 + 'px'}">
            <div class="imgName" style="display: block;" v-for="(v, i) in item.goodsList" :key="i">
              <p>￥{{v.unitPrice}}</p>
              <p>（{{v.count}}件）</p>
            </div>
          </li>
          <li :style="{'width': '9%','height': item.goodsList.length * 97 + 'px'}">
            <div class="abs">
              <el-select v-if="refund.indexOf(i) > -1" v-model="item.refundType" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span v-else>
                <span v-if="item.refundType === null || item.refundType === '-1' || item.refundType === 'null'">无</span>
                <span v-if="item.refundType === '1' || item.refundType === 1">退货中</span>
                <span v-if="item.refundType === '2' || item.refundType === 2">退货完成</span>
                <span v-if="item.refundType === '3' || item.refundType === 3">退款中</span>
                <span v-if="item.refundType === '4' || item.refundType === 4">退款完成</span>
                <span v-if="item.refundType === '5' || item.refundType === 5">协商中</span>
                <span v-if="item.refundType === '6' || item.refundType === 6">协商完成</span>
              </span>
              <i style="margin-right: 0;margin-top: 5px;" @click="refundType(i, item)" :class="refund.indexOf(i) > -1 ? 'el-icon-circle-check' : 'el-icon-edit-outline'"></i>
            </div>
          </li>
          <li :style="{'width': '9%','height': item.goodsList.length * 97 + 'px'}">
            <div style="display: block;">
              <p>{{item.username}}</p>
              <p>{{item.mobilePhone}}</p>
            </div>
          </li>
          <li :style="{'width': '9%','height': item.goodsList.length * 97 + 'px'}"><p>{{item.orderCreateTime}}</p></li>
          <li :style="{'width': '14%','height': item.goodsList.length * 97 + 'px'}">
            <div class="abs">
              ￥
              <el-input v-if="edit.indexOf(i) > -1" v-model="item.actualNeedMoney" autocomplete="off" autofocus="autofocus" onkeyup="value=value.replace(/[^\d^\.]+/g,'')"></el-input>
              <span v-else>{{item.actualNeedMoney}}</span>
              <i style="margin-right: 0;margin-top: 5px;" @click="editL(i, item)" :class="edit.indexOf(i) > -1 ? 'el-icon-circle-check' : 'el-icon-edit-outline'"></i>
            </div>
          </li>
          <li :style="{'width': '15%','height': item.goodsList.length * 97 + 'px'}">
            <!-- <span style="line-height: 30px;">等待店家服务/发货</span> -->
            <!-- 1待付款, 2待发货, 3已发货, 4已收货, 5已关闭 orderStatus -->
            <div v-if="isFalse.indexOf(i) > -1" :style="{display: xs ? 'block' : 'none'}">
              <span style="line-height: 30px;">是否需要物流</span>
              <div class="fk">
                <el-input class="wl" v-model="input" placeholder="请输入内容"></el-input>
              </div>
              <div class="fk">
                <el-button type="primary" size="mini" @click="sheet(input, item)">确认运单号</el-button>
                <el-button size="mini" @click="sheet(input, item)">无需物流</el-button>
              </div>
            </div>
            
            <div v-else>
              <span style="line-height: 30px;" v-if="item.orderStatus === '1' || item.orderStatus === 1">待付款</span>
              <span style="line-height: 30px;" v-if="item.orderStatus === '2' || item.orderStatus === 2">待发货</span>
              <span style="line-height: 30px;" v-if="item.orderStatus === '4' || item.orderStatus === 4">已收货</span>
              <span style="line-height: 30px;" v-if="item.orderStatus === '5' || item.orderStatus === 5">已关闭</span>
              <div :style="{display: xsdd ? 'block' : 'none'}" v-if="item.orderStatus !== 3 && item.orderStatus !== 5">
                <div class="fk">
                  <el-button size="mini" @click="cancel(item)">取消订单</el-button>
                </div>
                <div class="fk">
                  <el-button type="primary" size="mini" @click="confirm(i, item)">发货</el-button>
                </div>
              </div>
            </div>

            <div v-if="item.orderStatus === '3' || item.orderStatus === 3">
              <span style="line-height: 30px;" >已发货</span>
              <div class="fk">
                <el-button size="mini">顾客确认收货/服务</el-button>
              </div>
              <div class="fk">
                <el-button size="mini" @click="cancel1(item)">取消发货</el-button>
              </div>
            </div>
          </li>
          <li :style="{'width': '15%','height': item.goodsList.length * 97 + 'px'}"><p style="text-align: left;">{{item.userRemark}}</p></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      xs: true,
      xsdd: true,
      input: '',
      isFalse: [],
      sel: [],
      edit: [],
      refund: [],
      value: '',
      options: [
        {
          label: '无',
          value: '-1'
        },
        {
          label: '退货中',
          value: '1'
        },
        {
          label: '退货完成',
          value: '2'
        },
        {
          label: '退款中',
          value: '3'
        },
        {
          label: '退款完成',
          value: '4'
        },
        {
          label: '协商中',
          value: '5'
        },
        {
          label: '协商完成',
          value: '6'
        }
      ]
    }
  },
  props: {
    rows: Array,
    list: Array
  },
  methods: {
    ChangDuo(i, val) {
      this.sel.indexOf(i) === -1 ? this.sel.push(i) : this.sel = this.sel.filter(k => k !== i)
      this.$emit('duo', val)
    },
    // 加星
    onStar(i, val) {
      val.isStar = val.isStar === 1 ? 0 : 1
      this.$emit('star', val)
    },
    // 发货
    confirm(i, val) {
      this.isFalse.push(i)
    },
    sendGoods(list) {
      // POST /api/v1/shop/order/send/goods 设置发货状态
      this.axios.post('api/v1/shop/order/send/goods', list).then(res => {
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
        }
      }).catch(err => console.log(err))
    },
    // 确认运单号
    sheet(item, val) {
      if (this.input === '' && item === '3') {
        this.$message.error('运单号不能为空，请重新填写')
        return
      }
      const list = {
        orderId: val.orderId,
        orderStatus: '3'
      }
      if (item !== '') {
        list['shipmentNo'] = item
      }
      // POST /api/v1/shop/order/send/goods 设置发货状态
      this.axios.post('api/v1/shop/order/send/goods', list).then(res => {
        if (res.status === 200) {
          if (res.data.code === 200) {
            val.orderStatus = '3'
            this.xs = false
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
          } else {
            this.$message.error(res.data.msg)
          }
        }
      }).catch(err => console.log(err))
    },
    // 取消发货
    cancel1(val) {
      this.$confirm('您确认要取消发货？').then(_ => {
        const list = {
          orderId: val.orderId,
          orderStatus: '2'
        }
        // POST /api/v1/shop/order/send/goods 设置发货状态
        this.axios.post('api/v1/shop/order/send/goods', list).then(res => {
          if (res.status === 200) {
            if (res.data.code === 200) {
              this.isFalse = []
              val.orderStatus = '1'
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
            } else {
              this.$message.error(res.data.msg)
            }
          }
        }).catch(err => console.log(err))
      }).catch(_ => {})
    },
    // 取消订单
    cancel(val) {
      val.orderStatus = '5'
      // this.xsdd = false
      this.$emit('cancel', val)
    },
    editL(i, val) {
      this.edit.indexOf(i) === -1 ? this.edit.push(i) : this.edit = this.edit.filter(k => k !== i)
      this.$emit('edit', i, this.edit, val)
    },
    refundType(i, item) {
      if (this.refund.indexOf(i) === -1) {
        this.refund.push(i)
      } else {
        this.refund = this.refund.filter(k => k !== i)
        // POST /api/v1/shop/order/modify/refund 更新售后状态  orderId refundStatus
        const list = {
          orderId: item.orderId,
          refundStatus: item.refundType
        }
        this.axios.post('api/v1/shop/order/modify/refund', list).then(res => {
          if (res.status === 200) {
            if (res.data.code === 200) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
            } else {
              this.$message.error(res.data.msg)
            }
          }
        }).catch(err => console.log(err))
      }
    }
  }
}
</script>

<style scoped>
ul, li {
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 0;
}
.row {
 background: #f4f6f9;
 border: 1px solid #d8dbe3;
 margin-bottom: 15px;
 list-style-type: none;
 padding: 0;
 display: flex;
}
.row li {
  height: 60px;
  line-height: 60px;
  text-align: center;
  padding-left: 24px;
  padding-right: 24px;
  font-size: 14px;
}
.table {
  border: 1px solid rgb(216, 219, 227);
  margin-bottom: 15px;
}
.table .contList {
  border-top: 1px solid rgb(216, 219, 227);
  display: inline-block;
  width: 100%;
  text-align: center;
}
.table .contList li {
  padding: 0;
  border: 0;
  float: left;
  padding-left: 24px;
  padding-right: 24px;
  border-right: 1px solid rgb(216, 219, 227);
  font-size: 14px;
  padding-bottom: 10px;
  position: relative;
}
.table .contList li:last-child {
  border-right: 0;
}
li.cont {
  background: rgb(244, 246, 249);
  display: inline-block;
  width: 100%;
  line-height: 70px;
  padding: 0 24px;
  font-size: 14px;
}
.button {
  margin-right: 27px;
}
img {
  width: 80px;
  height: 80px;
  vertical-align: middle;
  margin-top: -3px;
}
p {
  height: 16px;
}
li.s {
  display: flex;
}
i {
  margin-right: 20px;
  font-size: 25px;
  vertical-align: middle;
  margin-top: -3px;
  color: #fe7348;
  cursor: pointer;
}
.fk {
  line-height: 24px;
  margin-bottom: 5px;
}

.imgName {
  display: flex;
  padding-top: 10px;
}
.imgName .name p {
  width: 190px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  margin-left: 5px;
}

.abs{
  display: flex;
  line-height: 36px;
  position: absolute;
  left: 10px;
  right: 10px;
  top: 50%;
  margin-top: -18px;
}

.el-select-dropdown__item{
  font-size: 14px;
  padding: 0 20px;
}
</style>
