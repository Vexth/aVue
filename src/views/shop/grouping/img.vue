<template>
  <ul>
    <li v-for="(img, i) in KindsImageList" :key="i" class="uploadList" @click="liClick(img)">
      <img style="width: 100%;height: 100%;" :src="img.url">
      <div :style="{ display: selected.indexOf(img.id) > -1 ? 'inline-block' : 'none' }" class="selected"><i class="index el-icon-check"></i></div>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      selected: [],
      selectedImgList: [],
      img: 0
    }
  },
  props: {
    KindsImageList: Array,
    image: {
      type: Object,
      required: true,
      default: {}
    }
  },
  watch: {
    image: {
      immediate: true,
      handler(newVal, oldVal) {
        this.selectedImgList = []
        this.selected = []
        if (newVal['id'] === undefined) {
          return
        }
        this.selectedImgList.push(newVal)
        this.selected.push(newVal['id'])
      },
      deep: true
    }
  },
  methods: {
    liClick(img) {
      if (this.selected.indexOf(img.id) > -1) {
        this.selected = this.selected.filter(k => k !== img.id)
        this.selectedImgList = this.selectedImgList.filter(k => k.id !== img.id)
      } else {
        this.selectedImgList.push({...img, img: this.img})
        this.selected.push(img.id)
        this.img++
      }
    },
    tpSub() {
      this.selected = []
      return this.selectedImgList
    },
    close() {
      this.selectedImgList = []
      this.selected = []
    }
  }
}
</script>

<style scoped>
.uploadList {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 120px;
  height: 120px;
  line-height: 120px;
  vertical-align: top;
  text-align: center;
  cursor: pointer;
  float: left;
  margin: 4px;
  position: relative;
}
.uploadList i{
  font-size: 28px;
  color: #8c939d;
}
.uploadList:hover {
  border-color: #409EFF;
  color: #409EFF;
}
.uploadList:hover .cha {
  display: inline-block;
}
ul {
  list-style-type: none;
  display: inline-block;
  margin: 0;
  padding: 0;
}
.selected {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #07d;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: none;
}
.selected:after {
  position: absolute;
  display: block;
  content: " ";
  right: 0;
  top: 0;
  border: 14px solid #07d;
  border-left-color: transparent;
  border-bottom-color: transparent;
  z-index: 1;
}
.selected .index{
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 2;
  font-size: 12px;
  color: #fff;
  font-style: normal;
  font-family: arial;
  width: 13px;
  text-align: center;
  height: 15px;
  line-height: 20px;
}
</style>
