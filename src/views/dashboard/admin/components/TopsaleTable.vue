<template>
  <el-table :data="topData.list" style="width: 100%;padding-top: 15px;">
    <el-table-column :label="topData.name" min-width="200">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>商品: {{ scope.row.title }}</p>
          <!-- <p>数量: {{ scope.row.count/100|numFilter}}</p> -->
          <p>数量: {{ scope.row.count}}</p>
          <div slot="reference" class="name-wrapper">
            {{ scope.row.title }}
          </div>
        </el-popover>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  props: {
      topData: {
          type: Object
      }
  },
  filters: {
    numFilter(value) {
      // 截取当前数据到小数点后两位
      let realVal = Number(value).toFixed(2)
      // num.toFixed(2)获取的是字符串
      return Number(realVal)
    }
  },
  data() {
    return {
      list: null, 
    }
  },
//   watch: {
//     topData: {
//       deep: true,
//       handler(val) {
//          console.log(val)
//       }
//     }
//   },
  created() {
    // this.fetchData()
  },
  methods: {
    // fetchData() {
    // }
  }
}
</script>