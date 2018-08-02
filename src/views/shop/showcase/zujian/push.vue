<template>
  <div v-if="bool" class="v-uploadList" @click="uploadList">
    <i class="el-icon-plus"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    bool: Boolean
  },
  methods: {
    uploadList() {
      this.$emit('uploadList')
    }
  }
}
</script>

<style scoped>

</style>
