<template>
  <div class="app-container">
    <div class="banner-list">
      <div class="item name" v-if="cellType === 3 || cellType === 4">
        <span>设置活动栏名称：</span>
        <el-input style="float: left;width: 200px;" v-model="input" placeholder="请输入内容"></el-input>
        <el-button style="margin-left: 20px;" type="primary" @click="sub">保存</el-button>
      </div>

      <el-form v-else :model="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题栏图：">
          <!-- <img v-if="isImg" :src="img" alt="" srcset="" style="width: 120px;height: 120px;margin: 4px;float: left;"> -->
          <v-img-list :list="'shareImage'" :tpList="shareImage" :bool="true" @uploadList="uploadList" />
        </el-form-item>
      </el-form>

      <div style="display: inline-block;">
        <v-x-card v-for="(s, i) in selected" :key="i" :bool="true" :item="s" :num="i" @sel="sel" @onSubmit="onSubmit" />
        <v-plus v-if="isXs" :form="form" @plus="plus" />
      </div>
    </div>
    <el-dialog
      title="我的图片"
      :visible.sync="tpDialogVisible"
      width="50%"
      :before-close="handleClose"
      center>
      <DialogImg ref="DialogImg" :selected="selected1" :selectedImgList="selectedImgList"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="tpSub">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import vImgList from '../showcase/imgList.vue'
import DialogImg from '../showcase/dialogImg.vue'
import { shopConfigList, shopConfigVisable, shopConfigGroupName, shopConfigSave } from '../server'
import vXCard from './xcard.vue'
import vPlus from './plus.vue'
export default {
  data() {
    return {
      ruleForm: {},
      tpDialogVisible: false,
      shareImage: [],
      selected1: [],
      selectedImgList: [],
      input: '',
      isXs: true,
      img: '../../../../../static/img/demo.png',
      selected: [],
      form: {
        val: '点击添加活动物品栏',
        item: '最多八个'
      },
      cellType: null,
      cellId: null
    }
  },
  components: {
    vXCard, vPlus, vImgList, DialogImg
  },
  mounted() {
    // console.log(this.$route.path)
    switch (this.$route.path) {
      case '/homepage/activity1':
        this.cellType = 3
        break
      case '/homepage/activity2':
        this.cellType = 4
        break
      case '/homepage/activity3':
        this.cellType = 12
        break
      case '/homepage/activity4':
        this.cellType = 13
        break
      case '/homepage/activity5':
        this.cellType = 14
        break
      case '/homepage/activity6':
        this.cellType = 15
        break
      case '/homepage/activity7':
        this.cellType = 16
        break
      default:
        break
    }
    this.configList()
  },
  methods: {
    uploadList(val) {
      this.selected1 = []
      this.selectedImgList = []
      this.str = val
      this.tpDialogVisible = true
    },
    handleClose() {
      this.tpDialogVisible = false
    },
    tpSub() {
      let list = this.$refs.DialogImg.tpSub()
      if (list.length > 1) {
        this.$message.error('请选择一张图片！')
        return
      }
      this.tpDialogVisible = false
      this.shareImage = list
      const data = {
        cellId: this.cellId,
        imageId: list[0]['id']
      }
      // POST api/v1/shop/page/main/config/group/name
      shopConfigGroupName(data).then(res => this.pulibfn(res)).catch(err => console.log(err))
    },
    pulibfn(res) {
      if (res.code === 200) {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.configList()
      } else {
        this.$message.error(res.msg)
      }
    },
    configList() {
      // GET /api/v1/shop/page/main/config/list 微信主页配置 列表
      shopConfigList({cellType: this.cellType}).then(res => {
        if (res.code === 200) {
          const data = res.data
          this.input = data.cellLabel
          this.cellId = data.cellId
          this.selected = data['children'] === undefined ? [] : data['children']
          if (data.imageUrl !== undefined) {
            this.shareImage = [{
              id: data.imageId,
              url: data.imageUrl
            }]
          }
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => console.log(err))
    },
    plus(val) {
      this.selected.push({})
      if (this.selected.length === 8) {
        this.isXs = !this.isXs
      }
    },
    sel(val) {
      // api/v1/shop/page/main/config/visable?cellId=xxx
      shopConfigVisable({cellId: val}).then(res => this.pulibfn(res)).catch(err => console.log(err))
    },
    sub() {
      const list = {
        cellId: this.cellId,
        cellLabel: this.input
      }
      // POST api/v1/shop/page/main/config/group/name
      shopConfigGroupName(list).then(res => this.pulibfn(res)).catch(err => console.log(err))
    },
    onSubmit(val) {
      // console.log(val)
      const list = {
        cellType: this.cellType,
        navigateType: -3,
        imageUrl: val.product.imageUrl,
        isShow: val['isShow'] === undefined || val['isShow'] === 1 ? 1 : 0
      }

      if (val['cellId'] === undefined) {
        // 新增
        list['parentId'] = this.cellId
      } else {
        // 修改
        list['cellId'] = val.cellId
      }

      if (val['product'] !== undefined) {
        list['navigateParam'] = val['product']['productId']
      }

      // POST /api/v1/shop/page/main/config/save 微信主页配置 保存单元格
      shopConfigSave(list).then(res => this.pulibfn(res)).catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
* {
  font-size: 14px;
}
.banner-list{
  background: #f4f6f9;
  display: inline-block;
  padding: 20px;
  border: 1px solid #d8dbe3;
  margin: 0;
  width: 100%;
}
.name span {
  line-height: 36px;
  display: inline-block;
  width: 115px;
  float: left;
}
</style>