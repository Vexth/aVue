<template>
  <div class="card">
    <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题：">
        <el-input v-model="ruleForm.cellLabel"></el-input>
      </el-form-item>
      <el-form-item label="小图：">
        <v-zu-index :s="'share'" ref="MinShareImage" @sub="MinShareImage" @cha="MinShareImage" />
      </el-form-item>
      <el-form-item label="大图：">
        <v-zu-index :s="'share'" ref="MaxShareImage" @sub="MaxShareImage" @cha="MaxShareImage" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleForm)">上架</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import vZuIndex from '../../showcase/zujian/zuindex.vue'
export default {
  data() {
    return {
      ruleForm: {
        cellLabel: '',
        navigateParam: null,
        imageId: null
      }
    }
  },
  components: {
    vZuIndex
  },
  props: {
    listData: {
      type: Object,
      default: {}
    }
  },
  watch: {
    listData: {
      immediate:true,
      handler(v) {
        if (v['cellLabel']) {
          this.ruleForm.cellLabel = v['cellLabel']
        }
      }
    }
  },
  methods: {
    MinShareImage(val) {
      this.ruleForm.navigateParam = val.length === 0 ? null : val[0]['id']
      this.$refs.MinShareImage.isBool()
    },
    MaxShareImage(val) {
      this.ruleForm.imageId = val.length === 0 ? null : val[0]['id']
      this.$refs.MaxShareImage.isBool()
    },
    isList() {
      this.ruleForm = {
        cellLabel: '',
        navigateParam: null,
        imageId: null
      }
      this.$refs.MaxShareImage.isList()
      this.$refs.MinShareImage.isList()
    },
    submitForm() {
      if (this.ruleForm.cellLabel === '') {
        this.$message.error('请填写标题！')
        return
      }
      if (this.ruleForm.navigateParam === null) {
        this.$message.error('请选择小图！')
        return
      }
      if (this.ruleForm.imageId === null) {
        this.$message.error('请选择大图！')
        return
      }
      this.$emit('submitForm', this.ruleForm)
    }
  }
}
</script>

<style scoped>
.card {
  width: 400px;
}
</style>
