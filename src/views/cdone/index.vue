<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="150px">
      <div class="title">基本信息</div>
      <el-form-item label="商品名称：">
        <div>{{form.title}}</div>
        <!-- <el-input v-model="form.title"></el-input> -->
      </el-form-item>
      <el-form-item label="分享描述：">
        <el-input v-model="form.brief"></el-input>
      </el-form-item>
      <div class="title">价格库存</div>
      <el-form-item label="规格明细：">
        <template>
          <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

            <el-table-column align="center" label="颜色" width="80">
              <template slot-scope="scope">
                <span>{{scope.row['attrs'][0]['attrContent']}}</span>
              </template>
            </el-table-column>

            <el-table-column width="120px" align="center" label="尺寸">
              <template slot-scope="scope">
                <span>m</span>
              </template>
            </el-table-column>

            <el-table-column min-width="200px" label="价格（元）">
              <template slot-scope="scope">
                <template v-if="isBool">
                  <el-input class="edit-input" size="small" v-model="scope.row.unitPrice"></el-input>
                  <!-- <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button> -->
                </template>
                <span v-else>{{ scope.row.unitPrice }}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="200px" label="库存">
              <template slot-scope="scope">
                <template v-if="isBool">
                  <el-input class="edit-input" size="small" v-model="scope.row.stockAmount"></el-input>
                  <!-- <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button> -->
                </template>
                <span v-else>{{ scope.row.stockAmount }}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="200px" label="规格编码">
              <template slot-scope="scope">
                <span >{{ scope.row.stockSn }}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="200px" label="成本价">
              <template slot-scope="scope">
                <span>{{ scope.row.costPrice }}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="200px" label="销量">
              <template slot-scope="scope">
                <span>{{ scope.row.saleAmount }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="Actions" width="120">
              <template slot-scope="scope">
                <el-button v-if="isBool" type="success" @click="confirmEdit(scope.row, isBool)" size="small" icon="el-icon-circle-check-outline">Ok</el-button>
                <el-button v-else type="primary" @click='isBool=!isBool' size="small" icon="el-icon-edit">Edit</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Dropzone from '@/components/Dropzone/index.vue'
export default {
  data() {
    return {
      listLoading: false,
      dataList: [],
      list: null,
      isBool: false,
      form: {
        title: '',
        brief: ''
      }
    }
  },
  created() {
    //GET /api/v1/wechat/productDetail
    this.axios.get(`shop1/wechat/productDetail?productId=${this.$route.query.id}`).then(res => {
      console.log(res.data.data)
      const data = res.data.data
      this.form.title = data[0]['product']['title']
      this.form.brief = data[0]['product']['brief']
      this.list = data
    })
  },
  methods: {
    confirmEdit(row, bool) {
      console.log(row)
      this.isBool = !bool
      this.axios.post(`shop1/modifyProduct`, row).then(res => {
        console.log(res)
      })
      //GET /api/v1/wechat/productDetail
      // console.log(row.id)
      // row.edit = false
      // row.originalTitle = row.title
      // this.$message({
      //   message: 'The title has been edited',
      //   type: 'success'
      // })
    },
    cancelEdit(row) {
      console.log(row)
    }
  }
}
</script>
<style scoped>
.title {
  background-color: #f8f8f8;
  font-size: 14px;
  font-weight: 700;
  padding: 10px;
  margin-bottom: 20px;
}
.el-input {
  width: 200px;
}
</style>
