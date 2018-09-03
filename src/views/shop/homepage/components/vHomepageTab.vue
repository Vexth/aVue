<template>
  <div class="div">
    <div>（图片建议尺寸：宽640px）</div>
    <image-tab-component v-for="(item, i) in tabList" :key="i" :ref="item" :name="item" @uploadListBool="uploadListBool" @deleteClick="deleteClick"></image-tab-component>
    <form-plus :name="'添加一个图片'" @plusList="plusList"></form-plus>
  </div>
</template>

<!--
<script>
import ImageTabComponent from '@/views/shop/homepage/components/component/ImageTabComponent.vue'
import FormPlus from '@/views/shop/homepage/components/component/formPlus.vue'

import { shopPageUpdatepage } from '@/views/shop/server'
export default {
  components: {
    ImageTabComponent,
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
        this.tabList = []
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
      tabList: [],
      tabList1: [],
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
      this.tabList1 = this.tabList.map(res => {
        let data = JSON.parse(res)
        if (list['component'] === data['component']) {
          data['ruleForm2'] = list['ruleForm2']
        }
        return JSON.stringify(data)
      })
    },
    plusList() {
      this.banner.component = this.index
      this.tabList.push(JSON.stringify(this.banner))
      this.index++
    },
    deleteClick(item) {
      this.tabList = this.tabList.filter(res => item !== JSON.parse(res)['component'])
    },
    sub() {
      let data = {
        type: this.type,
        data: this.tabList
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
</style> -->

<script>
import ImageTabComponent from '@/views/shop/homepage/components/component/ImageTabComponent.vue'
import FormPlus from '@/views/shop/homepage/components/component/formPlus.vue'

export default {
  components: {
    ImageTabComponent,
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
        const l = this.$store.getters.data_list
        const ld = l[newVal.difference]
        let ldd = []

        this.tabList = []
        this.type = newVal.difference
        this.ComponentId = newVal.componentId

        if (ld !== undefined) {
          if (ld['data'].length === 0) {
            return
          }
          const len = ld['data'].length
          this.index = ld['data'][len-1]['component'] + 1
          this.tabList = ld['data'].map(res => JSON.stringify(res))
          ldd = ld['data']
        }

        this.l = {
          type: newVal.difference,
          componentId: newVal.componentId,
          data: ldd
        }

        this.$store.dispatch('AddDataList', this.l)
      }
    },
    
  },
  data() {
    return {
      l: null,
      homePageList: [],
      name: '',
      index: 0,
      tabList: [],
      type: null,
      ComponentId: null,
      banner: {
        component: null,
        ruleForm2: {
          bigPicUrl: '',
          smallPicUrl: '',
          title: '',
          navigateTo: {
            navigateName: '',
            navigateParam: ''
          }
        }
      },
      id: null,
    }
  },
  methods: {
    uploadListBool(item, val) {
      this.name = val
      if (item === 'detail') {
        this.$emit('uploadListBool', '')
        return
      }
      if (item === 'group') {
        this.$emit('uploadListBool', 1)
        return
      }
      this.$emit('uploadListBool', true)
    },
    boolPage(item) {
      let list = this.$refs[this.name][0].boolPage(item)
      this.tabList = this.tabList.map(res => {
        let data = JSON.parse(res)
        if (list['component'] === data['component']) {
          data['ruleForm2'] = list['ruleForm2']
        }
        return JSON.stringify(data)
      })
    },
    plusList() {
      this.banner.component = this.index
      this.tabList.push(JSON.stringify(this.banner))
      this.index++
    },
    deleteClick(item) {
      this.tabList = this.tabList.filter(res => item !== JSON.parse(res)['component'])
    },
    sub() {
      this.l['data'] = this.tabList.map(res => JSON.parse(res))
      // this.$store.commit('ADD_DATA_LIST', this.l)
    },
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