<template>
  <div class="app-container">
    <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题：">
        <el-input style="width: 400px;" v-model="ruleForm.cellLabel"></el-input>
      </el-form-item>
      <el-form-item label="分享图：">
        <!-- <v-zu-index ref="ShareImage"  @sub="ShareImage" @cha="ShareImage" /> -->

        <v-img-list :list="'imgSpecList'" :tpList="ruleForm.img" :bool="true" @uploadList="uploadList" />
      </el-form-item>
      <el-form-item label="正文：">
        <el-input type="textarea" style="width: 400px;" :autosize="{ minRows: 2 }" v-model="ruleForm.str_var2"></el-input>
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
      tpDialogVisible: false,
      selectedImgList: [],
      selected: [],
      ruleForm: {
        cellId: null,
        cellLabel: '',
        str_var2: '',
        int_arr1: [],
        img: [],
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
            this.ruleForm['img'] = children.data.imgs.map(res => {
              res['url'] = res.imageUrl
              return res
            })
            this.ruleForm.str_var2 = children.data.text
          }
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => console.log(err))
    },
    uploadList(val) {
      this.tpDialogVisible = true
    },
    handleClose() {
      this.tpDialogVisible = false
    },
    tpSub() {
      this.selectedImgList = this.$refs.DialogImg.tpSub()
      this.tpDialogVisible = false
      this.ruleForm.img = this.selectedImgList
    },
    ConfigVisable() {
      shopConfigVisable({cellId: this.cellId}).then(res => this.list()).catch(err => console.log(err))
    },
    submitForm(v) {
      if (this.ruleForm.cellLabel === '') {
        this.$message.error('请填写标题！')
        return
      }
      if (this.ruleForm['img'] === undefined) {
        this.$message.error('请选择分享图！')
        return
      }
      if (this.ruleForm.str_var2 === '') {
        this.$message.error('请填写正文！')
        return
      }
      this.ruleForm['img'].map(res => this.ruleForm.int_arr1.push(res.id))

      delete this.ruleForm['img']
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
