<template>
  <div class="dashboard-editor-container">
    <!-- <github-corner></github-corner> -->

    <panel-group @handleSetLineChartData="handleSetLineChartData" :indicators-data="currentIndicators"></panel-group>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"></line-chart>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <topsale-table :top-data="topSaleProduct"></topsale-table>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <stock-table :stock-data="stockList"></stock-table>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <needsend-table :send-data="needsendList"></needsend-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TopsaleTable from './components/TopsaleTable'
import StockTable from './components/StockTable'
import NeedsendTable from './components/NeedsendTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import { mainIndicators, mainTopIndicators, mainStockIndicators, mainNeedSendIndicators } from '../../shop/server'

export default {
  name: 'dashboard-admin',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TopsaleTable,
    NeedsendTable,
    StockTable,
    TodoList,
    BoxCard
  },
  created() {
    this.getMainIndicators()
    this.getMainTopIndicators()
    this.getMainStockIndicators()
    this.getMainNeedSendIndicators()
	},
  data() {
    return {
      lineIndicators: {
        newVisitis: {
          indicatorsData: {
            name: '新增用户',
            dateName: [],
            indicators: []
          }
        },
        loginVisitis: {
          indicatorsData: {
            name: '访问用户',
            dateName: [],
            indicators: []
          }
        },
        orderCount: {
          indicatorsData: {
            name: '付款订单',
            dateName: [],
            indicators: []
          }
        },
        playmentSum: {
          indicatorsData: {
            name: '销售金额',
            dateName: [],
            indicators: []
            // dateName: ['2018-08-22','2018-08-23','2018-08-24','2018-08-25','2018-08-26','2018-08-27','2018-08-28'],
            // indicators: [12.43, 15.11, 88.11, 43.02, 43.21, 43.53, 49.43]
          }
        }
      },
      lineChartData: {},
      currentIndicators: {},
      topSaleProduct: {
        name: "七天产品销售排行(凌晨两点更新)",
        list: []
      },
      stockList: [],
      needsendList: []
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = this.lineIndicators[type]
    },
    getMainStockIndicators() {
      mainStockIndicators().then(res => {
        //  console.log(res)
          if (res.code === 200) {

            if (res.data != undefined){
                this.stockList = res.data
                // console.log(this.topSaleProduct)
            }

          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => console.log(err))
    },
    getMainNeedSendIndicators() {
      mainNeedSendIndicators().then(res => {
          console.log(res)
          if (res.code === 200) {

            if (res.data != undefined){
                this.needsendList = res.data
                // console.log(this.topSaleProduct)
            }

          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => console.log(err))
    },
    getMainTopIndicators() {
      mainTopIndicators().then(res => {
        //  console.log(res)
          if (res.code === 200) {

            if (res.data != undefined && res.data["mapIndicators"] !== undefined){
              var mapTop = res.data["mapIndicators"]
              if (mapTop["1"] !== undefined) {

                var temp = {}
                temp["name"] = "七天产品销售排行(凌晨两点更新)"
                temp["list"] = mapTop["1"]
                this.topSaleProduct = temp
                // console.log(this.topSaleProduct)
              }
            }

          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => console.log(err))
    },
    getMainIndicators() {
        mainIndicators().then(res => {
          if (res.code === 200) {
            console.log(res)
            for (var i=0; i < 7; i++){
              var currentDate = this.addDate(res.data.dateStr, i-6)
              var indicatorsInfo = res.data.mapIndicators[currentDate]
              this.lineIndicators.newVisitis.indicatorsData.dateName.push(currentDate)
              this.lineIndicators.loginVisitis.indicatorsData.dateName.push(currentDate)
              this.lineIndicators.orderCount.indicatorsData.dateName.push(currentDate)
              this.lineIndicators.playmentSum.indicatorsData.dateName.push(currentDate)
              if ( indicatorsInfo !== undefined) {
                this.lineIndicators.newVisitis.indicatorsData.indicators.push(indicatorsInfo["userCreateCount"])
                this.lineIndicators.loginVisitis.indicatorsData.indicators.push(indicatorsInfo["userLoginCount"])
                this.lineIndicators.orderCount.indicatorsData.indicators.push(indicatorsInfo["orderCount"])
                this.lineIndicators.playmentSum.indicatorsData.indicators.push(indicatorsInfo["playmentSum"]/100)
              } else {
                this.lineIndicators.newVisitis.indicatorsData.indicators.push(0)
                this.lineIndicators.loginVisitis.indicatorsData.indicators.push(0)
                this.lineIndicators.orderCount.indicatorsData.indicators.push(0)
                this.lineIndicators.playmentSum.indicatorsData.indicators.push(0)
              }
              if (i == 6) {
                this.currentIndicators = indicatorsInfo
                this.currentIndicators["playmentSum"] = (this.currentIndicators["playmentSum"])
                // this.currentIndicators["playmentSum"] = 9901
              }
            }
            this.lineChartData = this.lineIndicators.loginVisitis
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => console.log(err))
    },

    // 日期，在原有日期基础上，增加days天数，默认增加1天
    addDate(date, days) {
        // if (days == undefined || days == '') {
        //     days = 1;
        // }
        var date = new Date(date);
        if (days != 0) {
          date.setDate(date.getDate() + days);
        }
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return date.getFullYear() + '-' + this.getFormatDate(month) + '-' +this.getFormatDate(day);
    },

    // 日期月份/天的显示，如果是1位数，则在前面加上'0'
    getFormatDate(arg) {
        if (arg == undefined || arg == '') {
            return ''
        }

        var re = arg + '';
        if (re.length < 2) {
            re = '0' + re;
        }

        return re;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
