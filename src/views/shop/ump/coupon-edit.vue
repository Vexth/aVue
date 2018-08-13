<template>
  <div>
    <div class="left"></div>
    <div class="rigth">
      <p>基本设置：</p>
      <el-form ref="form" :model="form" label-width="130px">
        <el-form-item label="优惠券标题：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="发放总量：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="可用商品：">
          <el-button size="small" type="primary" icon="el-icon-plus" plain>添加商品</el-button>
        </el-form-item>
        <el-form-item label="使用门槛：">
          <el-radio-group v-model="form.resource">
            <el-radio label="可直接使用">可直接使用 <el-input class="w100" v-model="form.name"></el-input> 元</el-radio>
            <el-radio label="订单满">订单满 <el-input class="w100" v-model="form.name"></el-input> 元</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="优惠内容：">
          <el-radio-group v-model="form.resource">
            <el-radio label="满减">满减 <el-input class="w100" v-model="form.name"></el-input> 元</el-radio>
            <el-radio label="折扣">折扣 <el-input class="w100" v-model="form.name"></el-input> 元</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="使用时间：">
          <el-radio-group v-model="form.resource">
            <el-radio class="elradio" label="时间">
              <el-date-picker
                v-model="form.value5"
                type="datetimerange"
                :picker-options="pickerOptions2"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
              </el-date-picker>
            </el-radio>
            <el-radio class="elradio" style="margin: 5px 0;" label="领券当日起">领券当日起 <el-input class="w100" v-model="form.name"></el-input> 天内可用</el-radio>
            <el-radio class="elradio" label="领券次日起">领券次日起 <el-input class="w100" v-model="form.name"></el-input> 天内可用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分享设置：">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="是否显示分享按钮" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <p>领取和使用规则：</p>
      <el-form ref="form" :model="form" label-width="130px">
        <el-form-item label="优惠券领取时间：">
          <el-date-picker
            v-model="form.value5"
            type="datetimerange"
            :picker-options="pickerOptions2"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="领取人限制：">
          <el-radio-group v-model="form.resource">
            <el-radio label="不限制，所有人可以领取">不限制，所有人可以领取</el-radio>
            <el-radio label="只有店铺会员可以领取">只有店铺会员可以领取</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="每人限领次数：">
          <el-radio-group v-model="form.resource">
            <el-radio label="不限制">不限制</el-radio>
            <el-radio label="限制"><el-input class="w100" v-model="form.name"></el-input> 次</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="过期提醒：">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="优惠券过期前提醒买家" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="购买限制：">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="优惠券仅购买原价商品时可用" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="使用说明：">
          <el-input type="textarea" v-model="form.desc"></el-input>
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
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        value5: []
      },
      pickerOptions2: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style scoped>
.elradio {
  display: block;
  margin: 0;
}
.w100 {
  width: 100px;
}
p {
  font-weight: 700;
}
</style>
