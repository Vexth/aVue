<template>
  <div class="app-container">

    <el-button style="margin-bottom: 20px;" type="primary" @click="add">新增商品</el-button>
    <el-row>
      <el-col :span="4">
        <div class="grid-content">
          <span>商品名称：</span>
          <el-input v-model="formInline.title" placeholder="商品名称" clearable></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <span>商品分组：</span>
          <el-select v-model="formInline.groupId" placeholder="商品分组" clearable>
            <el-option
              v-for="item in optionsFZ"
              :key="item.value"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <span>商品类型：</span>
          <el-select v-model="formInline.categoryId" placeholder="商品类型" clearable>
            <el-option
              v-for="item in optionsLX"
              :key="item.value"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <span>指定车型：</span>
          <el-select v-model="formInline.carInfoId" placeholder="指定车型" clearable>
            <el-option label="区域一" value="0"></el-option>
            <el-option label="区域二" value="1"></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="4">
        <div class="grid-content">
          <span>销售情况：</span>
          <el-select v-model="formInline.saleStatus" placeholder="销售情况">
            <el-option label="出售中" value="0"></el-option>
            <el-option label="售完" value="2"></el-option>
            <el-option label="仓库中" value="1"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <span>总销量：</span>
          <el-input placeholder="请输入内容" v-model="formInline.totalSaleAmountMin" clearable @change="checkNo(formInline.totalSaleAmountMin, 'totalSaleAmountMin')"
            type="text" onkeypress="return event.keyCode>=48&&event.keyCode<=57"></el-input>
          <b> - </b>
          <el-input placeholder="请输入内容" v-model="formInline.totalSaleAmountMax" clearable  @change="checkNo(formInline.totalSaleAmountMax, 'totalSaleAmountMax')"
            type="text" onkeypress="return event.keyCode>=48&&event.keyCode<=57"></el-input>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content">
          <span>价格：</span>
          <el-input placeholder="请输入内容" v-model="formInline.priceMin" clearable @change="checkNo(formInline.priceMin, 'priceMin')"
            type="text" :maxlength="6" onkeypress="return event.keyCode>=48&&event.keyCode<=57"></el-input>
          <b> - </b>
          <el-input placeholder="请输入内容" v-model="formInline.priceMax" clearable @change="checkNo(formInline.priceMax, 'priceMax')"
            type="text" :maxlength="6" onkeypress="return event.keyCode>=48&&event.keyCode<=57"></el-input>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="4"><div class="grid-content"><el-button type="primary" @click="onSubmit">查询</el-button></div></el-col>
    </el-row>

    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

      <!-- <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column> -->

      <el-table-column align="center" label="商品ID">
        <template slot-scope="scope">
          <span :title="scope.row.product.id" style="text-align: left;display: inline-block;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.product.id}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="商品">
        <template slot-scope="scope">
          <span :title="scope.row.product.title" style="text-align: left;display: inline-block;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.product.title}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="价格">
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="访问量">
        <template slot-scope="scope">
          <span>{{scope.row.accessCount}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="库存">
        <template slot-scope="scope">
          <span>{{scope.row.stockAmount}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="总销量">
        <template slot-scope="scope">
          <span>{{ scope.row.totalSaleAmount }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="序号">
        <template slot-scope="scope">
          <span>{{ scope.row.sortOrder }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="primary" @click='confirmEdit(scope.row)' size="small" icon="el-icon-edit">修改</el-button>
        </template>
      </el-table-column>

    </el-table>
    <v-pagination v-if="pagination.total !== 0" :pagination="pagination" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" />
  </div>
</template>

<script>
import { category, tree, shopProductList } from '../server'

import vPagination from '../pagination/pagination.vue'
export default {
  data() {
    return {
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      optionsFZ: [],
      optionsLX: [],
      formInline: {
        // 商品名称
        title: '',
        // 车型ID
        carInfoId: null,
        // 商品类目ID
        categoryId: null,
        // 商品分组
        groupId: null,
        // 商品总销量min
        totalSaleAmountMin: null,
        // 商品总销量max
        totalSaleAmountMax: null,
        // 商品价格max
        priceMax: null,
        // 商品价格min
        priceMin: null,
        // 销售状态 0:出售中， 1：售完， 2：仓库中
        saleStatus: '0'
      },
      pagination: {
        total: 100,
        size: 10,
        page: 1,
        sizes: [10, 20, 50, 100]
      }
    }
  },
  components: {
    vPagination
  },
  created() {
    this.getList()
    this.getCategoryOption()
    this.getGroupOption()
  },
  methods: {
    getCategoryOption() {
      // GET /api/v1/shop/product/category
      category().then(res => res.code === 200 ? this.optionsLX = res.data : console.log(res)).catch(err => console.log(err))
    },
    getGroupOption() {
      // // GET /api/v1/shop/product/group/tree
      tree().then(res => res.code === 200 ? this.optionsFZ = res.data : console.log(res)).catch(err => console.log(err))
    },
    getList() {
      this.listLoading = false
      const params = this.formInline
      params['pageNum'] = this.pagination.page
      params['pageSize'] = this.pagination.size
      shopProductList(params).then(res => {
        console.log(res)
        this.pagination.total = res.total
        const items = res.data
        this.list = items
        this.listLoading = false
      }).catch(err => console.log(err))
    },
    checkNo(value, event) {
      const reg = /^[1-9]\d*$/
      if (value) {
        if (value > 999999 || new RegExp(reg).test(value) === false) {
          this.$message.error('请填写数字！')
          setTimeout(() => {
            this.formInline[event] = ''
          }, 200)
        }
      }
    },
    confirmEdit(row) {
      // GET /api/v1/wechat/productDetail
      // console.log(row.product.id)
      this.$router.push({ path: '/showcase/modifygoods', query: { id: row.product.id }})
      // row.edit = false
      // row.originalTitle = row.title
      // this.$message({
      //   message: 'The title has been edited',
      //   type: 'success'
      // })
    },
    add() {
      this.$router.push({ path: '/showcase/addlist' })
    },
    onSubmit() {
      this.getList()
    },
    handleSizeChange(val) {
      this.pagination.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.pagination.page = val
      this.getList()
    }
  }
}
</script>

<style scoped>
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}

.el-col-4 {
  width: 281px;
}
.el-col-7{
  width: 491px;
}

.el-input{
  width: 200px;
}

.grid-content {
  min-height: 36px;
  margin-bottom: 20px;
}
.grid-content span {
  width: 70px;
  font-size: 13px;
  display: inline-block;
  text-align: right;
}
</style>
