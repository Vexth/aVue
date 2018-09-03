<template>
  <div class="div">
    <el-form ref="ruleForm2" v-model="title" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题名：">
        <el-input v-model="title.title" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="图标：">
        <div class="v-li-uploadList" @click="uploadList">
          <img :src="iconUrl" alt="" :class="isbool ? '' : 'img'" srcset="">
          <span v-if="isbool">添加图片</span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImagePlus from '@/views/shop/homepage/components/component/ImagePlus.vue'
export default {
  components: {
    ImagePlus
  },
  data() {
    return {
      homePageList: [],
      isbool: true,
      iconUrl:  '/static/img/icon-add.png',
      title: {
        type: null,
        title:  '',
        iconUrl:  '',
        navigateTo:{
          navigateTitle:  '',
          navigateTo:  '',
          navigateParam:  '',
        }
      },
    }
  },
  props: {
    componentId: {
      type: Object,
      default: {}
    }
  },
  watch: {
    componentId: {
      immediate:true,
      handler(newVal, oldVal) {
        if (oldVal !== undefined) {
          this.sub()
        }
        this.title = {
          type: newVal.difference,
          title:  '',
          iconUrl:  '',
          navigateTo:{
            navigateTitle:  '',
            navigateTo:  '',
            navigateParam:  '',
          }
        }
        let data = {
          type: newVal.difference,
          componentId: newVal.componentId,
          data: {}
        }
        if (newVal['data'] !== undefined) {
          data = newVal['data']
          // this.bannerList = data['data'].map(res => JSON.stringify(res))
        }
        this.$store.dispatch('addHomePageList', data)
      }
    }
  },
  beforeDestroy() {
    this.sub()
  },
  methods: {
    uploadList() {
      this.$emit('uploadListBool', this.name)
    },
    boolPage(item) {
      this.isbool = false
      this.iconUrl = item
      this.title.iconUrl = item
    },
    sub() {
      return this.$store.dispatch('Title', this.title)
    },
    primary() {
      this.sub()
      this.$store.commit('IS_PRIMARY', true)
      // console.log('title')
    }
  }
}
</script>

<style lang="scss" scoped>
.div {
  padding: 14px;
  color: #6B747A;
  font-size: 12px;
}

.v-li-uploadList {
  cursor: pointer;
  width: 100px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #fff;
  border: 1px solid #e5e5e5;
  img {
    vertical-align: middle;
    margin-top: -3px;
  }
  .img {
    width: 100%;
    height: 100%;
  }
}
</style>