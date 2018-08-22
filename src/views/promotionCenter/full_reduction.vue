<template>
  <div class="app-container" >
    <div style="width:60%">
      <el-form ref="form" :model="form" label-width="80px" class="demo-form-inline">
        <el-form-item   label="活动名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="活动标签">
          <el-input v-model="form.tag"></el-input>
        </el-form-item>
        <!--<el-form-item label="促销渠道">-->
          <!--<el-select v-model="form.channel" placeholder="请选择活动促销渠道">-->
            <!--<el-option label="小程序" value=1></el-option>-->
            <!--<el-option label="App" value=2></el-option>-->
            <!--<el-option label="H5" value=3></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item style="display: block" label="活动时间">
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
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <!--<el-form-item label="促销渠道">-->
          <!--<el-switch v-model="form.delivery"></el-switch>-->
        <!--</el-form-item>-->
        <el-form-item style="display: block" label="促销渠道">
          <el-checkbox-group v-model="form.channel">
            <el-checkbox label="小程序" name="miniApp"></el-checkbox>
            <el-checkbox label="app" name="app"></el-checkbox>
            <el-checkbox label="H5" name="H5"></el-checkbox>
            <el-checkbox label="PC" name="PC"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="用户范围">
          <el-radio-group v-model="form.user_range">
            <el-radio label="所有用户" name="1"></el-radio>
            <el-radio label="用户首单" name="2"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="参与方式">
          <el-radio-group v-model="form.product_range">
            <el-radio label="全场商品" name="1"></el-radio>
            <el-radio label="部分商品参加" name="2"></el-radio>
            <el-radio label="部分商品不参加" name="3"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动规则">
        </el-form-item>
        <el-form-item  label="满：">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="减：">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <!--<el-form-item style="display: block"-->
          <!--v-for="(domain, index) in form.domains"-->
          <!--:label="'域名' + index"-->
          <!--:key="domain.key"-->
          <!--:prop="'domains.' + index + '.value'"-->
          <!--:rules="{-->
            <!--required: true, message: '域名不能为空', trigger: 'blur'-->
          <!--}">-->
          <!--<el-input v-model="domain.value">-->
          <!--&lt;!&ndash;<el-input v-model="domain.value">&ndash;&gt;-->
          <!--</el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>-->
        <!--</el-form-item>-->
        <el-form-item style="display: block">
          <!--<el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>-->
          <el-button @click="addDomain">新增</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
        <el-form-item style="display: block" label="活动备注">
          <el-input type="textarea" v-model="form.vendor_remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'full_reduction',
    data() {
      return {
        form: {
          domains: [{
            value: '',
            key: ''
          }],
          title: '',
          tag: '',
          limit_product_amount: '',
          limit_user_amount: '',
          channel: [],
          user_range: '',
          resource: '',
          promotion_link: '',
          product_range: '',
          vendor_remark: ''
        },
        pickerDateRange: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
        console.log(this.pickerDateRange)
        console.log(this.form)
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.form.domains.indexOf(item)
        if (index !== -1) {
          this.form.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.form.domains.push({
          value: '',
          key: Date.now()
        })
      }
    }
  }
</script>

<style scoped>

</style>
