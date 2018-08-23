<template>
  <div class="app-container" >
    <div style="width:80%">
      <el-form ref="form" :model="form" label-width="80px" class="demo-form-inline">
        <el-form-item   label="活动名称:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动标签:">
          <el-input v-model="form.tag"></el-input>
        </el-form-item>
        <!--<el-form-item label="促销渠道">-->
          <!--<el-select v-model="form.channel" placeholder="请选择活动促销渠道">-->
            <!--<el-option label="小程序" value=1></el-option>-->
            <!--<el-option label="App" value=2></el-option>-->
            <!--<el-option label="H5" value=3></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item style="display: block" label="活动时间:">
          <el-col :span="11">
            <div class="block">
              <span class="demonstration"></span>
              <el-date-picker
                v-model="pickerDateRange"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </div>
            <!--<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>-->
          </el-col>
          <!--<el-col class="line" :span="2">-</el-col>-->
          <!--<el-col :span="11">-->
            <!--<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>-->
          <!--</el-col>-->
        </el-form-item>
        <!--<el-form-item label="促销渠道">-->
          <!--<el-switch v-model="form.delivery"></el-switch>-->
        <!--</el-form-item>-->
        <el-form-item style="display: block" label="促销渠道:">
          <el-checkbox-group v-model="form.channel">
            <el-checkbox label="小程序" name="miniApp"></el-checkbox>
            <el-checkbox label="app" name="app"></el-checkbox>
            <el-checkbox label="H5" name="H5"></el-checkbox>
            <el-checkbox label="PC" name="PC"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="用户范围:">
          <el-radio-group v-model="form.user_range">
            <el-radio label="所有用户" name="1"></el-radio>
            <el-radio label="用户首单" name="2"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="活动规则:">
        </el-form-item>
        <!--<el-form-item label="满：">-->
          <!--<el-col :span="11">-->
            <!--<el-input v-model="form.title"></el-input>-->
          <!--</el-col>-->
          <!--<el-col class="line" :span="1">减:</el-col>-->
          <!--<el-col :span="11">-->
            <!--<el-input v-model="form.title"></el-input>-->
          <!--</el-col>-->
        <!--</el-form-item>-->

        <el-form-item
          v-for="(rule, index) in form.fullReductionRules"
          :label="(index+1) + '级  满：'"
          :key="rule.key"
          >
          <el-col :span="3">
            <el-input v-model="rule.full"></el-input>
          </el-col>
          <!--<el-col :span="1">&nbsp;</el-col>-->
          <el-col :span="1">&nbsp;&nbsp;&nbsp;减:</el-col>
          <el-col :span="4">
            <el-input v-model="rule.reduction"></el-input>
          </el-col>
          <!--<el-input v-model="domain.value.v1">-->
          <!--<el-input v-model="domain.value.v2">-->
          <!--<el-input v-model="domain.vauue2">-->
          <!--<el-input v-model="domain.value">-->
          <!--</el-input>-->
          <el-col :span="4">
            <el-button type="danger" size="mini" icon="el-icon-delete" @click.prevent="removeRule(rule)" circle></el-button>
          </el-col>
        </el-form-item>
        <el-form-item>
          <!--<el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>-->
          <el-button type="primary" size="mini" @click="addRule">+ 新增满减规则</el-button>
          <!--<el-button @click="resetForm('form')">重置</el-button>-->
        </el-form-item>
        <el-form-item label="活动备注">
          <el-input type="textarea" v-model="form.vendor_remark"></el-input>
        </el-form-item>
        <el-form-item label="活动商品:">
          <el-col>
            <el-radio-group v-model="form.product_range">
              <el-radio label="1">所有商品参加</el-radio>
              <el-radio label="2">部分商品参加</el-radio>
              <el-radio label="3">部分商品不参加</el-radio>
            </el-radio-group>
          </el-col>
          <el-col v-if="form.product_range !== '1'">
            <el-button type="primary" size="mini" @click="openDialog()">+ 添加商品</el-button>
          </el-col>

        </el-form-item>


        <div v-if="form.product_range !== '1'">
          <!--参考商品的表格-->
          <el-table
            :data="form.tableData"
            style="width: 100%">
            <el-table-column
              label="ID"
              width="180">
              <template slot-scope="scope">
                <!--<i class="el-icon-time"></i>-->
                <span style="margin-left: 10px">{{ scope.row.productId }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="商品名称"
              width="180">
              <template slot-scope="scope">
                <!--<i class="el-icon-time"></i>-->
                <span style="margin-left: 10px">{{ scope.row.productName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="市场价"
              width="180">
              <template slot-scope="scope">
                <!--<i class="el-icon-time"></i>-->
                <span style="margin-left: 10px">{{ scope.row.productPrice }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="库存"
              width="180">
              <template slot-scope="scope">
                <!--<i class="el-icon-time"></i>-->
                <span style="margin-left: 10px">{{ scope.row.productStock }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeleteProduct(scope.$index, scope.row)">取消参加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!--<span slot="footer" class="dialog-footer">-->
          <el-form-item>
            <el-button type="success" size="big" @click="onSubmit" round>创建活动</el-button>
            <!--<el-button size="big" >取消</el-button>-->
          </el-form-item>
        <!--</span>-->
      </el-form>


    </div>


    <el-dialog title="选择商品" width="60%"
               :visible.sync="dialogTableVisible">
      <el-form :inline="true" :model="formInDialogQueryParams" class="demo-form-inline">
        <el-form-item label="商品分类：">
          <el-select v-model="formInDialogQueryParams.groupId" placeholder="选择商品分类">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.groupId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称：">
          <el-input v-model="formInDialogQueryParams.title" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectProductList">查询</el-button>
        </el-form-item>
      </el-form>


      <el-table
        :data="dialogTableData"
        tooltip-effect="dark"
      >
        <el-table-column prop="productId" label="ID" width="150"></el-table-column>
        <el-table-column prop="productName" label="商品名称" width="400"></el-table-column>
        <el-table-column prop="productPrice" label="市场价(元)"></el-table-column>
        <el-table-column prop="productStock" label="库存"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.isShow"
              size="mini"
              type="primary"
              @click="handleAddProduct(scope.$index, scope.row)">参加</el-button>
            <el-button
              v-else
              disabled="disabled"
              size="mini"
              type="primary"
              @click="handleAddProduct(scope.$index, scope.row)">已参加</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :pagination="pagination"
        :page-sizes="pagination.sizes"
        :page-size="pagination.size"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="handleAddProductConfirm()">确 定</el-button>-->
    </span>
    </el-dialog>

  </div>

</template>

<script>
  import { tree, shopProductList } from '@/views/shop/server'
  export default {
    name: 'fullReduction',
    data() {
      return {
        // 以下是对话框中的表单
        dialogTableData: [
          {
            productId: '',
            productName: '',
            productPrice: '',
            productStock: '',
            isShow: false
          }
        ],
        dialogTableVisible: false,
        pagination: {
          total: 100,
          size: 10,
          page: 1,
          sizes: [10, 20, 50, 100]
        },
        formInDialogQueryParams: {
          title: '',
          groupId: ''
        },
        options: [],
        // multipleSelection: {},
        // tableData: [
        //   {
        //     productId: '',
        //     productName: '',
        //     productPrice: '',
        //     productStock: ''
        //   }
        // ],
        // 以下是表单数据
        form: {
          fullReductionRules: [{
            full: '',
            reduction: ''
          }],
          name: '',
          tag: '',
          limit_product_amount: '',
          limit_user_amount: '',
          channel: [],
          user_range: '',
          resource: '',
          promotion_link: '',
          product_range: '2',
          vendor_remark: '',
          tableData: []
        },
        pickerDateRange: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pagination.size = val
        this.selectProductList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.pagination.page = val
        this.selectProductList()
      },
      // handleSelectionChange(val) {
      //   this.multipleSelection = val
      // },
      openDialog() {
        tree().then(res => {
          this.options = res.data
        }).catch(err => console.log(err))
        this.selectProductList()
      },
      selectProductList() {
        this.dialogTableVisible = true
        const query = this.formInDialogQueryParams
        query.pageNum = this.pagination.page
        query.pageSize = this.pagination.size
        shopProductList(query).then(res => {
          this.pagination.total = res.total
          // this.dialogTableData = res.data
          // console.log(res.data)
          if (res.data) {
            this.dialogTableData = res.data.map(e => {
              const o = {}
              o.productId = e.product.id
              o.productName = e.product.title
              o.productPrice = e.product.priceUnderline
              o.productStock = e.stockAmount
              o.isShow = this.form.tableData.filter(e => {
                return e.productId === o.productId
              }).length === 0
              // console.log(x)
              // if (x.length === 0) {
              // }
              return o
            })
            console.log(this.dialogTableData)
          }
        }).catch(err => console.log(err))
      },
      handleDeleteProduct(i, row) {
        // console.log(i)
        // console.log(row)
        var index = this.form.tableData.indexOf(row)
        if (index !== -1) {
          this.form.tableData.splice(index, 1)
        }
      },
      handleAddProduct(index, row) {
        // console.log(index)
        // console.log(row)
        row.isShow = false
        this.form.tableData.push(row)
      },
      handleAddProductConfirm() {
        const selection = this.multipleSelection
        console.log(selection)
        selection.forEach(sel => this.tableData.push(sel))
        // console.log(index)
        // console.log(row)
        // this.tableData.push(row)
        // console.log(row.roleId)
        // const roleId = row.roleId
        // roleDelete({ roleId }).then(response => {
        //   if (response.code === 200) {
        //     // console.log(response)
        //     this.dialogVisible = false
        //     this.list()
        //   }
        // }).catch(err => console.log(err))
      },
      onSubmit() {
        console.log('submit!')
        console.log('date = ' + this.pickerDateRange)
        console.log(this.form)
      },
      // resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // },
      removeRule(item) {
        var index = this.form.fullReductionRules.indexOf(item)
        if (index !== -1) {
          this.form.fullReductionRules.splice(index, 1)
        }
      },
      addRule() {
        this.form.fullReductionRules.push({
          full: '',
          reduction: '',
          key: Date.now()
        })
      }
    }
  }
</script>

<style scoped>

</style>
