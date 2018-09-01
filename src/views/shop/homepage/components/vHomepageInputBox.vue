<template>
  <div class="div">
    <div>注：公告内容最多填写20个字</div>
    <el-form ref="ruleForm2" label-width="100px" v-for="(item, i) in announcementList" :key="i" class="demo-ruleForm">
      <el-form-item label="公告内容：">
        <el-input v-model="announcementList[i]" type="textarea" :rows="4" placeholder="请输入内容"></el-input>
      </el-form-item>
      <div class="delete" @click="deleteClick(i)">×</div>
    </el-form>
    
    <form-plus :name="'添加一个公告'" @plusList="plusList"></form-plus>
  </div>
</template>

<script>
import FormPlus from '@/views/shop/homepage/components/component/formPlus.vue'
export default {
  components: {
    FormPlus
  },
  data() {
    return {
      homePageList: [],
      index: 0,
      announcementList: [],
      bool: true,
      type: null,
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
        this.announcementList = []
        this.type = newVal.difference
        let data = {
          type: newVal.difference,
          componentId: newVal.componentId,
          data: []
        }
        if (newVal['data'] !== undefined) {
          data = newVal['data']
          this.announcementList = data['data'].map(res => JSON.stringify(res))
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
    plusList() {
      this.index++
      this.announcementList.push(`${this.index}`)
    },
    deleteClick(item) {
      this.announcementList.splice(item, 1)
    },
    sub() {
      this.bool = false
      let list = {
        type: this.type,
        data: this.announcementList
      }
      return this.$store.dispatch('announcementList', list)
    },
    primary() {
      this.sub()
      this.$store.commit('IS_PRIMARY', true)
      // console.log('primary')
    }
  }
}
</script>

<style lang="scss" scoped>
.div {
  padding: 14px;
  color: #6B747A;
  font-size: 12px;
  margin-bottom: 20px;
}

.demo-ruleForm {
  position: relative;
  padding: 25px 5px 0px;
  border: 1px solid #e5e5e5;
  width: 380px;
  margin: 10px auto 0px;
  .delete {
    display: none;
    position: absolute;
    z-index: 2;
    top: -9px;
    right: -9px;
    width: 20px;
    height: 20px;
    font-size: 16px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    background: rgba(153,153,153,0.6);
    border-radius: 10px;
  }
  &:hover .delete {
    display: block;
  }
}
</style>