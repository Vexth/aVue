<template>
  <div class="app-container">
    <div class="banner-list">
      <div style="height: 135px;"><v-img-list :list="list" :tpList="tpList" @uploadList="uploadList" /></div>
      <!-- <ul>
        <li>
          <p></p>
        </li>
      </ul> -->
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
    </div>

    <el-dialog
      title="图库"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-upload
        :before-upload="beforeUpload"
        class="upload-demo"
        :action="action">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
      </el-upload>
      <v-img ref="imglist" :KindsImageList="KindsImageList" :image="image" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="sub">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import vImgList from '../showcase/imgList.vue'
import vImg from '../grouping/img.vue'

export default {
  components: {
    vImgList, vImg
  },
  data() {
    return {
      action: '123',
      dialogVisible: false,
      tpList: [],
      list: 'xxxx',
      KindsImageList: [],
      image: {}
    }
  },
  mounted() {
    this.getImg()
  },
  methods: {
    uploadList(val) {
      this.dialogVisible = true
      // console.log(val)
    },
    getImg() {
      this.axios.get('api/v1/shop/image/list').then(res => {
        if (res.data.code === 200) {
          this.KindsImageList = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => console.log(err))
    },
    handleClose() {
      this.$confirm('确认关闭？').then(_ => {
        this.dialogVisible = false
        done()
      }).catch(_ => {})
    },
    beforeUpload(file) {
      const fd = new FormData()
      fd.append('multipartFile', file)
      // /api/v1/shop/image/upload
      this.axios.post('api/v1/shop/image/upload', fd).then(res => {
        if (res.data.code === 200) {
          this.getImg()
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => console.log(err))
      return false
    },
    sub() {
      const list = this.$refs.imglist.tpSub()
      if (list.length > 1) {
        this.$message.error('请选择一张图片作为轮播图片！')
        return
      }
      if (this.tpList.length >= 5) {
        this.$message.error('只能选择五张图片作为轮播图片！')
        return
      }
      this.tpList.push(...list)
      this.image = { url: '' }
      this.dialogVisible = false
    },
    onSubmit() {
      console.log(this.tpList)
    }
  }
}
</script>

<style scoped>
.banner-list{
  background: #f4f6f9;
  display: inline-block;
  padding: 20px;
  border: 1px solid #d8dbe3;
  margin: 0;
  width: 100%;
}
</style>
