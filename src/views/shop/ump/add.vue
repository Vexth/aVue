<template>
  <div>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <div style="margin-bottom: 22px;">活动信息</div>
      <el-form-item label="活动名称">
        <el-input style="width:200px;" v-model="formLabelAlign.name" placeholder="活动名称"></el-input>
      </el-form-item>
      <el-form-item label="生效时间">
        <el-date-picker
          v-model="value4"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="">
        <el-checkbox v-model="checked">按周期重复</el-checkbox>
      </el-form-item> -->
      <el-form-item label="活动标签">
        <el-input style="width:200px;" v-model="formLabelAlign.region" placeholder="活动标签"></el-input>
      </el-form-item>
      <!-- <el-form-item label="活动形式">
        <el-input style="width:200px;" v-model="formLabelAlign.type"></el-input>
      </el-form-item> -->
      <div style="margin-bottom: 22px;">选择活动商品</div>
    </el-form>
    <el-tabs type="border-card">
      <el-tab-pane label="第一步：选择商品">
        <el-table
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="商品信息">
            <template slot-scope="scope">{{ scope.row.address }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="库存"
            width="120">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">Ok</el-button>
              <el-button type="primary" size="small" icon="el-icon-edit">Edit</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="第二步：设置折扣">
        <el-table
          ref="multipleTable"
          :data="tableData2"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            label="">
            <template slot-scope="scope">{{ scope.row.address }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label=""
            width="120">
          </el-table-column>
          <el-table-column
            align="center"
            label=""
            width="200">
            <template slot-scope="scope">
              <el-button type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">Ok</el-button>
              <el-button type="primary" size="small" icon="el-icon-edit">Edit</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'add',
  data() {
    return {
      tableData2: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      checked: false,
      value4: [],
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      }
    }
  },
  methods: {
    confirmEdit(row) {
      console.log(row)
    }
  }
}
</script>

<style scoped>
.el-tabs--border-card {
    background: #fff;
    border: 1px solid #dcdfe6;
    -webkit-box-shadow: 0 0px 0px 0 rgba(0,0,0,.12), 0 0 0px 0 rgba(0,0,0,.04);
    box-shadow: 0 0px 0px 0 rgba(0,0,0,.12), 0 0 0px 0 rgba(0,0,0,.04);
}
</style>
