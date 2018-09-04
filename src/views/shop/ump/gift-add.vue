<template>
<div class="rigth">
    <el-form-item label="活动信息：">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form :model="form" label-width="130px">
        <el-form-item label="使用时间：">
            <el-radio-group v-model="form.validTimeType" @change="typeClick">
                <el-radio class="elradio" label="1">
                        <el-date-picker
                            v-model="value7"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2">
                        </el-date-picker>
                    </el-radio>
                <el-radio class="elradio" style="margin: 5px 0;" label="2">领券当日起 <el-input class="w100" v-model="form.validDays1"></el-input> 天内可用</el-radio>
            <el-radio class="elradio" label="3">领券次日起 <el-input class="w100" v-model="form.validDays2"></el-input> 天内可用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="领取有效期:">
            <el-radio-group>
                <el-radio class="elradio" style="margin: 5px 0;" label="2"><el-input class="w100"></el-input>天可用</el-radio>
                <el-radio>永久都可领取，不限时长</el-radio>
                <el-radio>无需点击领取，自动到账（发货）</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="领取次数:">
            <el-input class="getNum">次/人</el-input>
            <el-tooltip placement="right">
            <div slot="content">0表示不限领取次数</div>
            <i class="el-icon-question"></i>
        </el-tooltip>
        </el-form-item>
        <p>选择商品</p>
        <el-form-item label="添加主商品：">
            <el-button size="small" type="primary" icon="el-icon-plus" disabled plain>添加商品</el-button>
        </el-form-item>
        <el-form-item label="添加赠品：">
            <el-button size="small" type="primary" icon="el-icon-plus" disabled plain>添加商品</el-button>
        </el-form-item>
    </el-form>
    <el-dialog
      title="选择商品"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <v-tabs ref="vTabs" :label="label" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="sub">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>
<script>
import vTabs from './zujian/vTabs.vue'
export default {

  data() {
    return {
      pickerOptions2: {
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
      },
      value6: '',
      value7: ''
    }
  },
  components: {
    vTabs
  },
  methods: {
    plus() {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
.w100 {
  width: 100px;
}
</style>

