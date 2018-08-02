<template>
  <div>
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="物流类型：">
        <el-radio v-model="radio7" label="1" border>物流发货</el-radio>
        <el-radio v-model="radio7" label="2" border>无需物流</el-radio>
        <el-radio v-model="radio7" label="3" border>同城送或自提</el-radio>
      </el-form-item>
      <el-form-item label="商品名称：" required>
        <el-input v-model="form.title" style="width: 80%;" placeholder="商品名称必须填，最多100个字"></el-input>
        <el-tooltip placement="right">
          <div slot="content">111111111111111111111</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="分享描述：">
        <el-input v-model="form.sharetitle" style="width: 80%;"></el-input>
        <el-tooltip placement="right">
          <div slot="content">111111111111111111111</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="分享图片上传：" required>
        <v-zu-index ref="shareImage" :s="'share'" @sub="shareImage" @cha="shareImage" />
        <el-tooltip placement="right">
          <div slot="content">111111111111111111111</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="商品类目：" required>
        <el-select v-model="form.categoryId" placeholder="请选择">
          <el-option
            v-for="item in categoryOptions"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-tooltip placement="right">
          <div slot="content">111111111111111111111</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="商品一级分组：">
        <el-select v-model="groupId1" placeholder="请选择" @change="GroupOptions1">
          <el-option
            v-for="item in groupOptions1"
            :key="item.value"
            :label="item.name"
            :value="item.groupId">
          </el-option>
        </el-select>
        <el-tooltip placement="right">
          <div slot="content">111111111111111111111</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="商品二级分组：">
        <el-select v-model="groupId2" placeholder="请选择">
          <el-option
            v-for="item in groupOptions2"
            :key="item.value"
            :label="item.name"
            :value="item.groupId">
          </el-option>
        </el-select>
        <el-tooltip placement="right">
          <div slot="content">111111111111111111111</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="主图上传：" required>
        <v-zu-index @sub="imgPrimaryList" @cha="imgPrimaryList" />
        <el-tooltip placement="right">
          <div slot="content">111111111111111111111</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="商品详情图片上传：" required>
        <v-zu-index @sub="imgDescList" @cha="imgDescList" />
        <el-tooltip placement="right">
          <div slot="content">111111111111111111111</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="规格参数图片上传：" required>
        <v-zu-index @sub="imgSpecList" @cha="imgSpecList" />
        <el-tooltip placement="right">
          <div slot="content">111111111111111111111</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-top: 12px;" @click="next">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { category, tree, groupchildren } from '../server'

import vZuIndex from './zujian/zuindex.vue'
export default {
  name: 'vGoodsInfo',
  data() {
    return {
      radio7: '2',
      categoryOptions: [], // 商品类目
      groupOptions1: [], // 商品一级分组
      groupId1: null, // 商品一级分组id
      groupOptions2: [], // 商品二级分组
      groupId2: null,  // 商品二级分组id
      form: {
        title: '',
        sharetitle: '',
        categoryId: null, // 商品类目id
        groupId: null,
        imgPrimaryList: [], // 主图
        imgDescList: [], // 商品详情图片
        imgSpecList: [], // 规格参数图片
        shareImage: {}
      },
      tpDialogVisible: false,
      selected: [],
      selectedImg: '',
      selectedImgList: []
    }
  },
  components: {
    vZuIndex
  },
  mounted() {
    category().then(res => res.code === 200 ? this.categoryOptions = res.data : console.log(res)).catch(err => console.log(err))
    tree().then(res => res.code === 200 ? this.groupOptions1 = res.data : console.log(res)).catch(err => console.log(err))
  },
  methods: {
    imgPrimaryList(val) {
      this.form.imgPrimaryList = val
    },
    imgDescList(val) {
      this.form.imgDescList = val
    },
    imgSpecList(val) {
      this.form.imgSpecList = val
    },
    shareImage(val) {
      this.form.shareImage = val[0]
      this.$refs.shareImage.isBool()
    },
    GroupOptions1() {
      const list = {
        parentId: this.groupId1
      }
      groupchildren(list).then(res => res.code === 200 ? this.groupOptions2 = res.data : console.log(res)).catch(err => console.log(err))
    },
    handleClose() {
      this.tpDialogVisible = false
      this.isShareImage = true
    },
    tpSub() {
      this.selectedImgList = this.$refs.DialogImg.tpSub()
      this[this.selectedImg] = this.selectedImgList
      this.tpDialogVisible = false
    },
    next() {
      console.log(this.form)
      if (this.groupId2 === null) {
        this.$message.error('请选择二级分组！')
        return
      }
      if (this.form.title === '') {
        this.$message.error('请填写商品名称！')
        return
      }
      if (this.form.categoryId === null) {
        this.$message.error('请选择商品类目！')
        return
      }
      if (this.form.imgPrimaryList.length === 0) {
        this.$message.error('请上传主图！')
        return
      }
      if (this.form.imgDescList.length === 0) {
        this.$message.error('请上传商品详情图片！')
        return
      }
      if (this.form.imgSpecList.length === 0) {
        this.$message.error('请上传规格参数图片！')
        return
      }
      // if (this.form.skuList.length === 0) {
      //   this.$message.error('请填写规格明细！')
      //   return
      // }
      if (this.form.shareImage['url'] === undefined) {
        this.$message.error('请上传分享图片！')
        return
      }
      this.form.groupId = this.groupId2
      this.$emit('next', 'product', this.form, {id: 2, v: 'vInfoList'})
    }
  }
}
</script>

<style scoped>
.el-icon-question {
  font-size: 14px;
  color: #ccc;
}
</style>
