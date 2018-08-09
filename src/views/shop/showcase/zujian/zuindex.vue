<template>
  <div>
    <v-li :tpList="tpList" @cha="cha" />
    <v-push :bool="bool" @uploadList="uploadList" />
    <el-dialog
      title="我的图片"
      :visible.sync="tpDialogVisible"
      width="50%"
      :before-close="handleClose"
      center>
      <v-img ref="Img" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="sub">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import vLi from './li.vue'
import vPush from './push.vue'
import vImg from './img.vue'
export default {
  data() {
    return {
      bool: true,
      tpDialogVisible: false,
      tpList: []
    }
  },
  components: {
    vLi, vPush, vImg
  },
  props: {
    s: {
      type: String
    }
  },
  methods: {
    uploadList() {
      this.tpDialogVisible = true
    },
    handleClose() {
      this.tpDialogVisible = false
    },
    sub() {
      const list = this.$refs.Img.sub()
      if (this.s !== undefined && list.length > 1) {
        this.$message.error('请选择一张图片！')
        return
      }
      this.$refs.Img.kong()
      this.tpList = [...this.tpList, ...list]
      this.tpDialogVisible = false
      this.$emit('sub', this.tpList)
    },
    cha(val) {
      this.$emit('cha', val)
    },
    isBool() {
      this.bool = !this.bool
    }
  }
}
</script>

<style scoped>

</style>