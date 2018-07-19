<template>
  <div class="app-container">
    <div class="cropper-content">
      <div class="cropper">
        <vue-cropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :fixedBox="option.fixedBox"
          @realTime="realTime"
          @imgLoad="imgLoad"
        />
      </div>
      <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
        <div :style="previews.div" class="preview">
          <img :src="previews.url" :style="previews.img">
        </div>
      </div>
    </div>

    <div class="footer-btn">
      <div class="scope-btn">
        <label class="btn" for="uploads">更换图片</label>
        <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">

        <el-button size="mini" @click="changeScale(1)">+</el-button>
        <el-button size="mini" @click="changeScale(-1)">-</el-button>
        <el-button size="mini" @click="rotateLeft">↺</el-button>
        <el-button size="mini" @click="rotateRight">↻</el-button>
      </div>
      <div class="upload-btn">
        <el-button size="mini" @click="down('blob')">下载</el-button>
      </div>
    </div>
      <div class="cut">
        <vue-cropper
          ref="cropper1"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
        />
        <button @click="start">开始截图</button>
        <button @click="stop">停止</button>
        <button @click="clear">清除</button>
    </div>
  </div>
</template>

<script>
import VueCropper from './vue-cropper.vue'
export default {
  data() {
    return {
      crap: true,
      previews: {},
      option: {
        img: '../../../../../static/img/demo.png',
        size: 1,
        full: false, // 输出原图比例截图 props名full
        outputType: 'png',
        canMove: true,
        original: false,
        canMoveBox: false,
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixedBox: false
      },
      downImg: '#',

      option1: {
        img: 'https://avatars3.githubusercontent.com/u/15681693',
        size: 1,
        full: false,
        outputType: 'png',
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: false
      },
      show: true
    }
  },
  methods: {
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    finish(type) {
      // 输出
      var test = window.open('about:blank')
      test.document.body.innerHTML = '图片生成中..'
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob(data => {
          var img = window.URL.createObjectURL(data)
          this.model = true
          this.modelSrc = img
        })
      } else {
        this.$refs.cropper.getCropData(data => {
          this.model = true
          this.modelSrc = data
        })
      }
    },
    // 实时预览函数
    realTime(data) {
      this.previews = data
    },
    down(type) {
      event.preventDefault()
      var aLink = document.createElement('a')
      aLink.download = 'author-img'
      // 输出
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob(data => {
          console.log(data)
          this.downImg = window.URL.createObjectURL(data)
          aLink.download = this.downImg
          console.log(this.downImg)
          aLink.href = window.URL.createObjectURL(data)
          aLink.click()
        })
      } else {
        this.$refs.cropper.getCropData(data => {
          this.downImg = data
          aLink.href = data
          aLink.click()
        })
      }
    },
    uploadImg(e, num) {
      // 上传图片
      this.option.img
      var file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      var reader = new FileReader()
      reader.onload = e => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        if (num === 1) {
          this.option.img = data
        } else if (num === 2) {
          this.example2.img = data
        }
      }
      // 转化为base64
      reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
    },
    imgLoad(msg) {
      console.log(msg)
    },

    start () {
      this.$refs.cropper1.startCrop()
    },
    stop () {
      this.$refs.cropper1.stopCrop()
    },
    clear () {
      this.$refs.cropper1.clearCrop()
    }
  },
  components: {
    VueCropper
  }
}
</script>

<style  lang="less" scoped>
.cropper-content{
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  -webkit-justify-content: flex-end;
  .cropper{
    width: 500px;
    height: 500px;
  }
  .show-preview{
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    .preview{
      overflow: hidden;
      // border-radius: 50%;
      border:1px solid #cccccc;
      background: #cccccc;
      margin-left: 40px;
    }
  }
}
.footer-btn{
  margin-top: 30px;
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  -webkit-justify-content: flex-end;
  .scope-btn{
    width: 350px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
  }
  .upload-btn{
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
  }
  .btn {
    outline: none;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 8px 15px;
    font-size: 12px;
    border-radius: 3px;
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
  }
}

.cut {
  margin: auto;
  width: 400px;
  height: 400px;
}
</style>
