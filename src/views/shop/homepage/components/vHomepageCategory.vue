<template>
  <div class="div">
    <div>（图片建议尺寸：宽640px）</div>
    <image-ad-component v-for="(item, i) in bannerList" :key="i" :ref="item" :name="item" @uploadListBool="uploadListBool" @deleteClick="deleteClick"></image-ad-component>
    <form-plus :name="'添加一个分类'" @plusList="plusList"></form-plus>
  </div>
</template>

<script>
import ImageAdComponent from '@/views/shop/homepage/components/component/ImageAdComponent.vue'
import FormPlus from '@/views/shop/homepage/components/component/formPlus.vue'
export default {
  components: {
    ImageAdComponent,
    FormPlus
  },
  data() {
    return {
      homePageList: [],
      name: '',
      index: 0,
      bannerList: [],
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
  beforeDestroy() {
    if (this.bool) {
      this.sub()
    }
  },
  methods: {
    uploadListBool(item, val) {
      this.name = JSON.stringify(val)
      this.$emit('uploadListBool', true)
    },
    boolPage(item) {
      let list = this.$refs[this.name][0].boolPage(item)
      this.bannerList = this.bannerList.map(res => {
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
      console.log('primary')
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


