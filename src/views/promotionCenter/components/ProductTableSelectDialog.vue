<template>
  <div>
    <el-dialog center title="选择商品" width="70%" :visible.sync="dialogTableVisible" @open="openDialog"
               @close="closeDialog">
      <el-form ref="productQueryForm" :inline="true" :model="formInDialogQueryParams" class="demo-form-inline">
        <el-form-item label="商品一级分类：">
          <el-select v-model="formInDialogQueryParams.groupId"  placeholder="选择商品分类" clearable>
            <el-option-group
              v-for="group in options"
              :key="group.groupId"
              :label="group.name">
              <el-option
                v-for="item in group.children"
                :key="item.value"
                :label="item.name"
                :value="item.groupId">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="商品二级分类：">-->
          <!--<el-select v-model="formInDialogQueryParams.secondClassGroupId" placeholder="选择商品分类" clearable>-->
            <!--<el-option-->
              <!--v-for="item in optionsSecond"-->
              <!--:key="item.value"-->
              <!--:label="item.name"-->
              <!--:value="item.groupId">-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="商品名称：">
          <el-input v-model="formInDialogQueryParams.title" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectProductList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="resetForm">重置</el-button>
        </el-form-item>
        <!--<el-button type="success" @click="handleAddAllProduct()">选择当前页全部可选商品</el-button>-->
      </el-form>

      <el-table ref="multipleTable"
                :data="dialogTableData"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange"
                v-loading="loading"
      >
        <el-table-column
          type="selection"
          width="55"
          :selectable="checkSelectable"
        >
          <!--<template slot-scope="scope">-->
          <!--<el-popover trigger="hover" placement="top">-->
          <!--<p>提示: {{ scope.row.tips }}</p>-->
          <!--<div slot="reference" class="name-wrapper">-->
          <!--<el-tag size="medium">{{ scope.row.tips }}</el-tag>-->
          <!--</div>-->
          <!--</el-popover>-->
          <!--</template>-->
        </el-table-column>
        <el-table-column align="center" prop="productId" label="ID" width="80"></el-table-column>
        <el-table-column
          align="center"
          label="图片"
          width="120">
          <template slot-scope="scope">
            <img class="productImage" :src="scope.row.productImageUrl">
            <!--<i class="el-icon-time"></i>-->
          </template>
        </el-table-column>
        <el-table-column prop="productName" label="商品名称" width="400"></el-table-column>
        <el-table-column label="市场价(元)">
          <template slot-scope="scope">
            <span>{{ scope.row.productPrice | priceFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="productStock" label="库存"></el-table-column>

        <el-table-column width="300" label="提示">
          <template slot-scope="scope">
            <span>{{ scope.row.tips }}</span>
          </template>
        </el-table-column>


        <!--<el-table-column label="操作">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button-->
        <!--v-if="scope.row.canSelected"-->
        <!--size="mini"-->
        <!--type="primary"-->
        <!--@click="handleAddProduct(scope.$index, scope.row)">选择-->
        <!--</el-button>-->
        <!--<el-button-->
        <!--v-else-->
        <!--size="mini"-->
        <!--type="danger"-->
        <!--@click="handleDeleteProduct(scope.$index, scope.row)">取消-->
        <!--</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->

      </el-table>


      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :pagination="pagination"
        :page-sizes="pagination.sizes"
        :page-size="pagination.size"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
      <!--<el-button type="success" @click="handleAddAllProduct()">当前页全部商品</el-button>-->
      <span slot="footer" class="dialog-footer" align="center">
      <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
        <el-button size="large" type="success" @click="handleAddProductConfirm()">确定选择</el-button>
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
        align="center"
        label="ID"
        width="80">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span>{{ scope.row.productId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        className="column_center"
        label="图片"
        width="120">
        <template slot-scope="scope">
          <img class="productImage" :src="scope.row.productImageUrl">
          <!--<i class="el-icon-time"></i>-->
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
          <span style="margin-left: 10px">{{ scope.row.productPrice | priceFormat }} 元</span>
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
                     @click="handleFastDeleteProduct(scope.$index, scope.row)">不参加
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>


</template>



<script>
  import { tree } from '@/views/shop/server'
  import { promotionProductList } from '@/api/promotion'
  import { RULE_TYPE_FULL_REDUCTION } from '@/views/promotionCenter/constant'

  export default {
    name: 'ProductTableSelectDialog',
    data() {
      return {
        // 以下是对话框中的表单
        dialogTableVisible: false,
        loading: false,
        dialogTableData: [
          {
            productId: '',
            productImageUrl: '',
            productName: '',
            productPrice: '',
            productStock: '',
            canSelected: false
          }
        ],
        tempSelectTableData: [], // 临时准备的删除表
        tableDataTempDelete: [], // 临时准备的删除表
        pagination: {
          total: 100,
          size: 20,
          page: 1,
          sizes: [10, 20, 50, 100]
        },
        formInDialogQueryParams: {
          title: '',
          groupId: '' // 二级分类ID
          // firstClassGroupId: '',
          // secondClassGroupId: '',
        },
        // 商品一级 二级 分类数据
        options: []
        // 商品二级分类数据
        // optionsSecond: []
      }
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      tableData: Array,
      promotionId: {
        type: Number,
        default: -1
      }
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
      // console.log('=====mounted=====')
      // tree().then(res => {
      //   this.options = res.data
      // }).catch(err => console.log(err))
      // this.selectProductList()
    },
    methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`)
        this.pagination.size = val
        this.selectProductList()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`)
        this.pagination.page = val
        this.selectProductList()
      },
      // 打开弹窗！
      openDialog() {
        tree().then(response => {
          if (response.code === 200) {
            console.log(response)
            this.options = response.data
          }
        }).catch(err => console.log(err))
        this.selectProductList()
      },
      // 关闭弹窗！
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

      // type="selection" 勾选框属性
      checkSelectable(row, index) {
        // console.log(row)
        return row.canSelected
      },
      // 行的样式
      // tableRowClassName(row, index) {
      //   if (!row.canSelected) {
      //     return 'warning-row'
      //   } else {
      //     return ''
      //   }
      // },
      selectProductList() {
        const query = {}
        query.title = this.formInDialogQueryParams.title
        query.groupId = this.formInDialogQueryParams.groupId
        query.pageNum = this.pagination.page
        query.pageSize = this.pagination.size
        query.ruleType = RULE_TYPE_FULL_REDUCTION
        if (this.promotionId && this.promotionId > 0) {
          query.currentPromotionId = this.promotionId
        }
        promotionProductList(query).then(response => {
          if (response.code === 200) {
            this.pagination.total = response.total
            // this.dialogTableData = res.data
            // console.log(response.data)
            this.dialogTableData = response.data
            this.loading = true
            setTimeout(() => {
              this.toggleSelection(this.tableData.map(o => o.productId))
              this.loading = false
            }, 600)
            // if (response.data) {
            //   this.dialogTableData = response.data.map(o => {
            // 已选中商品中，在弹窗中必须为取消
            // if (this.tableData.filter(t => {
            //   return t.productId === o.productId
            // }).length === 1) {
            //   o.canSelected = false
            // }

            // const o = {}
            // o.productId = e.product.id
            // o.productImageUrl = e.product.imgPrimaryList[0].url
            // o.productName = e.product.title
            // o.productPrice = e.product.priceUnderline
            // o.productStock = e.stockAmount
            // o.canSelected = this.tableData.filter(t => {
            //   return t.productId === o.productId
            // }).length === 0
            // console.log(x)
            // if (x.length === 0) {
            // }
            // return o
            // })
            // console.log(this.dialogTableData)
            // 勾选！
            // this.toggleSelection(this.tableData.map(o => o.productId))
            // setTimeout(() => {
            //   this.toggleSelection(this.tableData.map(o => o.productId))
            // }, 500)
            // }
          }
        }).catch(err => console.log(err))
      },
      toggleSelection(productIdList) {
        // console.log('----')
        // console.log(productIdList)
        const rows = this.dialogTableData.filter(o => productIdList.indexOf(o.productId) > -1)
        // console.log(rows)
        // rows = [this.dialogTableData[0], this.dialogTableData[1]]
        // this.$refs.multipleTable.clearSelection()
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row, true)
            // console.log(row.productId)
            // this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange(data) {
        console.log('change => ' + JSON.stringify(data))
        this.tempSelectTableData = data
        //   this.tableData = tableData
        //   table.forEach(row => {
        //     this.handleAddProduct('', row)
        //   })
      },
      handleAddAllProduct() {
        this.dialogTableData.forEach(row => {
          if (row.canSelected) {
            this.handleAddProduct('', row)
          }
        })
      },
      handleAddProductConfirm() {
        this.$emit('onProductSelectChange', this.tempSelectTableData)
        this.dialogTableVisible = false
        // this.dialogTableData.forEach(row => {
        //   if (row.canSelected === true) {
        //     this.handleAddProduct(null, row)
        //   }
        // })
      },
      handleAddProduct(index, row) {
        // console.log(index)
        // console.log(row)
        row.canSelected = false
        this.tableData.push(row)
        // const target = this.tableDataTempDelete.indexOf(row)
        // if (target !== -1) {
        //   this.tableDataTempDelete.splice(target, 1)
        //   this.$emit('onProductSelectChange', this.tableData)
        // }
        // this.$emit('update:tableData', this.tableData)
        // this.$emit('onProductSelectChange', this.tableData)
      },
      // 选中商品弹窗中 产品删除
      handleDeleteProduct(i, row) {
        // console.log(i)
        // console.log(row)
        const match = this.tableData.filter(o => o.productId === row.productId)
        if (match.length === 1) {
          const target = match[0]
          row.canSelected = true
          this.tableData.splice(target, 1)
          // this.tableDataTempDelete.push(row)
        }
        // const index = this.tableData.indexOf(row)
        // console.log(index)
        // if (index !== -1) {
        //   row.canSelected = true
        //   this.tableData.splice(index, 1)
        //   // this.$emit('onProductSelectChange', this.tableData)
        // }
      },
      // 直接删除操作
      handleFastDeleteProduct(i, row) {
        const index = this.tableData.indexOf(row)
        // console.log(index)
        if (index !== -1) {
          row.canSelected = true
          this.tableData.splice(index, 1)
          // this.$emit('onProductSelectChange', this.tableData)
        }
        // this.tableDataTempDelete.push(row)
      }
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
  .productImage {
    width: 80%;
    height: 56px;
  }

  .column_center {
    text-align: center !important;
  }
</style>
