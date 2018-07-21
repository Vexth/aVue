<template>
  <div class="classImg" @click="Click">
    <div :class="isClick ? 'selected p5' : 'p5'">
      <img :src="img" />
      <p style="font-size: 14px;">轮播图{{item}}</p>
      <el-button class="primary" type="primary" @click="uploadList">点击更换图片</el-button>
      <p class="url">图片点击跳转路径</p>
      <el-cascader class="cascader"
        expand-trigger="hover"
        :options="options"
        v-model="selectedOptions"
        @change="handleChange">
      </el-cascader>

      <i :class="isClick ? 'index el-icon-check' : 'dn'"></i>
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
import vImg from '../grouping/img.vue'
export default {
  data() {
    return {
      isClick: false,
      dialogVisible: false,
      action: '123',
      selectedOptions: [],
      image: {},
      img: '../../../../../static/img/zw.png'
    }
  },
  components: {
    vImg
  },
  props: {
    item: Number,
    KindsImageList: Array,
    options: Array
  },
  methods: {
    Click() {
      this.isClick = !this.isClick
    },
    sub() {
      const that = this
      const list = that.$refs.imglist.tpSub()
      if (list.length > 1) {
        this.$message.error('请选择一张图片作为轮播图片！')
        return
      }
      this.img = list[0]['url']
      this.$emit('addImg', { index: this.item, list: list[0] })
      this.dialogVisible = false
    },
    handleChange(val) {
      event.stopPropagation()
      this.$emit('selectedOptions', { index: this.item, val: val })
    },
    uploadList() {
      event.stopPropagation()
      this.dialogVisible = true
      this.$emit('uploadList')
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
    handleClose() {
      this.$confirm('确认关闭？').then(_ => {
        this.dialogVisible = false
        done()
      }).catch(_ => {})
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
}
.dn {
  display: none;
}
.cascader {
  margin-right: 10px;
  margin-left: 10px;
}
.url {
  line-height: 60px;
  font-size: 15px;
}
.classImg {
  width: 280px;
  text-align: center;
  margin-right: 20px;
  float: left;
  margin-top: 20px;
  position: relative;
}
.classImg img{
  width: 100%;
  height: 180px;
  border: 1px dashed #c0ccda;
}
.classImg .primary{
  margin-top: 20px;
}
.p5{
  padding: 10px;
  border: 2px dashed #c0ccda;
}
.selected {
  width: 100%;
  height: 100%;
  border: 2px solid #07d;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.selected:after {
  position: absolute;
  display: block;
  content: " ";
  right: 0;
  top: 0;
  border: 14px solid #07d;
  border-left-color: transparent;
  border-bottom-color: transparent;
  z-index: 1;
}
.selected .index{
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 2;
  font-size: 12px;
  color: #fff;
  font-style: normal;
  font-family: arial;
  width: 13px;
  text-align: center;
  height: 15px;
  line-height: 20px;
}
.upload-demo{
  text-align: left;
}
</style>