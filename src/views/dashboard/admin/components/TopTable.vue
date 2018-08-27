<template>
  <el-table :data="topData.list" style="width: 100%;padding-top: 15px;">
    <el-table-column :label="topData.name" min-width="200">
      <template slot-scope="scope">
        <!-- {{scope.row.title}} -->
        <el-popover trigger="hover" placement="top">
          <p>商品: {{ scope.row.title }}</p>
          <p>数量: {{ scope.row.count }}</p>
          <div slot="reference" class="name-wrapper">
            {{ scope.row.title }}
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <!-- <el-table-column label="数量" width="195" align="center">
      <template slot-scope="scope">
        ¥{{scope.row.price | toThousandslsFilter}}
        {{scope.row.count}}
      </template>
    </el-table-column> -->
    <!-- <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>商品: {{ scope.row.title }}</p>
          <p>数量: {{ scope.row.count }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template> -->
  </el-table>
</template>

<script>
import { fetchList } from '@/api/transaction'

export default {
  props: {
      topData: {
          type: Object
      }
  },
  data() {
    return {
      list: null, 
    }
  },
  watch: {
    topData: {
      deep: true,
      handler(val) {
        //  this.setOptions(val)
         console.log(val)
      }
    }
  },
//   filters: {
//     statusFilter(status) {
//       const statusMap = {
//         success: 'success',
//         pending: 'danger'
//       }
//       return statusMap[status]
//     }
//   },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
    //   fetchList().then(response => {
    //     // this.list = response.data.items.slice(0, 8)
    //   })
    }
  }
}
</script>