<template>
  <div class="app-container" >
    <div >
      <!--<el-button @click="getCheckedNodes">通过 node 获取</el-button>-->
      <!--<el-button @click="getCheckedKeys">通过 key 获取</el-button>-->
      <!--<el-button @click="setCheckedNodes">通过 node 设置</el-button>-->
      <el-button icon="el-icon-back" v-if="showEditCompoent" type="danger" @click="goToList">回到列表</el-button>
    </div>
    <!--<full-reduction-create v-if="showCreateCompoent" @createSuccess="onCreateSuccess">-->
    <!--</full-reduction-create>-->

    <full-reduction-edit v-if="showEditCompoent" :data="selectRow" :editType="editType" @editSuccess="onEditSuccess">
    </full-reduction-edit>
    <!--<component :is="componentId" v-if="showCreateCompoent"></component>-->
    <div v-if="!showEditCompoent">
      <el-button @click="handleCreate">创建促销活动</el-button>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="ID"
          width="60">
          <template slot-scope="scope">
            <!--<i class="el-icon-time"></i>-->
            <span style="margin-left: 10px">{{ scope.row.promotionId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="活动名称"
          width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>活动名称: {{ scope.row.name }}</p>
              <p>活动标签: {{ scope.row.tag }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="开始时间"
          width="210">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <i class="el-icon-time"></i>
              <p>开始时间: {{ scope.row.beginTime }}</p>
              <p>结束时间: {{ scope.row.endTime }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.beginTime }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
          label="活动详情"
          width="180">
          <template slot-scope="scope">
            <!--<i class="el-icon-time"></i>-->
            <span>{{ scope.row.ruleStrategy }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="参与用户数"
          width="120">
          <template slot-scope="scope">
            <!--<i class="el-icon-time"></i>-->
              <span>{{ scope.row.promotionId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="已付款用户数"
          width="120">
          <template slot-scope="scope">
              <span>{{ scope.row.promotionId }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="实际支付总额"
          width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.promotionId }}</span>
            </template>
        </el-table-column>

        <el-table-column
          label="平均单笔价"
          width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.pormotionId }}</span>
            </template>
        </el-table-column>

        <el-table-column
          label="状态"
          width="180">
          <template slot-scope="scope">
              <!--<i class="el-icon-time"></i>-->
              <span>{{ scope.row.status === 0 ? '已结束': scope.row.status === 1? '未开始': '进行中' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handlePromotionOver(scope.$index, scope.row)">结束活动</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
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
      </div>
    </div>

  </div>

</template>

<script>
  import { promotionList } from '@/api/promotion'
  import fullReductionCreate from '@/views/promotionCenter/fullReduction/fullReductionCreate'
  import fullReductionEdit from '@/views/promotionCenter/fullReduction/fullReductionEdit'
  export default {
    name: 'fullReductionList',
    components: {
      fullReductionCreate,
      fullReductionEdit
    },
    data() {
      return {
        // showCreateCompoent: false,
        showEditCompoent: false,
        // componentId: 'fullReductionCreate',
        pagination: {
          total: 100,
          size: 10,
          page: 1,
          sizes: [10, 20, 50, 100]
        },
        tableData: [{
          promotionId: '',
          name: '',
          tag: '',
          beginTime: '',
          endTime: '',
          limitProductAmount: '',
          limitUserAmount: '',
          userRange: '',
          vendorRemark: '',
          ruleType: '',
          ruleStrategy: '',
          productRange: '',
          productIdList: '',
        }],
        selectRow: null,
        editType: '创建活动'
      }
    },
    created() {
      this.queryList({})
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pagination.size = val
        this.queryList({})
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.pagination.page = val
        this.queryList({})
      },

      queryList(param) {
        param.ruleType = 1
        param.pageNum = this.pagination.page
        param.pageSize = this.pagination.size
        promotionList(param).then(response => {
          console.log(response)
          if (response.code === 200) {
            this.tableData = response.data
          }
        })
      },
      goToList() {
        this.showCreateCompoent = false
        this.showEditCompoent = false
        this.queryList({})
      },
      handleCreate() {
        this.selectRow = {}
        this.showEditCompoent = true
      },
      handleEdit(index, row) {
        console.log(row)
        this.editType = '更新活动'
        this.selectRow = row
        this.showEditCompoent = true
      },
      // onCreateSuccess() {
      //   this.showCreateCompoent = false
      //   this.queryList({})
      // },
      onEditSuccess() {
        this.showEditCompoent = false
        this.queryList({})
      },
      handlePromotionOver(index, row) {
        console.log(row)
      }
    }
  }
</script>

<style scoped>

</style>
