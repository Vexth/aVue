<template>
  <div class="app-container" >
    <div style="width:80%">
      <el-form ref="formRules" :rules="formRules" :model="form" label-width="100px" class="demo-form-inline">
        <el-form-item  prop="name"  label="活动名称:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="tag" label="活动标签:">
          <el-input  v-model="form.tag"></el-input>
        </el-form-item>

        <el-form-item  prop="pickerDateRange" label="活动时间:">
          <el-col>
            <!--<div class="block">-->
              <!--<span class="demonstration"></span>-->
              <el-date-picker
                type="datetimerange"
                size="large"
                align="right"
                unlink-panels
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd hh:mm:ss"
                v-model="pickerDateRange"
                :picker-options="pickerOptions">
              </el-date-picker>
            <!--</div>-->
          </el-col>
        </el-form-item>

        <!--<el-form-item label="促销渠道">-->
          <!--<el-switch v-model="form.delivery"></el-switch>-->
        <!--</el-form-item>-->
        <el-form-item style="display: block" label="促销渠道:" v-if="false">
          <el-checkbox-group v-model="form.channel">
            <el-checkbox label="1">小程序</el-checkbox>
            <el-checkbox label="2">app</el-checkbox>
            <el-checkbox label="3">H5</el-checkbox>
            <el-checkbox label="4">PC</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="用户范围:">
          <el-radio-group :disabled="true" v-model="form.userRange">
            <el-radio label="1">所有用户</el-radio>
            <el-radio label="2">用户首单</el-radio>
          </el-radio-group>
        </el-form-item>

        <!--<el-form-item  label="库存限制:">-->
          <!--<el-input-number size="mini" v-model="form.limitProductAmount" :precision="0" :step="10" ></el-input-number>-->
        <!--</el-form-item>-->

        <!--<el-form-item  label="用户购买限制:">-->
          <!--<el-input-number size="mini" v-model="form.limitUserAmount" :precision="0" :step="1" ></el-input-number>-->
        <!--</el-form-item>-->

        <el-form-item prop="fullReductionRules" label="活动规则:">
        </el-form-item>
        <!--满减活动规则-->
        <el-form-item
          v-for="(rule, index) in form.fullReductionRules"
          :label="(index+1) + '级  满：'"
          :key="rule.key"
          >
          <el-col :span="4">
            <el-input-number v-model="rule.full" :precision="2" :step="100" :min="0"></el-input-number>
          </el-col>
          <el-col :span="1">&nbsp;&nbsp;&nbsp;减:</el-col>
          <el-col :span="4">
            <el-input-number v-model="rule.reduction" :precision="2" :step="10" :min="0"></el-input-number>
          </el-col>
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
              <el-radio label="0" border>所有商品参加</el-radio>
              <el-radio label="1" border>部分商品参加</el-radio>
              <el-radio label="2" border>部分商品不参加</el-radio>
            </el-radio-group>
          </el-col>
          <el-col v-if="showAddProductButton">
            <el-button type="primary" size="mini" @click="dialogTableVisible = true">+ 添加商品</el-button>
          </el-col>
        </el-form-item>

        <!--选择商品的弹窗-->
        <product-table-select-dialog  v-if="showAddProductButton"
          :visible.sync="dialogTableVisible"
          :tableData="form.tableData"
          @onProductSelectChange="tableDataChange"
        ></product-table-select-dialog>


        <!--<span slot="footer" class="dialog-footer">-->
          <el-form-item>
            <el-button type="success" size="big" @click="onSubmit" round>{{editType}}</el-button>
            <!--<el-button size="big" >取消</el-button>-->
          </el-form-item>
        <!--</span>-->
      </el-form>
    </div>



  </div>

</template>

<script>
  import { promotionCreate, promotionModify } from '@/api/promotion'
  import ProductTableSelectDialog from '@/views/promotionCenter/components/ProductTableSelectDialog'
  export default {
    name: 'fullReductionCreate',
    components: { ProductTableSelectDialog },
    props: {
      data: {
        type: Object,
        default: null
      },
      editType: {
        type: String,
        default: '创建活动'
      }
    },
    // watch: {
    //   form(val) {
    //     console.log(val)
    //     this.form.name = val.name
    //   }
    // },
    mounted() {
      if (this.data) {
        console.log('mounted' + this.data)
        this.form.promotionId = this.data.promotionId
        this.form.vendorId = this.data.vendorId
        this.form.name = this.data.name
        this.form.tag = this.data.tag
        this.form.limitProductAmount = this.data.limitProductAmount
        this.form.limitUserAmount = this.data.limitUserAmount
        this.form.vendorRemark = this.data.vendorRemark
        this.form.productRange = this.data.productRange

        this.form.fullReductionRules = JSON.parse(this.data.ruleStrategy)

        if (this.data.productIdList) {
          this.form.tableData = this.data.productIdList.map(id => {
            return {
              productId: id
            }
          })
        }
        this.pickerDateRange = [this.data.beginTime, this.data.endTime]
      }

    },
    data() {
      const validateNotNull = (rule, value, callback) => {
        // if (!isvalidUsername(value)) {
        if (!value) {
          callback(new Error('不能为空！'))
        } else {
          callback()
        }
      }
      // const validateFullReductionRules = (rule, value, callback) => {
      //   // if (!isvalidUsername(value)) {
      //   console.log(value)
      //   if (!value) {
      //     callback(new Error('不能为空！'))
      //   } else {
      //     callback()
      //   }
      // }
      // const validateDataTime = (rule, value, callback) => {
      //   console.log(value)
      //   // if (!isvalidUsername(value)) {
      //   if (!value) {
      //     callback(new Error('不能为空！'))
      //   } else {
      //     callback()
      //   }
      // }
      return {
        formRules: {
          name: [{ required: true, trigger: 'blur', validator: validateNotNull }],
          tag: [{ required: true, trigger: 'blur', validator: validateNotNull }]
          // fullReductionRules: [{ required: true, trigger: 'blur', validator: validateFullReductionRules }],
          // pickerDateRange: [{ required: true, trigger: 'blur', validator: validateDataTime }]

        },
        showAddProductButton: false,
        dialogTableVisible: false,
        // 以下是表单数据
        form: {
          promotionId: '',
          vendorId: '',
          name: '',
          tag: '',
          limitProductAmount: '', // 限制商品库存数量
          limitUserAmount: '', // 限制用户使用数量 每个用户1次
          channel: ['1'],
          userRange: '1',
          promotionLink: '',
          fullReductionRules: [], // 满减规则
          vendorRemark: '',
          productRange: '0',
          tableData: [] // 选择的表单数据
        },
        pickerDateRange: [],
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
      // 产品参加范围变更
      productRangeChange(val) {
        if (val === '0') { // 产品范围为 0 所有商品都参加
        //   this.form.tableData = []
          this.showAddProductButton = false
        } else {
          this.showAddProductButton = true
        }
        // console.log(val)
      },
      onSubmit() {
        this.$refs.formRules.validate(vaild => {
          if (vaild) {
            // console.log('submit!')
            // console.log('date = ' + this.pickerDateRange)
            // console.log(this.form)
            console.log(this.pickerDateRange)
            if (this.pickerDateRange.length !== 2) {
              this.$notify.error({
                title: '时间设置错误',
                message: '必须制定时间区间',
                type: 'error'
              })
              return
            }

            const rules = this.form.fullReductionRules.map(rule => {
              return {
                full: rule.full,
                reduction: rule.reduction
              }
            })
            const data = {
              promotionId: this.form.promotionId,
              vendorId: this.form.vendorId,
              name: this.form.name,
              tag: this.form.tag,
              beginTime: this.pickerDateRange[0],
              endTime: this.pickerDateRange[1],
              limitProductAmount: this.form.limitProductAmount,
              limitUserAmount: this.form.limitUserAmount,
              // channel: this.form.channel,
              userRange: this.form.userRange,
              vendorRemark: this.form.vendorRemark,
              ruleType: '1',
              ruleStrategy: '' + JSON.stringify(rules),
              productRange: this.form.productRange,
              productIdList: this.form.tableData.map(e => e.productId)
            }
            console.log(data)
            if (this.editType === '创建活动') {
              promotionCreate(data).then(response => {
                console.log(response)
                if (response.code === 200) {
                  this.$notify({
                    title: '活动创建成功！',
                    message: response.msg,
                    type: 'success'
                  })
                  this.$emit('editSuccess')
                }
              }).catch(err => console.log(err))
            } else if (this.editType === '更新活动') {
              promotionModify(data).then(response => {
                console.log(response)
                if (response.code === 200) {
                  this.$notify({
                    title: '活动创建成功！',
                    message: response.msg,
                    type: 'success'
                  })
                  this.$emit('editSuccess')
                }
              }).catch(err => console.log(err))
            }

          }
        })
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
