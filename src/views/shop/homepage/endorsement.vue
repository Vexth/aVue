<template>
  <div class="app-container">
    <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题：">
        <el-input style="width: 400px;" v-model="ruleForm.cellLabel"></el-input>
      </el-form-item>
      <el-form-item label="分享图：">
        <!-- <v-zu-index ref="ShareImage"  @sub="ShareImage" @cha="ShareImage" /> -->
        <v-img-list :list="'shareImage'" :tpList="shareImage" :bool="true" @uploadList="uploadList" />
        <!-- <v-img-list :list="'imgSpecList'" :tpList="ruleForm.img" :bool="true" @uploadList="uploadList" /> -->
      </el-form-item>
      <el-form-item label="正文：">
        <v-img-list :list="'imgSpecList'" :tpList="imgSpecList" :bool="true" @uploadList="uploadList" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="submitForm(ruleForm)">上架</el-button>
        <el-button type="primary" :disabled="ruleForm.parentId === null"  @click="ConfigVisable(ruleForm)">下架</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="我的图片"
      :visible.sync="tpDialogVisible"
      width="50%"
      :before-close="handleClose"
      center>
      <DialogImg ref="DialogImg" :selected="selected" :selectedImgList="selectedImgList"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="tpSub">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import vZuIndex from '../showcase/zujian/zuindex.vue'
import vImgList from '../showcase/imgList.vue'
import DialogImg from '../showcase/dialogImg.vue'

import { shopConfigList, shopConfigVisable, shopConfigSave } from '../server'
export default {
  data() {
    return {
      str: '',
      shareImage: [],
      imgSpecList: [],
      tpDialogVisible: false,
      selectedImgList: [],
      selected: [],
      ruleForm: {
        cellId: null,
        cellLabel: '',
        int_arr1: [],
        imageId: null,
        navigateType: -1,
        parentId: null,
        cellType: 8,
        isShow: 0
      }
    }
  },
  components: {
    // vZuIndex
    vImgList, DialogImg
  },
  mounted() {
    this.ConfigList()
  },
  methods: {
    ConfigList() {
      shopConfigList({cellType: this.ruleForm.cellType}).then(res => {
        if (res.code === 200) {
          const data = res.data
          this.ruleForm.parentId = data.cellId
          if (data['children'] !== undefined) {
            let children = data['children'][0]
            this.ruleForm.cellId = children.cellId
            this.ruleForm.cellLabel = children.cellLabel
            this.ruleForm.cellType = children.cellType
            this.ruleForm.isShow = children.isShow
            this.ruleForm.navigateType = children.navigateType
            this.imgSpecList = children.data.imgs.map(res => {
              res['url'] = res.imageUrl
              return res
            })
            this.shareImage = [{
              id: children.imageId,
              url: children.imageUrl
            }]
            this.ruleForm.str_var2 = children.data.text
          }
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => console.log(err))
    },
    uploadList(val) {
      this.selected = []
      this.selectedImgList = []
      this.str = val
      this.tpDialogVisible = true
    },
    handleClose() {
      this.tpDialogVisible = false
    },
    tpSub() {
      let list = this.$refs.DialogImg.tpSub()
      if (this.str === 'shareImage') {
        if (list.length > 1) {
          this.$message.error('请选择一张图片！')
          return
        }
        this.tpDialogVisible = false
        this.shareImage = list
        this.ruleForm.imageId = list[0]['id']
        return
      }
      this.tpDialogVisible = false
      this[this.str] = [...this[this.str], ...this.selectedImgList]
      this[this.str].map(res => this.ruleForm.int_arr1.push(res.id))
    },
    ConfigVisable() {
      shopConfigVisable({cellId: this.cellId}).then(res => this.list()).catch(err => console.log(err))
    },
    submitForm(v) {
      if (this.ruleForm.cellLabel === '') {
        this.$message.error('请填写标题！')
        return
      }
      if (this.ruleForm['imageId'] === null) {
        this.$message.error('请选择分享图！')
        return
      }
      if (this.ruleForm.int_arr1.length === 0) {
        this.$message.error('请填写正文！')
        return
      }

      if (this.ruleForm.cellId !== null) {
        delete this.ruleForm['parentId']
      }

      shopConfigSave(this.ruleForm).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.ConfigList()
      }).catch(err => console.log(err))
    }
  }
}
</script>

<style>

</style>
