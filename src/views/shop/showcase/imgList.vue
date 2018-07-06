<template>
  <div>
    <ul>
      <li v-for="(img, i) in imgSpecList" :key="i" class="uploadList">
        <img style="width: 100%;" :src="img.url">
        <div class="cha" @click="cha('imgSpecList', imgSpecList, i)">×</div>
      </li>
    </ul>
    <div class="uploadList" @click="uploadList('imgSpecList')">
      <i class="el-icon-plus"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    cha(title, val, id) {
      val.splice(id, 1)
      this[title] = val
    },
    uploadList(val) {
      this.selected = []
      this.selectedImgList = []
      this.selectedImg = val
      this.tpDialogVisible = true
    }
  }
}
</script>

<style scoped>

</style>
