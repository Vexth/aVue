<template>
  <el-form :model="form">
    <el-form-item label="收货地址：" :label-width="formLabelWidth">
      <span v-if="dz === form.isTrue">{{form.receiveAddress}}<i @click="dz = false" class="el-icon-edit-outline"></i></span>
      <el-input v-else v-model="form.receiveAddress" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="车主车牌车型：" :label-width="formLabelWidth">
      <span v-if="cx === form.isTrue">{{form.userCarInfo}}<i @click="cx = false" class="el-icon-edit-outline"></i></span>
      <el-input v-else v-model="form.userCarInfo" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="店家备注：" :label-width="formLabelWidth">
      <span v-if="bz === form.isTrue">{{form.vendorRemark}}<i @click="bz = false" class="el-icon-edit-outline"></i></span>
      <el-input v-else v-model="form.vendorRemark" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="预约服务开始时间：" :label-width="formLabelWidth">
      <span v-if="starTime === form.isTrue">{{form.appointmentServiceTimeBegin}}<i @click="starTime = false" class="el-icon-edit-outline"></i></span>
      <el-date-picker
        v-else
        v-model="form.appointmentServiceTimeBegin"
        type="datetime"
        placeholder="选择日期时间"
        align="right"
        :picker-options="pickerOptions1">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="预约服务结束时间：" :label-width="formLabelWidth">
      <span v-if="endTime === form.isTrue">{{form.appointmentServiceTimeEnd}}<i @click="endTime = false" class="el-icon-edit-outline"></i></span>
      <el-date-picker
        v-else
        v-model="form.appointmentServiceTimeEnd"
        type="datetime"
        placeholder="选择日期时间"
        align="right"
        :picker-options="pickerOptions1">
      </el-date-picker>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      pickerOptions1: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      formLabelWidth: '140px',
      dz: true,
      cx: true,
      bz: true,
      starTime: true,
      endTime: true
    }
  },
  props: {
    form: Object
  },
  watch: {
    form(val) {
      this.dz = val.isTrue
      this.cx = val.isTrue
      this.bz = val.isTrue
      this.starTime = val.isTrue
      this.endTime = val.isTrue
    }
  }
}
</script>

<style scoped>

</style>
