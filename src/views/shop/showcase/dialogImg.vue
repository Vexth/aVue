<template>
  <el-dialog
    title="我的图片"
    :visible.sync="tpDialogVisible"
    width="50%"
    center>
    <div class="left">
      <el-upload
        :before-upload="beforeUpload"
        class="upload-demo"
        :action="action">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
      </el-upload>
    </div>
    <div class="rigth">
      <ul>
        <li v-for="(img, i) in imgList" :key="i" class="uploadList" @click="liClick(img)">
          <img style="width: 100%;" :src="img.url">
          <div :style="{ display: selected.indexOf(img.id) > -1 ? 'inline-block' : 'none' }" class="selected"><i class="index">{{i+1}}</i></div>
        </li>
      </ul>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="tpDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="tpSub">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      tpDialogVisible: false,
      selected: []
    }
  },
  props: [imgList],
  mounted() {
    this.ImgList()
  },
  methods: {
    ImgList() {
      // api/v1/shop/image/list
      this.axios.get('api/v1/shop/image/list').then(res => {
        if (res.data.code === 200) {
          this.imgList = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => console.log(err))
    },
    beforeUpload(file) {
      const fd = new FormData()
      fd.append('multipartFile', file)
      // /api/v1/shop/image/upload
      this.axios.post('api/v1/shop/image/upload', fd).then(res => {
        if (res.data.code === 200) {
          this.ImgList()
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => console.log(err))
      return false
    },
    tpSub() {
      if (this.imageIdstr === 'imageId') {
        if (this.selectedImgList.length > 1) {
          this.$message.error('请选择一张图片！')
          return
        }
        this.tpDialogVisible = false
        this.imageId.imageId = this.selectedImgList[0]['id']
        this.skuList.push(this.imageId)
        return
      }
      this.tpDialogVisible = false
      this[this.selectedImg] = [...this[this.selectedImg], ...this.selectedImgList]
    }
  }
}
</script>

<style>

</style>
