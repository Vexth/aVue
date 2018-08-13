<template>
  <div>
    <div class="classImg">
      <div :class="isClick ? 'selected p5' : 'p5'">
        <img @click="Click" :src="item.imageUrl" />
        <p style="font-size: 14px;">轮播图{{i+1}}</p>
        <el-button class="primary" type="primary" @click="uploadList">点击更换图片</el-button>
        <p class="url">图片点击跳转路径</p>
        <el-cascader class="cascader"
          expand-trigger="hover"
          :options="options"
          v-model="selectedOptions"
          @change="handleChange">
        </el-cascader>

        <i :class="isClick ? 'index el-icon-check' : 'dn'"></i>

        <el-button style="margin-top: 20px;margin-left: 10px;" type="primary" @click="onSubmit">保存</el-button>
      </div>
    </div>

    <el-dialog
      title="图库"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <!-- <el-upload
        :before-upload="beforeUpload"
        class="upload-demo"
        :action="action">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
      </el-upload> -->
      <v-img ref="img" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="sub">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title=""
      :visible.sync="xxdialogVisible"
      width="330px"
      :before-close="handleClose">
      <div style="height: 525px;margin-top: -25px;"><v-card :item="product" :bool="false" @sel="sel" /></div>
    </el-dialog>
  </div>
</template>

<script>
import vImg from '../showcase/zujian/img.vue'
import vCard from './card.vue'

import { shopImageUpload } from '../server'
export default {
  data() {
    return {
      isClick: false,
      xxdialogVisible: false,
      dialogVisible: false,
      action: '123',
      selectedOptions: [],
      image: {},
      img: '../../../../../static/img/zw.png',
      selectedOptionsImg: {},
      product: {}
    }
  },
  components: {
    vImg, vCard
  },
  props: {
    i: Number,
    item: {
      type: Object,
      required: true,
      default: {}
    },
    KindsImageList: Array,
    options: Array
  },
  watch: {
    item: {
      immediate: true,
      handler(newVal, oldVal) {
        // console.log(newVal)
        this.isClick = newVal['isShow'] === 0 ? true : false
        if (newVal['imageUrl'] === undefined) {
          newVal['imageUrl'] = this.img
        }
        if (newVal['navigateType'] !== undefined) {
          this.selectedOptions = [newVal['navigateType']]
          if (newVal['navigateType'] > 0) {
            this.selectedOptions = [-2, newVal['navigateType']]
          }
        }
        if (newVal['product'] !== undefined) {
          this.product = newVal['product']
        }
      },
      deep: true
    }
  },
  methods: {
    Click() {
      if (this.item.cellId === undefined) {
        this.$message.error('请先保存在做此操作！')
        return
      }
      this.isClick = !this.isClick
      this.$emit('isClick', this.item.cellId)
    },
    sub() {
      const that = this
      const list = that.$refs.img.sub()
      if (list.length > 1) {
        this.$message.error('请选择一张图片作为轮播图片！')
        return
      }
      this.item['imageUrl'] = list[0]['url']
      this.selectedOptionsImg['imageUrl'] = list[0]
      this.dialogVisible = false
    },
    handleChange(val) {
      event.stopPropagation()
      if (val[0] === -3) {
        this.xxdialogVisible = true
      }
      this.selectedOptionsImg['selectedOptions'] = val
    },
    uploadList() {
      event.stopPropagation()
      this.dialogVisible = true
    },
    beforeUpload(file) {
      const fd = new FormData()
      fd.append('multipartFile', file)
      // /api/v1/shop/image/upload
      shopImageUpload(fd).then(res => res.code === 200 ? this.getImg() : this.$message.error(res.msg)).catch(err => console.log(err))
      return false
    },
    handleClose() {
      this.$confirm('确认关闭？').then(_ => {
        this.dialogVisible = false
        this.xxdialogVisible = false
        done()
      }).catch(_ => {})
    },
    sel(val) {
      this.xxdialogVisible = false
      this.selectedOptionsImg = {...this.selectedOptionsImg, ...val}
    },
    onSubmit() {
      this.selectedOptionsImg['isClick'] = this.isClick
      this.selectedOptionsImg['cellId'] = this.item.cellId
      if (this.selectedOptionsImg['imageUrl'] === undefined) {
        this.selectedOptionsImg['imageUrl'] = this.item
      }
      this.$emit('selectedOptionsImg', this.selectedOptionsImg)
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
  cursor: pointer;
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

.box-card {
  margin-top: -20px;
}
</style>