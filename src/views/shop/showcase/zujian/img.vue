<template>
  <div>
    <div class="left">
      <el-upload
        :before-upload="beforeUpload"
        multiple="multiple"
        class="upload-demo"
        :action="action">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
      </el-upload>
    </div>
    <div class="rigth">
      <ul>
        <li v-for="(img, i) in imgList" :key="i" class="uploadList" @click="liClick(img)">
          <img style="width: 100%;height: 100%;" :src="img.url" >
          <!-- v-lazy="img.url" -->
          <div :style="{ display: selected.indexOf(img.id) > -1 ? 'inline-block' : 'none' }" class="selected"><i class="index el-icon-check"></i></div>
        </li>
      </ul>
    </div>
    <v-pagination v-if="pagination.total !== 0" :pagination="pagination" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" />
  </div>
</template>

<script>
import vPagination from '../../pagination/pagination.vue'
import { shopImageList } from '../../server'

import COS from 'cos-js-sdk-v5'
import { Region, Bucket, getAuth, uploadImageUrl } from '@/api/QCloudImage'
import { createImageNameString } from '@/utils/createUniqueString'
export default {
  data() {
    return {
      action: '123',
      imgList: [],
      selected: [],
      selectedImgList: [],
      pagination: {
        total: 100,
        size: 21,
        page: 1,
        sizes: [21, 63, 126]
      }
    }
  },
  components: {
    vPagination
  },
  mounted() {
    this.ImgList()
  },
  methods: {
    ImgList() {
      // api/v1/shop/image/list
      const list = {
        pageNum: this.pagination.page,
        pageSize: this.pagination.size
      }
      shopImageList(list).then(res => {
        if (res.code === 200) {
          this.imgList = res.data
          this.pagination.total = res.total
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => console.log(err))
    },
    beforeUpload(file) {
      var cos = new COS({
        // 必选参数
        getAuthorization: function(options, callback) {
          // console.log(options)
          getAuth(options).then(response => {
            if (response.code === 200) {
              callback({
                Authorization: response.data
              })
            }
          }).catch(err => console.log(err))
        },
        // 可选参数
        FileParallelLimit: 3, // 控制文件上传并发数
        ChunkParallelLimit: 3, // 控制单个文件下分片上传并发数
        ProgressInterval: 1000 // 控制上传的 onProgress 回调的间隔
      })
      const fileName = 'IMAGE_' + createImageNameString()

      cos.putObject({
        Bucket: Bucket,
        Region: Region,
        Key: fileName,
        StorageClass: 'STANDARD',
        Body: file, // 上传文件对象
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        console.log(err)
        console.log(data)
        // 上传图片url到服务器
        uploadImageUrl(data).then(response => {
          if (response.code === 200) {
            this.$notify({
              title: '图片上传成功！',
              message: response.msg,
              type: 'success'
            })
            this.ImgList()
          }
        }).catch(err => console.log(err))
      })
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
    kong() {
      this.selected = []
      this.selectedImgList = []
    },
    sub() {
      return this.selectedImgList
    },
    handleSizeChange(val) {
      this.pagination.size = val
      this.ImgList()
    },
    handleCurrentChange(val) {
      this.pagination.page = val
      this.ImgList()
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
