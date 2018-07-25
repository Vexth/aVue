<template>
  <div>
    <ul>
      <li v-for="(img, i) in tpList" :key="i" class="uploadList" :class="dome">
        <img style="width: 100%;height: 118px;" :src="img.url">
        <div class="cha" @click="cha(list, tpList, i)">×</div>
      </li>
    </ul>
    <div v-if="bool" class="uploadList" @click="uploadList(list)">
      <i class="el-icon-plus"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dome: ''
    }
  },
  props: {
    list: String,
    tpList: Array,
    bool: Boolean
  },
  methods: {
    cha(title, val, id) {
      val.splice(id, 1)
      this[title] = val
      if (this.list === 'banner' || this.list === 'shareImage') {
        this.$emit('cha', id)
      }
    },
    uploadList(val) {
      if (val === 'banner') {
        this.dome = 'dome'
      }
      this.$emit('uploadList', this.list)
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
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
.cha {
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
.dome {
  margin-left: 50px;
  margin-right: 50px;
}
</style>
