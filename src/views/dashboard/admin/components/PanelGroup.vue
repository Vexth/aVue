<template>
  <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('loginVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">访问用户</div>
          <!-- <count-to class="card-panel-num" :startVal="0" :endVal="81212" :duration="3000"></count-to> -->
          <!-- <count-to class="card-panel-num"  :startVal=indicatorsData.userLoginCount :endVal=indicatorsData.userLoginCount :duration="1"></count-to> -->
          <span class="card-panel-num">{{indicatorsData.userLoginCount}}</span>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">新增用户</div>
          <!-- <count-to class="card-panel-num" :startVal="0" :endVal="102400" :duration="2600"></count-to> -->
          <!-- <count-to class="card-panel-num"  :startVal=indicatorsData.userCreateCount :endVal=indicatorsData.userCreateCount :duration="1"></count-to> -->
          <span class="card-panel-num">{{indicatorsData.userCreateCount}}</span>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('orderCount')">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">付款订单</div>
          <!-- <count-to class="card-panel-num" :startVal="0" :endVal="9280" :duration="3200"></count-to> -->
          <!-- <count-to class="card-panel-num"  :startVal=indicatorsData.orderCount :endVal=indicatorsData.orderCount :duration="1"></count-to> -->
          <span class="card-panel-num">{{indicatorsData.orderCount}}</span>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('playmentSum')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">销售金额</div>
          <span class="card-panel-num">{{indicatorsData.playmentSum/100|numFilter}}</span>
          <!-- <count-to class="card-panel-num" :startVal="0" :endVal="13600" :duration="3600"></count-to> -->
          <!-- <p class="card-panel-num">indicatorsData.playmentSum</p> -->
          <!-- <count-to class="card-panel-num"  :startVal=indicatorsData.playmentSum :endVal=indicatorsData.playmentSum :duration="1"></count-to> -->
          <!-- <span class="card-panel-num">{{indicatorsData.playmentSum/100|numFilter}}</span> -->
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  props: {
    indicatorsData: {
      type: Object
    }
  },
  components: {
    CountTo
  },
  // watch: {
  //   indicatorsData: {
  //     deep: true,
  //     handler(val) {
  //        this.setOptions(val)
  //       //  console.log(val)
  //     }
  //   }
  // },
  data() {
    return {
      // indicatorsData: {}
    }
  },
  filters: {
  numFilter(value) {
      // 截取当前数据到小数点后两位
      let realVal = Number(value).toFixed(2)
      // num.toFixed(2)获取的是字符串
      return Number(realVal)
    }
  },
  methods: {
    setOptions({ currentIndicators } = {}) {
        // console.log(currentIndicators)
        console.log(this.indicatorsData)
    },
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
