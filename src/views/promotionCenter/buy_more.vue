<template>
  <div class="app-container" >
    <div style="width:60%">
      <el-form ref="form" :model="form" label-width="80px">
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
        <el-form-item label="活动时间">
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
          </el-col>
        </el-form-item>
        <!--<el-form-item label="促销渠道">-->
        <!--<el-switch v-model="form.delivery"></el-switch>-->
        <!--</el-form-item>-->
        <el-form-item label="促销渠道">
          <el-checkbox-group v-model="form.channel">
            <el-checkbox label="小程序" name="miniApp"></el-checkbox>
            <el-checkbox label="app" name="app"></el-checkbox>
            <el-checkbox label="H5" name="H5"></el-checkbox>
            <el-checkbox label="PC" name="PC"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="用户范围">
          <el-radio-group v-model="form.userRange">
            <el-radio label="所有用户" name="1"></el-radio>
            <el-radio label="用户首单" name="2"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="参与方式">
          <el-radio-group v-model="form.productRange">
            <el-radio label="全场商品" name="1"></el-radio>
            <el-radio label="部分商品参加" name="2"></el-radio>
            <el-radio label="部分商品不参加" name="3"></el-radio>
          </el-radio-group>
        </el-form-item>


        <el-form-item  label="活动备注">
          <el-input type="textarea" v-model="form.vendorRemark"></el-input>
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
          limitProductAmount: '',
          limit_user_amount: '',
          channel: [],
          userRange: '',
          resource: '',
          promotionLink: '',
          productRange: '',
          vendorRemark: ''
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
    }
  }
</script>

<style scoped>

</style>
