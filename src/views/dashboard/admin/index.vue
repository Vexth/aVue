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
          <top-table :top-data="topSaleProduct"></top-table>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <top-table :top-data="topSaleProduct"></top-table>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <top-table :top-data="topSaleProduct"></top-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TopTable from './components/TopTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import { mainIndicators, mainTopIndicators } from '../../shop/server'

export default {
  name: 'dashboard-admin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TopTable,
    TodoList,
    BoxCard
  },
  created() {
    this.getMainIndicators()
    this.getMainTopIndicators()
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
          }
        }
      },
      lineChartData: {},
      currentIndicators: {},
      topSaleProduct: {
        name: "销售排行",
        list: []
      },
    }
  },
  methods: {
    handleSetLineChartData(type) {
      // this.lineChartData = this.lineIndicators[type]
    },
    getMainTopIndicators() {
      mainTopIndicators().then(res => {
        //  console.log(res)
          if (res.code === 200) {

            if (res.data != undefined && res.data["mapIndicators"] !== undefined){
              var mapTop = res.data["mapIndicators"] 
              if (mapTop["1"] !== undefined) {
                
                var temp = {}
                temp["name"] = "七天产品销售排行(top10)"
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
                this.lineIndicators.playmentSum.indicatorsData.indicators.push(indicatorsInfo["playmentSum"])
              } else {
                this.lineIndicators.newVisitis.indicatorsData.indicators.push(0)
                this.lineIndicators.loginVisitis.indicatorsData.indicators.push(0)
                this.lineIndicators.orderCount.indicatorsData.indicators.push(0)
                this.lineIndicators.playmentSum.indicatorsData.indicators.push(0)
              }
              if (i == 6) {        
                this.currentIndicators = indicatorsInfo
                // this.currentIndicators["userCreateCount"] = 10
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
            return '';
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
