<template>
  <div class="div">
    <div>（图片建议尺寸：宽640px）</div>
    <image-ad-component v-for="(item, i) in bannerList" :key="i" :ref="item" :name="item" @uploadListBool="uploadListBool" @deleteClick="deleteClick"></image-ad-component>
    <form-plus :name="'添加一个广告'" @plusList="plusList"></form-plus>
    <!-- <el-button @click="sub" type="primary">主要按钮</el-button> -->
  </div>
</template>

<script>
import ImageAdComponent from '@/views/shop/homepage/components/component/ImageAdComponent.vue'
import FormPlus from '@/views/shop/homepage/components/component/formPlus.vue'

import { shopPageUpdatepage } from '@/views/shop/server'
export default {
  components: {
    ImageAdComponent,
    FormPlus
  },
  props: {
    componentId: {
      type: Object,
      default: {}
    }
  },
  watch: {
    componentId: {
      immediate: true,
      handler(newVal, oldVal) {
        if (oldVal !== undefined) {
          this.sub()
        }
        this.type = newVal.difference
        this.bannerList = []
        let data = {
          type: newVal.difference,
          componentId: newVal.componentId,
          data: []
        }
        this.$store.dispatch('addHomePageList', data)
      }
    }
  },
  data() {
    return {
      homePageList: [],
      name: '',
      index: 0,
      bannerList: [],
      bannerList1: [],
      type: null,
      banner: {
        component: null,
        ruleForm2: {
          imageUrl: '',
          title: '',
          navigateTo: {
            navigateName: '',
            navigateParam: ''
          }
        }
      },
      bool: true,
      id: null,
    }
  },
  beforeDestroy() {
    if (this.bool) {
      this.sub()
    }
  },
  methods: {
    uploadListBool(item, val) {
      this.name = val
      if (item === 'detail') {
        this.$emit('uploadListBool', {})
        return
      }
      if (item === 'group') {
        this.$emit('uploadListBool', {})
        return
      }
      this.$emit('uploadListBool', true)
    },
    boolPage(item) {
      let list = this.$refs[this.name][0].boolPage(item)
      this.bannerList1 = this.bannerList.map(res => {
        let data = JSON.parse(res)
        if (list['component'] === data['component']) {
          data['ruleForm2'] = list['ruleForm2']
        }
        return JSON.stringify(data)
      })
    },
    plusList() {
      this.banner.component = this.index
      this.bannerList.push(JSON.stringify(this.banner))
      this.index++
    },
    deleteClick(item) {
      this.bannerList = this.bannerList.filter(res => item !== JSON.parse(res)['component'])
    },
    sub() {
      let data = {
        type: this.type,
        data: this.bannerList
      }
      return this.$store.dispatch('modifyHomePageList', data)
    },
    primary() {
      this.sub().then(res => {
        let data = sessionStorage.getItem('homePageList')
        let list = {
          pageId: this.$store.getters.pageId,
          config: data,
          attach: data
        }
        // console.log(this.$store.getters.pageId)
        shopPageUpdatepage(list).then(res => console.log(res)).catch(err => console.log(err))
        // console.log(sessionStorage.getItem('homePageList'))
      })
    }
  }
}
</script>

<style scoped>
.div {
  padding: 14px;
  color: #6B747A;
  font-size: 12px;
}
</style>
