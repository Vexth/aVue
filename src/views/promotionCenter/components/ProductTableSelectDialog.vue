<template>
  <div>
    <el-dialog title="选择商品" width="60%" :visible.sync="dialogTableVisible" @open="openDialog" @close="closeDialog">
      <el-form ref="productQueryForm" :inline="true" :model="formInDialogQueryParams" class="demo-form-inline">
        <el-form-item label="商品分类：">
          <el-select v-model="formInDialogQueryParams.groupId" placeholder="选择商品分类">
            <el-option label="无" value="-1"></el-option>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.groupId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称：">
          <el-input v-model="formInDialogQueryParams.title" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectProductList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="dialogTableData"  tooltip-effect="dark"  @selection-change="handleSelectionChange">
        <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="55">-->
        <!--</el-table-column>-->
        <el-table-column prop="productId" label="ID" width="150"></el-table-column>
        <el-table-column prop="productName" label="商品名称" width="400"></el-table-column>
        <el-table-column label="市场价(元)" >
          <template slot-scope="scope">
            <span>{{ scope.row.productPrice | formatPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="productStock" label="库存"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.isShow"
              size="mini"
              type="primary"
              @click="handleAddProduct(scope.$index, scope.row)">选择</el-button>
            <el-button
              v-else
              disabled="disabled"
              size="mini"
              type="success"
              @click="handleAddProduct(scope.$index, scope.row)">已选中</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :pagination="pagination"
        :page-sizes="pagination.sizes"
        :page-size="pagination.size"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="handleAddProductConfirm()">确 定</el-button>-->
    </span>
    </el-dialog>



    <!--<el-form-item  label="活动商品:">-->
      <!--<el-col>-->
        <!--<el-radio-group>-->
          <!--<el-radio label="1">所有商品参加</el-radio>-->
          <!--<el-radio label="2">部分商品参加</el-radio>-->
          <!--<el-radio label="3">部分商品不参加</el-radio>-->
        <!--</el-radio-group>-->
      <!--</el-col>-->
      <!--<el-col>-->
        <!--<el-button type="primary" size="mini" @click="dialogTableVisible = true">+ 添加商品</el-button>-->
      <!--</el-col>-->
    <!--</el-form-item>-->

    <!--已经选择商品的表格-->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="ID"
        width="180">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span style="margin-left: 10px">{{ scope.row.productId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品名称"
        width="180">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span style="margin-left: 10px">{{ scope.row.productName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品市场价"
        width="180">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span style="margin-left: 10px">{{ scope.row.productPrice | formatPrice }} 元</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品总库存"
        width="180">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span style="margin-left: 10px">{{ scope.row.productStock }} 件</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDeleteProduct(scope.$index, scope.row)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>


</template>

<script>
  import { tree, shopProductList } from '@/views/shop/server'
  export default {
    name: 'ProductTableSelectDialog',
    data() {
      return {
        // 以下是对话框中的表单
        dialogTableVisible: false,
        dialogTableData: [
          {
            productId: '',
            productName: '',
            productPrice: '',
            productStock: '',
            isShow: false
          }
        ],
        pagination: {
          total: 100,
          size: 10,
          page: 1,
          sizes: [10, 20, 50, 100]
        },
        formInDialogQueryParams: {
          title: '',
          groupId: ''
        },
        options: []
      }
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      tableData: Array
    },
    watch: {
      visible(val) {
        // console.log(val)
        // if (val){
        this.dialogTableVisible = val
        // }
      }
    },
    mounted() {
      // tree().then(res => {
      //   this.options = res.data
      // }).catch(err => console.log(err))
      // this.selectProductList()
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pagination.size = val
        this.selectProductList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.pagination.page = val
        this.selectProductList()
      },
      openDialog() {
        tree().then(res => {
          this.options = res.data
        }).catch(err => console.log(err))
        this.selectProductList()
      },
      closeDialog() {
        // this.dialogTableVisible = false
        this.$emit('update:visible', false)
      },
      resetForm() {
        this.formInDialogQueryParams.title = ''
        this.formInDialogQueryParams.groupId = ''
        this.selectProductList()
        // this.$refs['productQueryForm'].resetFields()
      },
      selectProductList() {
        // if (this.formInDialogQueryParams.groupId !== '-1') {
        //   query.groupId = this.formInDialogQueryParams.groupId
        // }
        // query.title = this.formInDialogQueryParams.title

        const query = this.formInDialogQueryParams
        query.pageNum = this.pagination.page
        query.pageSize = this.pagination.size
        shopProductList(query).then(res => {
          this.pagination.total = res.total
          // this.dialogTableData = res.data
          // console.log(res.data)
          if (res.data) {
            this.dialogTableData = res.data.map(e => {
              const o = {}
              o.productId = e.product.id
              o.productName = e.product.title
              o.productPrice = e.product.priceUnderline
              o.productStock = e.stockAmount
              o.isShow = this.tableData.filter(e => {
                return e.productId === o.productId
              }).length === 0
              // console.log(x)
              // if (x.length === 0) {
              // }
              return o
            })
            // console.log(this.dialogTableData)
          }
        }).catch(err => console.log(err))
      },
      handleSelectionChange(table) {
        // console.log(table)
        // table.forEach(row => {
        //   this.handleAddProduct('', row)
        // })
      },
      handleAddProduct(index, row) {
        // console.log(index)
        // console.log(row)
        row.isShow = false
        this.tableData.push(row)
        // this.$emit('update:tableData', this.tableData)
        this.$emit('onProductSelectChange', this.tableData)
      },
      // 产品删除
      handleDeleteProduct(i, row) {
        const index = this.tableData.indexOf(row)
        if (index !== -1) {
          this.tableData.splice(index, 1)
          this.$emit('onProductSelectChange', this.tableData)
        }
      },
      // handleAddProductConfirm() {
      //   const selection = this.multipleSelection
      //   console.log(selection)
      //   selection.forEach(sel => this.tableData.push(sel))
      //   console.log(index)
      //   console.log(row)
      //   this.tableData.push(row)
      //   console.log(row.roleId)
      //   const roleId = row.roleId
      //   roleDelete({ roleId }).then(response => {
      //     if (response.code === 200) {
      //       // console.log(response)
      //       this.dialogVisible = false
      //       this.list()
      //     }
      //   }).catch(err => console.log(err))
      // },
    }

  }
</script>

<style scoped>

</style>
