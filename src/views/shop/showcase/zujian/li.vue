<template>
  <ul>
    <li v-for="(img, i) in tpList" :key="i" class="v-uploadList" :class="dome">
      <img style="width: 100%;height: 118px;" :src="img.url">
      <div class="cha" @click="cha(tpList, i)">×</div>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      dome: ''
    }
  },
  props: {
    tpList: Array
  },
  methods: {
    cha(val, id) {
      val.splice(id, 1)
      this.$emit('cha', val)
    },
    uploadList(val) {
      this.$emit('uploadList', this.list)
    }
  }
}
</script>

<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.v-uploadList {
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
.v-uploadList i{
  font-size: 28px;
  color: #8c939d;
}
.v-uploadList:hover {
  border-color: #409EFF;
  color: #409EFF;
}
.v-uploadList:hover .cha {
  display: inline-block;
}
.v-uploadList .cha {
  position: absolute;
  top: 0;
  right: 0;
  line-height: 24px;
  width: 24px;
  color: #fff;
  background: #999;
  border-radius: 50%;
  z-index: 2;
  display: none;
}
.v-uploadList.dome {
  margin-left: 50px;
  margin-right: 50px;
}
</style>
