<template>
  <el-form ref="ruleForm2" label-width="100px" class="demo-ruleForm">
    <el-form-item label="选择商品：">
      <image-li :tpList="tpList" @cha="cha"></image-li>
      <div class="v-li-uploadList" @click="uploadList">
        <img src="/static/img/icon-add.png" alt="" srcset="">
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import ImageLi from '@/views/shop/homepage/components/component/ImageLi.vue'

export default {
  components: {
    ImageLi
  },
  data() {
    return {
      l: null,
      tpList: [],
      type: null,
      ComponentId: null,
      homePageList: [],
      index: 0,
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
        this.type = newVal.difference
        this.ComponentId = newVal.componentId
        this.tpList = []
        if (l[newVal.difference] !== undefined) {
          this.tpList = l[newVal.difference]['data']
        }
        this.l = {
          type: newVal.difference,
          componentId: newVal.componentId,
          data: this.tpList
        }
        this.$store.dispatch('AddDataList', this.l)
        // if (newVal['data'] !== undefined && newVal['data'].length !== 0) {
        //   data = newVal['data']
        //   this.tpList = data['data']
        // }
        // this.$store.dispatch('addHomePageList', data)
        // this.sub()
      }
    }
  },
  // beforeDestroy() {
  //   this.sub()
  // },
  methods: {
    uploadList() {
      this.$emit('uploadListBool', {})
    },
    boolPage(item) {
      let data = []
      item.map(res => {
        const id = res['product']['id']
        const list = {
          imageUrl: res['product']['imgDescList'][0]['url'],
          shopTitle: res['product']['title'],
          shopPrice: res['price'],
          navigateTo:  {
            navigateName: 'detail',
            navigateParam: id
          }
        }
        data.push(list)
      })
      this.tpList = [...this.tpList, ...data]
      this.l['data'] = this.tpList
      this.$store.commit('ADD_DATA_LIST', this.l)
    },
    cha(item) {
      this.tpList = item
    },
    // sub() {
    //   const tpList = {
    //     type: this.type,
    //     data: this.tpList
    //   }
    //   this.$store.commit('CLICK_SELECTED', { ...tpList, componentId: this.ComponentId })
    //   return this.$store.dispatch('commodityList', tpList)
    // },
    // primary() {
    //   this.sub()
    //   this.$store.commit('IS_PRIMARY', true)
    // }
  }
}
</script>

<style scoped>
.el-input {
  width: 200px;
}
.demo-ruleForm {
  position: relative;
  padding: 25px 5px 5px;
  border: 1px solid #e5e5e5;
  width: 380px;
  margin: 10px auto 0px;
}

.v-li-uploadList {
  display: inline-block;
  vertical-align: middle;
  margin-top: 4px;
  width: 50px;
  height: 50px;
  line-height: 50px;
}
</style>
