<template>
  <div class="div">
    <el-form ref="ruleForm2" v-model="videoList" label-width="100px" class="demo-ruleForm">
      <el-form-item label="视频名称：">
        <el-select v-model="videoList.videoUrl" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.title"
            :value="item.url">
          </el-option>
        </el-select>
        <!-- <el-input v-model="videoList.videoUrl" placeholder="请输入内容"></el-input> -->
      </el-form-item>
      <el-form-item label="封面：">
        <div class="v-li-uploadList" @click="uploadList">
          <img :src="posterUrl" alt="" :class="isbool ? '' : 'img'" srcset="">
          <span v-if="isbool">添加图片</span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImagePlus from '@/views/shop/homepage/components/component/ImagePlus.vue'

import { getVideoList } from '@/views/shop/server'
export default {
  components: {
    ImagePlus
  },
  props: {
    componentId: Number
  },
  data() {
    return {
      l: null,
      options: [],
      isbool: true,
      posterUrl: '/static/img/icon-add.png',
      videoList: {
        type: null,
        posterUrl: '',
        videoUrl: ''
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
        const l = this.$store.getters.data_list
        const ld = l[newVal.difference]

        this.videoList = {
          type: newVal.difference,
          posterUrl: '',
          videoUrl: ''
        }
        if (ld !== undefined) {
          this.videoList = ld['data']
        }
        this.l = {
          type: newVal.difference,
          componentId: newVal.componentId,
          data: this.videoList
        }
        this.$store.commit('ADD_DATA_LIST', this.l)
      }
    }
  },
  mounted() {
    getVideoList().then(res => {
      if (res.code === 200) {
        this.options = res.data
      }
    })
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
      this.l['data'] = this.videoList
      this.$store.commit('ADD_DATA_LIST', this.l)
    },
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