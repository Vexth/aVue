<template>
  <div class="v-li-uploadList" @click="uploadList">
    <img :src="url" alt="" :class="bool ? '' : 'img'" srcset="">
    <span v-if="bool">添加图片</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: '/static/img/icon-add.png',
      bool: true
    }
  },
  props: {
    src: {
      type: String,
      required: true,
      default: ''
    }
  },
  watch: {
    src: {
      immediate: true,
      handler(newVal, oldVal) {
        this.bool = !newVal
        this.url = newVal === '' ? this.url : newVal
      },
      deep: true
    }
  },
  methods: {
    uploadList() {
      this.$emit('uploadList')
    }
  }
}
</script>

<style scoped>
.v-li-uploadList {
  width: 100px;
  height: 50px;
  line-height: 50px;
}
.img {
  width: 100%;
  height: 100%;
}
span {
  font-size: 14px;
  color: #3399FF;
}
</style>