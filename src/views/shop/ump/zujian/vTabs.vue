<template>
  <el-tabs type="border-card">
    <el-tab-pane :label="label.name1">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="商品分类：">
          <el-select v-model="formInline.region" placeholder="选择商品分类">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.groupId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称：">
          <el-input v-model="formInline.user" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="商品信息">
          <template slot-scope="scope">{{ scope.row.address }}</template>
        </el-table-column>
        <el-table-column prop="name" label="库存" width="120">
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane :label="label.name2">
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
</template>

<script>
import { tree } from '../../server'
export default {
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      options: [],
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
      }]
    }
  },
  props: ['label'],
  mounted() {
    tree().then(res => this.options = res.data)
  },
  methods: {
    confirmEdit(row) {
      console.log(row)
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style>

</style>
