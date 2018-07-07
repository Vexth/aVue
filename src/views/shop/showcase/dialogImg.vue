<template>
  <div>
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
          <div :style="{ display: selected.indexOf(img.id) > -1 ? 'inline-block' : 'none' }" class="selected"><i class="index el-icon-check"></i></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      action: '123',
      imgList: []
    }
  },
  props: {
    selected: Array,
    selectedImgList: Array
  },
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
    liClick(img) {
      if (this.selected.indexOf(img.id) > -1) {
        this.selected = this.selected.filter(k => k !== img.id)
        this.selectedImgList = this.selectedImgList.filter(k => k.id !== img.id)
      } else {
        this.selectedImgList.push(img)
        this.selected.push(img.id)
      }
    },
    tpSub() {
      return this.selectedImgList
    }
  }
}
</script>

<style scoped>
.uploadList {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 120px;
  height: 120px;
  line-height: 120px;
  vertical-align: top;
  text-align: center;
  cursor: pointer;
  float: left;
  margin: 4px;
  position: relative;
}
.uploadList i{
  font-size: 28px;
  color: #8c939d;
}
.uploadList:hover {
  border-color: #409EFF;
  color: #409EFF;
}
.uploadList:hover .cha {
  display: inline-block;
}
.left{
  margin-bottom: 10px;
  border-bottom: 1px solid #e4e7ed;
  padding-bottom: 10px;
}
.rigth {
  display: inline-block;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.selected {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #07d;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: none;
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
</style>
