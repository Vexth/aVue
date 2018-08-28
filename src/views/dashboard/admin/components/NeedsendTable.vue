<template>
  <el-table :data="sendData" style="width: 100%;padding-top: 15px;">
    <el-table-column label="待发货列表" min-width="200">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>商品: {{ scope.row.productName }}</p>
          <p>规格: {{ scope.row.skuAttr }}</p>
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
      sendData: {
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