<template>
  <div class="orderHander">
    <el-row>
      <el-col :span="7">
        <div class="grid-content">
          <el-select style="width: 150px;" v-model="formInline.carInfoId" placeholder="订单号" clearable>
            <el-option label="区域一" value="0"></el-option>
            <el-option label="区域二" value="1"></el-option>
          </el-select>
          <el-input v-model="formInline.title" placeholder="订单号" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <span>下单时间：</span>
          <el-date-picker
            v-model="value"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </div>
      </el-col>
      <el-button @click="query7">近7天</el-button>
      <el-button @click="query30">近30天</el-button>
    </el-row>
    <el-row>
      <el-col :span="7">
        <div class="grid-content">
          <span style="width: 150px;">商品名称：</span>
          <el-input v-model="formInline.title" placeholder="商品名称" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <span>物流方式：</span>
          <el-select v-model="formInline.groupId" placeholder="物流方式" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4" style="margin-left: 80px;">
        <div class="grid-content">
          <span>订单类型：</span>
          <el-select v-model="formInline.categoryId" placeholder="订单类型" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </el-col>
      
    </el-row>
    <el-row>
      <el-col :span="7">
        <div class="grid-content">
          <span style="width: 150px;">付款方式：</span>
          <el-select v-model="formInline.carInfoId" placeholder="付款方式" clearable>
            <el-option label="区域一" value="0"></el-option>
            <el-option label="区域二" value="1"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <span>维权转台：</span>
          <el-select v-model="formInline.carInfoId" placeholder="维权转台" clearable>
            <el-option label="区域一" value="0"></el-option>
            <el-option label="区域二" value="1"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4" style="margin-left: 80px;">
        <div class="grid-content">
          <span>订单来源：</span>
          <el-select v-model="formInline.carInfoId" placeholder="订单来源" clearable>
            <el-option label="区域一" value="0"></el-option>
            <el-option label="区域二" value="1"></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <div style="text-align: center;margin-top: 15px;">
      <el-button style="width: 136px;" type="primary" @click="query">查询</el-button>
      <el-button style="width: 136px;" type="primary" @click="Export">导出报表</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
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
      value: '',
      options: [],
      formInline: {}
    }
  },
  methods: {
    date(i) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * i)
      this.value = [start, end]
    },
    // 近7天
    query7() {
      this.date(7)
    },
    // 近30天
    query30() {
      this.date(30)
    },
    // 查询
    query() {
      this.$emit('query', this.formInline)
    },
    // 导出
    Export() {
      this.$emit('Export', this.formInline)
    }
  }
}
</script>

<style scoped>
.orderHander {
  background: #f4f6f9;
  display: inline-block;
  padding: 35px;
  border: 1px solid #d8dbe3;
  margin-top: 10px;
  margin-bottom: 15px;
}
.el-col-4 {
  width: 281px;
}
.el-col-7{
  width: 491px;
}

.el-input{
  width: 200px;
}

.grid-content {
  min-height: 36px;
  margin-bottom: 35px;
}
.grid-content span {
  width: 70px;
  font-size: 14px;
  display: inline-block;
  text-align: right;
}
</style>
