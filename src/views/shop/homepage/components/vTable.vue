<template>
  <el-table
    :data="tableData"
    style="width: 900px">
    <el-table-column type="index" width="50">
    </el-table-column>
    <el-table-column prop="cellLabel" label="名称" min-width="300">
    </el-table-column>
    <el-table-column prop="address" label="操作" min-width="300">
      <template slot-scope="scope">
        <el-button v-if="index === '1'" type="warning" size="small" @click="warning(scope.row)" plain>下架</el-button>
        <template v-else>
          <el-button type="success" size="small" @click="success(scope.row)" plain>上架</el-button>
          <!-- <el-button type="primary" size="small" @click="primary(scope.row)" plain>编辑</el-button> -->
          <el-button type="danger" size="small" @click="danger(scope.row)" plain>删除</el-button>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: []
    },
    index: String
  },
  methods: {
    warning(v) {
      this.$emit('isClick', v.cellId)
    },
    success(v) {
      this.$emit('isClick', v.cellId)
    },
    // primary(v) {
    //   this.$emit('primary', v)
    // },
    danger(v) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('danger', v.cellId)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })        
      })
    }
  }
}
</script>

<style>

</style>
