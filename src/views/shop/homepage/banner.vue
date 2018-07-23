<template>
  <div class="app-container">
    <div class="banner-list">
      <v-b-img v-for="(v, i) in selected" :key="i" :i="i" :item="v" :KindsImageList="KindsImageList" :options="options" @selectedOptionsImg="selectedOptionsImg" />
      <v-plus v-if="isXs" :form="form" @plus="plus" />
    </div>
  </div>
</template>

<script>
import vImgList from '../showcase/imgList.vue'

import vBImg from './bimg.vue'
import vPlus from './plus.vue'

export default {
  components: {
    vImgList, vBImg, vPlus
  },
  data() {
    return {
      isXs: true,
      form: {
        val: '点击添加轮播图',
        item: '最多五个轮播图'
      },
      options: [],
      selected: [
        {test: '11111'}
      ],
      KindsImageList: [],
      cellType: 1
    }
  },
  mounted() {
    this.getImg()
    this.navigateTree()
  },
  methods: {
    navigateTree() {
      // GET /api/v1/shop/page/main/config/navigate/tree 微信主页配置 跳转路径树
      this.axios.get('api/v1/shop/page/main/config/navigate/tree').then(res => {
        if (res.data.code === 200) {
          this.options = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => console.log(err))
    },
    getImg() {
      this.axios.get('api/v1/shop/image/list').then(res => {
        if (res.data.code === 200) {
          this.KindsImageList = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => console.log(err))
    },
    plus(val) {
      this.selected.push({})
      if (this.selected.length === 5) {
        this.isXs = false
      }
    },
    selectedOptionsImg(val) {
      console.log(val)
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
