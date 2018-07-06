<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="150px">
      <div class="title">基本信息</div>
			<el-form-item label="商品名称：" required>
				<el-input class="name" v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="分享描述：">
				<el-input class="name" v-model="form.sharetitle"></el-input>
			</el-form-item>
      <el-form-item label="描述图片上传：" required>
				<ul>
          <li v-for="(img, i) in imgDescList" :key="i" class="uploadList">
            <img style="width: 100%;" :src="img.url">
            <div class="cha" @click="cha('imgDescList', imgDescList, i)">×</div>
          </li>
        </ul>
        <div class="uploadList" @click="uploadList('imgDescList')">
          <i class="el-icon-plus"></i>
        </div>
			</el-form-item>
      <el-form-item label="商品类目：">
        <el-select v-model="categoryId" disabled placeholder="请选择">
          <el-option
            v-for="item in optionsLX"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品分组：">
        <el-select v-model="groupId" placeholder="请选择">
          <el-option
            v-for="item in optionsFZ"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="主图上传：" required>
				<ul>
          <li v-for="(img, i) in imgPrimaryList" :key="i" class="uploadList">
            <img style="width: 100%;" :src="img.url">
            <div class="cha" @click="cha('imgPrimaryList', imgPrimaryList, i)">×</div>
          </li>
        </ul>
        <div class="uploadList" @click="uploadList('imgPrimaryList')">
          <i class="el-icon-plus"></i>
        </div>
			</el-form-item>
      <el-form-item label="规格参数图片上传：" required>
				<ul>
          <li v-for="(img, i) in imgSpecList" :key="i" class="uploadList">
            <img style="width: 100%;" :src="img.url">
            <div class="cha" @click="cha('imgSpecList', imgSpecList, i)">×</div>
          </li>
        </ul>
        <div class="uploadList" @click="uploadList('imgSpecList')">
          <i class="el-icon-plus"></i>
        </div>
			</el-form-item>
      <el-form-item label="划线价：">
				<el-input v-model="form.priceUnderline"></el-input>
			</el-form-item>
      <el-form-item label="是否上架：">
				<el-checkbox v-model="saleStatus">是否立即上架</el-checkbox>
			</el-form-item>
      <el-form-item>
				<el-button @click="confirmEdit" type="primary">修改基本信息</el-button>
			</el-form-item>
      <div class="title">价格库存</div>
      <el-form-item label="规格明细：">
        <template>
          <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
            <el-table-column
              align="center"
              v-for="(row, i) in rows"
              :key="i"
              v-if="row.label === null ? false : true"
              :prop="row.prop"
              :label="row.label">
            </el-table-column>

            <el-table-column align="center" label="操作" width="120">
              <template slot-scope="scope">
                <el-button type="primary" @click='modify(scope.row)' size="small" icon="el-icon-edit">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-form-item>
    </el-form>
    <el-dialog
      title="修改"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <div style="text-align: center;">
        <div class="mb10"><span>价格：</span><el-input placeholder="请输入内容" v-model="unitPrice" clearable onKeyPress="if((event.keyCode<48 || event.keyCode>57) && event.keyCode!=46 || /\.\d\d$/.test(value))event.returnValue=false"></el-input></div>
        <div class="mb10"><span>库存：</span><el-input placeholder="请输入内容" v-model="stockAmount" clearable onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"></el-input></div>
        <div class="mb10"><span>成本价：</span><el-input placeholder="请输入内容" v-model="costPrice" clearable onKeyPress="if((event.keyCode<48 || event.keyCode>57) && event.keyCode!=46 || /\.\d\d$/.test(value))event.returnValue=false"></el-input></div>
        <div class="mb10"><span>规格编码：</span><el-input placeholder="请输入内容" v-model="stockBarcode" clearable></el-input></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="subModify">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="我的图片"
      :visible.sync="tpDialogVisible"
      width="50%"
      center>
      <div class="left">
        <el-upload
          :before-upload="beforeUpload"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          class="upload-demo"
          :action="action"
          :on-change="handleChange">
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
  </div>
</template>
<script>
// import Dropzone from '@/components/Dropzone/index.vue'
export default {
  data() {
    return {
      action: '123',
      listLoading: false,
      dataList: [],
      list: null,
      saleStatus: false,
      dialogVisible: false,
      tpDialogVisible: false,
      dialogImageUrl: '',
      form: {
        title: '',
        sharetitle: '',
        priceUnderline: ''
      },
      optionsLX: [],
      optionsFZ: [],
      imgPrimaryList: [],
      imgDescList: [],
      imgSpecList: [],
      imgList: [],
      imageId: {},
      imageIdstr: '',
      selected: [],
      selectedImg: '',
      selectedImgList: [],
      categoryId: null,
      groupId: null,
      centerDialogVisible: false,
      modifyData: {},
      modifyStr: '',
      rows: [],
      product: [],
      unitPrice: null,
      stockAmount: null,
      costPrice: null,
      stockBarcode: ''
    }
  },
  created() {
    this.productLoad()
    this.getCategoryOption()
    this.getGroupOption()
    this.ImgList()
  },
  methods: {
    getCategoryOption() {
      // GET /api/v1/shop/product/getCategoryOption
      this.axios.get('api/v1/shop/product/getCategoryOption').then(res => {
        if (res.status === 200) {
          this.optionsLX = res.data.data
        } else {
          console.error(res)
        }
      }).catch(err => console.log(err))
    },
    getGroupOption() {
      // // GET /api/v1/shop/product/getGroupOption
      this.axios.get('api/v1/shop/product/getGroupOption').then(res => {
        if (res.status === 200) {
          this.optionsFZ = res.data.data
        } else {
          console.error(res)
        }
      }).catch(err => console.log(err))
    },
    productLoad() {
      // GET /api/v1/shop/product/productLoad
      this.axios.get(`api/v1/shop/product/productLoad?productId=${this.$route.query.id}`).then(res => {
        const data = res.data.data
        const product = data['product']
        this.product = product
        this.form.title = product['title']
        this.form.sharetitle = product['sharetitle']
        if (product['saleStatus'] !== 1) {
          this.saleStatus = true
        }
        this.form.priceUnderline = product['priceUnderline']
        this.categoryId = product['categoryId']
        this.groupId = product['groupId']
        this.imgPrimaryList = product['imgPrimaryList']
        this.imgDescList = product['imgDescList']
        this.imgSpecList = product['imgSpecList']
        this.rows = data.thead
        this.list = data.tbody
      }).catch(err => console.log(err))
    },
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
    },
    cha(title, val, id) {
      val.splice(id, 1)
      this[title] = val
    },
    beforeUpload(file) {
      const fd = new FormData()
      fd.append('multipartFile', file)
      // /api/v1/shop/uploadfile
      // /api/v1/shop/image/upload
      this.axios.post('api/v1/shop/image/upload', fd).then(res => {
        if (res.data.code === 200) {
          this.ImgList()
        } else {
          this.$message.error(res.data.msg)
        }
        // this.imgPrimaryListUrl.push({ url: res.data.data })
      }).catch(err => console.log(err))
      return false
    },
    handleChange(file, fileList) {
      console.log(file, fileList)
    },
    uploadList(val) {
      this.selected = []
      this.selectedImgList = []
      this.selectedImg = val
      this.tpDialogVisible = true
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    addTP(title, val) {
      this.selected = []
      this.selectedImgList = []
      this.tpDialogVisible = true
      this.imageId = val
      this.imageIdstr = title
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    modify(value) {
      this.modifyData = value
      this.unitPrice = value.unitPrice
      this.stockAmount = value.stockAmount
      this.costPrice = value.costPrice
      this.stockBarcode = value.stockBarcode
      this.centerDialogVisible = true
    },
    // 修改单品信息
    subModify() {
      if (this.unitPrice === '' || this.unitPrice === null) {
        this.$message.error('请填写价格！')
        return
      }
      if (this.stockAmount === '' || this.stockAmount === null) {
        this.$message.error('请填写库存！')
        return
      }
      this.modifyData.unitPrice = this.unitPrice
      this.modifyData.stockAmount = this.stockAmount
      this.modifyData.costPrice = this.costPrice
      this.modifyData.stockBarcode = this.stockBarcode
      // /api/v1/shop/product/productModifySku
      this.axios.post('api/v1/shop/product/productModifySku', this.modifyData).then(res => {
        if (res.data.code === 200) {
          this.centerDialogVisible = false
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          return
        }
      }).catch(err => console.log(err))
    },
    // 修改基本信息
    confirmEdit() {
      if (this.form.title === '') {
        this.$message.error('请填写商品名称！')
        return
      }
      if (this.imgPrimaryList.length === 0) {
        this.$message.error('请上传主图！')
        return
      }
      if (this.imgDescList.length === 0) {
        this.$message.error('请上传分享图片！')
        return
      }
      if (this.imgSpecList.length === 0) {
        this.$message.error('请上传规格参数图片！')
        return
      }
      let data = {}
      data = { ...data, ...this.form }
      data['id'] = this.$route.query.id
      data['saleStatus'] = this.saleStatus ? 0 : 1
      data['categoryId'] = this.categoryId
      data['groupId'] = this.groupId
      data['imgPrimaryList'] = this.imgPrimaryList
      data['imgDescList'] = this.imgDescList
      data['imgSpecList'] = this.imgSpecList
      this.$confirm('修改基本信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // /api/v1/shop/product/productModifyBasic
        this.axios.post(`api/v1/shop/product/productModifyBasic`, data).then(res => {
          if (res.data.code === 200) {
            this.productLoad()
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }
        }).catch(err => console.log(err))
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    }
  }
}
</script>
<style scoped>
.title {
  background-color: #f8f8f8;
  font-size: 14px;
  font-weight: 700;
  padding: 10px;
  margin-bottom: 20px;
}
.el-input {
  width: 200px;
}
.name {
  min-width: 620px;
  min-width: 40%;
}
.mb10 {
  margin-bottom: 10px;
}
.mb10 span {
  width: 80px;
  display: inline-block;
  text-align: right;
}

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
.cha {
  position: absolute;
  top: 0;
  right: 0;
  line-height: 24px;
  width: 24px;
  color: #fff;
  background: #999;
  border-radius: 50%;
  z-index: 2;
  display: none;
}
</style>
