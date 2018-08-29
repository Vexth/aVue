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
      tpList: [],
      type: null,
      homePageList: [],
      index: 0,
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
        this.tpList = []
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
    uploadList() {
      this.$emit('uploadListBool', {})
    },
    boolPage(item) {
      this.tpList = item.map(res => {
        res['url'] = res.product.imgDescList[0].url
        return res
      })
    },
    cha(item) {
      this.tpList = item
    },
    sub() {
      this.bool = false
      let data = {
        type: this.type,
        data: this.tpList
      }
      return this.$store.dispatch('commodityList', data)
    },
    primary() {
      console.log('primary')
      // this.homePageList.push(data)
      // sessionStorage.setItem('homePageList', JSON.stringify(this.homePageList))
    }
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
