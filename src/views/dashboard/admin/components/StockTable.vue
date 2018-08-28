<template>
  <el-table :data="stockData" style="width: 100%;padding-top: 15px;">
    <el-table-column label="剩余库存" min-width="200">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>商品: {{ scope.row.productName }}</p>
          <p>规格: {{ scope.row.skuAttr }}</p>
          <p>库存: {{ scope.row.stockAmount }}</p>
          <div slot="reference" class="name-wrapper">
            {{ scope.row.productName }}
          </div>
        </el-popover>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  props: {
      stockData: {
          type: Array
      }
  },
  data() {
    return {
      list: null, 
    }
  },
  methods: {
  }
}
</script>