<!-- 分页控件 -->
<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pagination.sizes"
    :page-size="pagination.size"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pagination.total">
  </el-pagination>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1
    }
  },
  props: {
    pagination: Object
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>

<style>

</style>
