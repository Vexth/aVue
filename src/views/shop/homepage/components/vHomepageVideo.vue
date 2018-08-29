<template>
  <div class="div">
    <el-form ref="ruleForm2" v-model="videoList" label-width="100px" class="demo-ruleForm">
      <el-form-item label="视频地址：">
        <el-input v-model="videoList.videoUrl" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="封面：">
        <div class="v-li-uploadList" @click="uploadList">
          <img :src="videoList.posterUrl" alt="" :class="isbool ? '' : 'img'" srcset="">
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
  props: {
    componentId: Number
  },
  data() {
    return {
      homePageList: [],
      isbool: true,
      videoList: {
        type: null,
        posterUrl: '/static/img/icon-add.png',
        videoUrl: ''
      },
      bool: true,
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
        this.videoList = {
          type: newVal.difference,
          posterUrl: '/static/img/icon-add.png',
          videoUrl: ''
        }
        let data = {
          type: newVal.difference,
          componentId: newVal.componentId,
          data: {}
        }
        this.$store.dispatch('addHomePageList', data)
      }
    }
  },
  beforeDestroy() {
    if (this.bool) {
      this.sub()
    }
  },
  methods: {
    uploadList() {
      this.$emit('uploadListBool', true)
    },
    boolPage(item) {
      this.isbool = false
      this.videoList.posterUrl = item
    },
    sub() {
      this.bool = false
      return this.$store.dispatch('videoList', this.videoList)
    },
    primary() {
      console.log('video')
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