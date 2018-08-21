<template>
  <div class="app-container">
    <div class="banner-list">
      <v-b-img v-for="(v, i) in selected" :key="i" :i="i" :item="v" :options="options" @isClick="click" @selectedOptionsImg="selectedOptionsImg" />
      <v-plus v-if="isXs" :form="form" @plus="plus" />
    </div>
  </div>
</template>

<script>

import vBImg from './bimg.vue'
import vPlus from './plus.vue'

import { shopConfigList, shopConfigNavigateTree, shopConfigVisable, shopConfigSave } from '../server'
export default {
  components: {
    vBImg, vPlus
  },
  data() {
    return {
      isXs: true,
      form: {
        val: '点击添加轮播图',
        item: '最多五个轮播图'
      },
      options: [],
      selected: [],
      KindsImageList: [],
      cellType: null,
      cellId: null
    }
  },
  mounted() {
    // console.log(this.$route.path)
    switch (this.$route.path) {
      case '/homepage/banner1':
        this.cellType = 1
        break
      case '/homepage/banner2':
        // :多轮播图1
        this.cellType = 10
        break
      case '/homepage/banner3':
        // :多轮播图2
        this.cellType = 11
        break
      default:
        break
    }
    this.navigateTree()
    this.configList()
  },
  methods: {
    configList() {
      // GET /api/v1/shop/page/main/config/list 微信主页配置 列表
      shopConfigList({cellType: this.cellType}).then(res => {
        if (res.code === 200) {
          const data = res.data
          this.cellId = data.cellId
          this.selected = data['children'] === undefined ? [] : data['children']
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => console.log(err))
    },
    navigateTree() {
      // GET /api/v1/shop/page/main/config/navigate/tree 微信主页配置 跳转路径树
      shopConfigNavigateTree().then(res => res.code === 200 ? this.options = res.data : this.$message.error(res.msg)).catch(err => console.log(err))
    },
    plus(val) {
      this.selected.push({})
      if (this.selected.length === 5) {
        this.isXs = false
      }
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
    click(val) {
      // api/v1/shop/page/main/config/visable?cellId=xxx
      shopConfigVisable({cellId: val}).then(res => this.pulibfn(res)).catch(err => console.log(err))
    },
    selectedOptionsImg(val) {
      // console.log(val)
      if (val['selectedOptions'] === undefined) {
        this.$message.error('请选择图片跳转路径！')
        return
      }
      const len = val.selectedOptions.length - 1
      const list = {
        cellType: this.cellType,
        navigateType: val.selectedOptions[len],
        imageId: val.imageUrl['id'] || val.imageUrl['imageId'],
        imageUrl: val.imageUrl['url'] || val.imageUrl['imageUrl'],
        isShow: val['isClick'] === undefined || val['isClick'] === false ? 1 : 0
      }

      if (val['cellId'] === undefined) {
        // 新增
        list['parentId'] = this.cellId
      } else {
        // 修改
        list['cellId'] = val.cellId
      }

      if (val['list'] !== undefined) {
        list['navigateParam'] = val.list['productId']
      }

      // console.log(list)
      // POST /api/v1/shop/page/main/config/save 微信主页配置 保存单元格
      shopConfigSave(list).then(res => this.pulibfn(res)).catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
.banner-list{
  background: #f4f6f9;
  display: inline-block;
  padding: 20px;
  border: 1px solid #d8dbe3;
  margin: 0;
  width: 100%;
  /* text-align: center; */
}
</style>
