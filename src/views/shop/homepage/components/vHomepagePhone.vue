<template>
  <div class="div">
    <el-form ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="电话号码：">
        <el-input v-model="phone" placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      l: null,
      phone: ''
    }
  },
  props: {
    componentId: {
      type: Object,
      default: {}
    }
  },
  watch: {
    componentId: {
      immediate:true,
      handler(newVal, oldVal) {
        const l = this.$store.getters.data_list
        const ld = l[newVal.difference]

        if (ld !== undefined) {
          this.phone = ld['data']
        }
        this.l = {
          type: newVal.difference,
          componentId: newVal.componentId,
          data: this.phone
        }

        this.$store.dispatch('AddDataList', this.l)
      }
    },
    phone(val) {
      function isPhoneNum(str) {
        return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
      }
      console.log(isPhoneNum(val))
    }
  },
  methods: {
    sub() {
      this.l['data'] = this.phone
      this.$store.commit('ADD_DATA_LIST', this.l)
    }
  }
}
</script>

<style scoped>
.div {
  padding: 14px;
  color: #6B747A;
  font-size: 12px;
}
</style>
