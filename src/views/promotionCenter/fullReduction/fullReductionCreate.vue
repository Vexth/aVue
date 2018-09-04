<template>
  <div class="app-container">
    <div style="width:80%">
      <el-form ref="formRules" :rules="formRules" :model="form" label-width="100px" class="demo-form-inline">
        <el-form-item prop="name" label="活动名称:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="tag" label="活动标签:">
          <el-input v-model="form.tag"></el-input>
        </el-form-item>

        <el-form-item prop="pickerDateRange" label="活动时间:">
          <el-col>
            <!--<div class="block">-->
            <!--<span class="demonstration"></span>-->
            <el-date-picker
              type="datetimerange"
              size="large"
              align="center"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="[new Date().toLocaleTimeString(), new Date().toLocaleTimeString()]"
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
        <el-form-item label="用户范围:" v-if="false">
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

        <el-form-item prop="fullReductionRules" label="满减规则:">
        </el-form-item>
        <!--满减活动规则-->
        <el-form-item
          v-for="(rule, index) in form.fullReductionRules"
          :label="(index+1) + '级:'"
          :key="rule.key"
        >
          <el-col :span="4">
            <el-input-number size="medium" v-model="rule.full" :precision="2" :step="100" :min="0"></el-input-number>
          </el-col>
          <el-col :span="1">元&nbsp;&nbsp;&nbsp;&nbsp;减:</el-col>
          <el-col :span="4">
            <el-input-number size="medium" v-model="rule.reduction" :precision="2" :step="10" :min="0"></el-input-number>
          </el-col>
          <el-col :span="1">元&nbsp;</el-col>
          <el-col :span="4">
            <el-button type="danger" size="mini" icon="el-icon-delete" @click.prevent="removeRule(rule)"
                       circle></el-button>
          </el-col>
        </el-form-item>

        <el-form-item>
          <!--<el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>-->
          <el-button v-if="this.form.fullReductionRules.length < 5" type="primary" size="mini" @click="addRule">+
            新增满减规则
          </el-button>
          <!--<el-button @click="resetForm('form')">重置</el-button>-->
        </el-form-item>
        <el-form-item label="活动备注">
          <el-input type="textarea" v-model="form.vendorRemark"></el-input>
        </el-form-item>

        <el-form-item label="商品范围:">
          <el-col>
            <el-radio-group v-model="form.productRange" @change="productRangeChange">
              <el-radio label="0" border>所有商品参加</el-radio>
              <el-radio label="1" border>部分商品参加</el-radio>
              <!--<el-radio label="2" border>部分商品不参加</el-radio>-->
            </el-radio-group>
          </el-col>
          <!--<el-col v-if="showAddProductButton">-->
          <!--<el-button type="primary" size="mini" @click="dialogTableVisible = true">+ 添加商品</el-button>-->
          <!--</el-col>-->
        </el-form-item>

        <!--选择商品的弹窗-->
        <el-form-item label="商品列表:" v-if="showAddProductButton">
          <el-button type="primary" size="mini" @click="dialogTableVisible = true">选择商品</el-button>
          <span>(已添加商品数：{{form.tableData.length}})</span>

          <!--产品选择框-->
          <product-table-select-dialog
            :visible.sync="dialogTableVisible"
            :tableData="form.tableData"
            :promotionId="form.promotionId"
            @onProductSelectChange="tableDataChange"
          ></product-table-select-dialog>

        </el-form-item>


        <!--<span slot="footer" class="dialog-footer">-->
        <el-form-item>
          <el-button type="success" size="big" @click="onSubmit" :loading="submitLoading" round>{{editType}}</el-button>
          <!--<el-button size="big" >取消</el-button>-->
        </el-form-item>
        <!--</span>-->
      </el-form>
    </div>


  </div>

</template>

<script>
  import { promotionCreate, promotionModify } from '@/api/promotion'
  // import { shopProductLoad } from '@/views/shop/server'
  import { RULE_TYPE_FULL_REDUCTION } from '@/views/promotionCenter/constant'
  import ProductTableSelectDialog from '@/views/promotionCenter/components/ProductTableSelectDialog'
  import { pickerOptionsFromNowOn } from '@/utils'

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
      // 挂载后加载商品类别
      if (this.data) {
        console.log('mounted')
        console.log(this.data)
        this.form.promotionId = this.data.promotionId
        this.form.vendorId = this.data.vendorId
        this.form.name = this.data.name
        this.form.tag = this.data.tag
        this.form.limitProductAmount = this.data.limitProductAmount
        this.form.limitUserAmount = this.data.limitUserAmount
        this.form.vendorRemark = this.data.vendorRemark
        this.form.productRange = String(this.data.productRange)
        this.productRangeChange(this.form.productRange)

        // if (this.data.ruleStrategy) {
        this.form.fullReductionRules = this.data.ruleStrategy
        // }

        if (this.data.productList) {
          this.form.tableData = this.data.productList.map(product => {
            // product.canAddInPage = false // 编辑页面可以动态添加
            return product
          })
        }
        // if (this.data.productIdList) {
        //   this.form.tableData = this.data.productIdList.map(id => {
        //     const product = {}
        //     product.productId = id
        //     product.productName = ''
        //     promotionProductBrief({ ruleType: RULE_TYPE_FULL_REDUCTION, productId: id }).then(response => {
        //       console.log(response)
        //       if (response.code === 200 && response.data) {
        //         product.productName = response.data.productName
        //         product.productImageUrl = response.data.productImageUrl
        //         product.productPrice = response.data.productPrice
        //         product.productStock = response.data.productStock
        //         product.canSelected = response.data.canSelected
        //         // product.productName = response.data.product.title
        //         // product.productImageUrl = response.data.product.imgPrimaryList[0].url
        //         // product.productPrice = response.data.product.priceUnderline
        //         // // response.data.tbody
        //         // product.productStock = response.data.tbody.map(row => row.stockAmount).reduce((pre, cur, index, array) => {
        //         //   return pre + cur
        //         // }, 0)
        //         // product.canSelected = false // 是否可以选择
        //       }
        //     }).catch(err => console.log(err))
        //     return product
        //   })
        // }
        // console.log(this.form.tableData)
        this.pickerDateRange = [this.data.beginTime, this.data.endTime]
      }
    },
    data() {
      const validateName = (rule, value, callback) => {
        // if (!isvalidUsername(value)) {
        if (!value) {
          callback(new Error('不能为空！'))
        } else if (value.length > 20) {
          callback(new Error('活动名称过长，请保持在20个字以内！'))
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
      const validateDataTime = (rule, value, callback) => {
        console.log(value)
        console.log(new Date(this.pickerDateRange[0]))
        console.log(new Date())

        if (new Date(this.pickerDateRange[0]).getTime() < new Date().getTime() - 3600 * 1000) {
          callback(new Error('开始时间不能设置为已过期的！'))
        } else {
          callback()
        }

        // if (!isvalidUsername(value)) {
        // if (!value) {
        //   callback(new Error('不能为空！'))
        // } else {
        //   callback()
        // }
      }
      return {
        formRules: {
          name: [{ required: true, trigger: 'blur', validator: validateName }],
          // tag: [{required: true, trigger: 'blur', validator: validateNotNull}]
          fullReductionRules: [{ required: true, trigger: 'blur' }],
          pickerDateRange: [{ required: true, trigger: 'change', validator: validateDataTime }]

        },
        showAddProductButton: false,
        dialogTableVisible: false,
        submitLoading: false,
        // 以下是表单数据
        form: {
          promotionId: -1,
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
        // pickerDateDefaultTime: [new Date().toLocaleTimeString(), new Date().toLocaleTimeString()], // 可以直接写入 :default-time
        pickerOptions: {
          firstDayOfWeek: 1,
          disabledDate: (time) => {
            return time.getTime() + 3600 * 24 * 1000 < Date.now()
          },
          shortcuts: pickerOptionsFromNowOn
          // [{
          //       text: '最近一周',
          //       onClick(picker) {
          //         const start = new Date()
          //         const end = new Date()
          //         start.setTime(start.getTime() + 60 * 1000) // 一分钟后
          //         end.setTime(start.getTime() + 3600 * 1000 * 24 * 7)
          //         picker.$emit('pick', [start, end])
          //       }
          //     }, {
          //       text: '最近一个月',
          //       onClick(picker) {
          //         const start = new Date()
          //         const end = new Date()
          //         start.setTime(start.getTime() + 60 * 1000)
          //         end.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
          //         picker.$emit('pick', [start, end])
          //       }
          //     }, {
          //       text: '最近三个月',
          //       onClick(picker) {
          //         const start = new Date()
          //         const end = new Date()
          //         start.setTime(start.getTime() + 60 * 1000)
          //         end.setTime(start.getTime() + 3600 * 1000 * 24 * 90)
          //         picker.$emit('pick', [start, end])
          //       }
          //     }]
        }
      }
    },
    methods: {
      // 表格组件回传变化数据
      tableDataChange(data) {
        console.log('表格组件回传变化数据')
        console.log(data)
        this.form.tableData = data
        // this.form.tableData = Array.from(new Set([...this.form.tableData, ...data]))
        // const result = []
        // const a = this.form.tableData
        // const b = data
        // a.forEach(x => {
        // })
        // const c = data.filter((x) => this.form.tableData.filter((a) => x.productId !== a.productId))
        // console.log(c)
        // this.form.tableData = a.concat(b.filter((v) => { return !(a.indexOf(v) > -1) }))
        // this.form.tableData = this.form.tableData.concat(data.filter((x) => this.form.tableData.filter((a) => x.productId !== a.productId).length === 1))
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
            // console.log(this.pickerDateRange)
            this.submitLoading = true
            setTimeout(() => {
              this.submitLoading = false
            }, 1500)
            if (this.pickerDateRange.length !== 2) {
              this.$message.error({
                title: '时间设置错误',
                message: '必须制定时间区间',
                type: 'error'
              })
              return
            }

            // 去除一个key属性 不修改原始
            const rules = this.form.fullReductionRules.map(rule => {
              return {
                full: rule.full,
                reduction: rule.reduction
              }
            })
            if (rules.length === 0) {
              this.$message.error({
                title: '满减规则设置错误',
                message: '必须至少设置一条满减规则！',
                type: 'error'
              })
              return
            }
            // 不是所有商品都参与的话。必须有商品
            if (this.form.productRange !== '0' && this.form.tableData.length === 0) {
              this.$message.error({
                title: '商品列表设置错误',
                message: '商品列表中必须至少设置一个商品！',
                type: 'error'
              })
              return
            }

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
              ruleType: RULE_TYPE_FULL_REDUCTION,
              ruleStrategy: '' + JSON.stringify(rules),
              productRange: this.form.productRange,
              productIdList: this.form.tableData.map(e => e.productId)
            }
            console.log('活动数据打包 =  ' + JSON.stringify(data))
            if (this.editType === '创建活动') {
              promotionCreate(data).then(response => {
                // console.log(response)
                if (response && response.code === 200) {
                  this.$message.success(response.msg)
                  this.$emit('editSuccess', this.editType)
                }
              }).catch(err => console.log(err))
            } else if (this.editType === '更新活动') {
              promotionModify(data).then(response => {
                // console.log(response)
                if (response && response.code === 200) {
                  this.$message.success(response.msg)
                  this.$emit('editSuccess', this.editType)
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
        if (this.form.fullReductionRules.length < 5) {
          this.form.fullReductionRules.push({
            full: '',
            reduction: '',
            key: Date.now()
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
