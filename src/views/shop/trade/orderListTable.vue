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
          <span>订单号：{{item.album_id}}</span>
        </div>
        <div class="fr">
          <el-button class="button" size="mini" @click="onChang(i)">更多详情</el-button>
          <i @click="onStar(i, item)" :class="isStart.indexOf(i) > -1 ? 'el-icon-star-on' :'el-icon-star-off'"></i>
        </div>
      </li>
      <li class="contList">
        <ul>
          <li style="width: 20%">
            <div class="imgName">
              <img class="fl" src="http://p9l3k4x4g.bkt.clouddn.com/20180706165011image39453.jpg" />
              <span class="fl" :title="item.si_proxycompany">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</span>
            </div>
            <div class="imgName">
              <img class="fl" src="http://p9l3k4x4g.bkt.clouddn.com/20180706165011image39453.jpg" />
              <span class="fl" :title="item.si_proxycompany">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</span>
            </div>
          </li>
          <li :style="{'width': '9%','height': 2 * 87 + 'px'}"><p>{{item.si_proxycompany}}22222</p></li>
          <li :style="{'width': '9%','height': 2 * 87 + 'px'}"><p>{{item.si_proxycompany}}333333333</p></li>
          <li :style="{'width': '9%','height': 2 * 87 + 'px'}"><p>{{item.si_proxycompany}}44444444</p></li>
          <li :style="{'width': '9%','height': 2 * 87 + 'px'}"><p>{{item.si_proxycompany}}55555555</p></li>
          <li :style="{'width': '9%','height': 2 * 87 + 'px'}">
            <div v-if="item.biaoshi === 'lossless'" style="margin-top: 15px;">
              <div class="fk">待付款</div>
              <div class="fk">
                <el-button type="primary" size="mini" @click="confirm(item)">确认已付款</el-button>
              </div>
              <div class="fk">
                <el-button size="mini" @click="cancel(item)">取消订单</el-button>
              </div>
            </div>
            <div v-else><p>交易完成</p></div>
          </li>
          <li :style="{'width': '9%','height': 2 * 87 + 'px'}"><p>{{item.si_proxycompany}}7777777</p></li>
          <li :style="{'width': '17%','height': 2 * 87 + 'px'}"><p>{{item.si_proxycompany}}</p></li>
          <li :style="{'width': '9%','height': 2 * 87 + 'px'}"><p>{{item.si_proxycompany}}99999999</p></li>
        </ul>
      </li>
      <li class="contBottom" :class="{'s': sel.indexOf(i) > -1}">
        <div>
          <p>地址：{{item.si_proxycompany}}</p>
          <p>服务时间：{{item.publishtime}}</p>
        </div>
        <div>
          <p>付款方式：</p>
          <p>支付时间：{{item.publishtime}}</p>
        </div>
        <div>
          <p>取货方式：代取代送</p>
          <p>支付流水线：</p>
        </div>
        <div>
          <p>店家备注：纯纯粹粹纯纯粹粹纯纯粹粹尺寸</p>
          <p>车主车型：丰田 TV7167GL</p>
        </div>
        <div>
          <p></p>
          <p>其他：</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sel: [],
      isStart: []
    }
  },
  props: {
    rows: Array,
    list: Array
  },
  methods: {
    onChang(i) {
      console.log(this.list)
      this.sel.indexOf(i) === -1 ? this.sel.push(i) : this.sel = this.sel.filter(k => k !== i)
    },
    // 加星
    onStar(i, val) {
      this.isStart.indexOf(i) === -1 ? this.isStart.push(i) : this.isStart = this.isStart.filter(k => k !== i)
      this.$emit('star', val)
    },
    // 确认已付款
    confirm(val) {
      this.$emit('confirm', val)
    },
    // 取消订单
    cancel(val) {
      this.$emit('cancel', val)
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
li.contBottom {
  border-top: 1px solid rgb(216, 219, 227);
  font-size: 14px;
  display: flex;
  padding-left: 24px;
  padding-right: 24px;
  display: none;
}
.contBottom div {
  margin-right: 40px;
  width: 20%;
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
.imgName span {
  width: 200px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin-top: 30px;
}
</style>
