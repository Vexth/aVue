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
          <el-col >
            <div class="block">
              <span class="demonstration"></span>
              <el-date-picker
                v-model="pickerDateRange"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </el-col>
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
          <el-input type="textarea" v-model="form.vendorRemark"></el-input>
        </el-form-item>
        <el-form-item  label="活动商品:">
          <el-col>
            <el-radio-group v-model="form.productRange" @change="productRangeChange">
              <el-radio label="1" border>所有商品参加</el-radio>
              <el-radio label="2" border>部分商品参加</el-radio>
              <el-radio label="3" border>部分商品不参加</el-radio>
            </el-radio-group>
          </el-col>
          <el-col v-if="form.productRange !== '1'">
            <el-button type="primary" size="mini" @click="dialogTableVisible = true">+ 添加商品</el-button>

            <!--弹窗依赖product_range类型-->
            <product-table-select-dialog
              :visible.sync="dialogTableVisible"
              :tableData="form.tableData"
              @onProductSelectChange="tableDataChange"
            ></product-table-select-dialog>

          </el-col>
        </el-form-item>

        <!--选择商品的弹窗-->
        <!--<el-dialog title="选择商品" width="60%" :visible.sync="dialogTableVisible">-->
          <!--<product-table :tableData="form.tableData"></product-table>-->
        <!--</el-dialog>-->


        <!--<span slot="footer" class="dialog-footer">-->
          <el-form-item>
            <el-button type="success" size="big" @click="onSubmit" round>创建活动</el-button>
            <!--<el-button size="big" >取消</el-button>-->
          </el-form-item>
        <!--</span>-->
      </el-form>
    </div>



  </div>

</template>

<script>
  import ProductTableSelectDialog from '@/views/promotionCenter/components/ProductTableSelectDialog';
  export default {
    name: 'fullReductionCreate',
    components: { ProductTableSelectDialog },
    data() {
      return {
        dialogTableVisible: false,
        // 以下是表单数据
        form: {
          fullReductionRules: [{
            full: '',
            reduction: ''
          }],
          name: '',
          tag: '',
          limitProductAmount: '', // 限制商品库存数量
          limitUserAmount: '', // 限制用户使用数量 每个用户1次
          channel: [],
          user_range: '',
          resource: '',
          promotionLink: '',
          productRange: '2',
          vendorRemark: '',
          tableData: [] // 选择的表单数据
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
      // 表格组件回传变化数据
      tableDataChange(val) {
        console.log(val)
      },
      // 产品范围变更 清空原有的
      productRangeChange(val) {
        // if (val === '1') { // 产品范围为1 所有商品都参加
        //   this.form.tableData = []
        // }
        // console.log(val)
      },
      onSubmit() {
        console.log('submit!')
        console.log('date = ' + this.pickerDateRange)
        console.log(this.form)
      },
      // 规则添加和修改
      removeRule(item) {
        const index = this.form.fullReductionRules.indexOf(item)
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
