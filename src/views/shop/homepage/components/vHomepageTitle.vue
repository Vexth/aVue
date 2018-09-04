<template>
  <div class="div">
    <el-form ref="ruleForm2" v-model="title" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题名：">
        <el-input v-model="title.title" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="图标：">
        <div>
          <img v-for="index in 13" :key="index" :class="index === isbool ? 'img' : ''" :ref="index" @click="sel(index, 13)" :src="`https://business-1253650513.cos.ap-guangzhou.myqcloud.com/${index+4}.png`" alt="" srcset="">
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      l: null,
      isbool: null,
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
        const l = this.$store.getters.data_list
        const ld = l[newVal.difference]

        this.title = {
          title: '',
          iconUrl: '',
          navigateTo:{
            navigateTitle: '',
            navigateTo: '',
            navigateParam: '',
          }
        }
        if (ld !== undefined) {
          this.title = ld['data']
          const a = ld['data'].iconUrl.split('/')
          const len = a.length - 1
          const a0 = a[len].split('.')[0]
          this.isbool = a0 - 4
        }

        this.title.type = newVal.difference
        
        this.l = {
          type: newVal.difference,
          componentId: newVal.componentId,
          data: this.title
        }

        this.$store.dispatch('AddDataList', this.l)
      }
    }
  },
  methods: {
    sel(item, items) {
      for (let index = 1; index < items+1; index++) {
        this.$refs[index][0].className = ''
      }
      this.title.iconUrl = this.$refs[item][0].src
      this.$refs[item][0].className = 'img'
    },
    sub() {
      this.l['data'] = this.title
      this.$store.dispatch('AddDataList', this.l)
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

.demo-ruleForm {
  img {
    vertical-align: middle;
    margin-top: -3px;
    width: 29px;
    height: 40px;
    cursor: pointer;
    margin: 5px;
    border: 1px solid transparent;
  }
  .img {
    border-color: #000;
  }
}
</style>