<template>
  <div style="padding: 10px;">
    <el-row :gutter="20" style="background-color: red;">
      <el-col :span="6"><div class="bg-purple"></div></el-col>
      <el-col :span="6"><div class="bg-purple"></div></el-col>
      <el-col :span="6"><div class="bg-purple"></div></el-col>
      <el-col :span="6"><div class="bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.bg-purple {
  min-height: 36px;
  background-color: red;
}
</style>
