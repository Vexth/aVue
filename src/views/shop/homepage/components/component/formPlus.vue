<template>
  <div class="v-li-uploadList" @click="plusList">
    <img :src="url" alt="" srcset="">
    <span>{{name}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: '/static/img/icon-add.png',
    }
  },
  props: {
    name: String
  },
  methods: {
    plusList() {
      this.$emit('plusList')
    }
  }
}
</script>

<style lang="scss" scoped>
.v-li-uploadList {
  width: 386px;
  height: 50px;
  margin: 10px auto;
  line-height: 50px;
  img {
    margin-top: -3px;
  }
  span {
    font-size: 14px;
    color: #3399FF;
  }
}
</style>