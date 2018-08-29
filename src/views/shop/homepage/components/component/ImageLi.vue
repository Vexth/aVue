<template>
  <ul>
    <li v-for="(img, i) in tpList" :key="i" class="v-li-uploadList">
      <img :src="img.url">
      <div class="cha" @click="cha(tpList, i)">×</div>
    </li>
  </ul>
</template>

<script>
export default {
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

<style scoped>
ul, li {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.v-li-uploadList {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  vertical-align: top;
  text-align: center;
  cursor: pointer;
  float: left;
  margin: 4px;
  position: relative;
  width: 50px;
  height: 50px;
}
.v-li-uploadList i{
  font-size: 28px;
  color: #8c939d;
}
.v-li-uploadList:hover {
  border-color: #409EFF;
  color: #409EFF;
}
.v-li-uploadList:hover .cha {
  display: inline-block;
}
.v-li-uploadList .cha {
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
img {
  width: 48px;
  height: 48px;
}
</style>