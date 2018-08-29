<template>
  <div class="app-container">
    <div>
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
          prop="id"
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
            <!--<i class="el-icon-time"></i>-->
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column-->
          <!--label="活动名称"-->
          <!--width="180">-->
          <!--<template slot-scope="scope">-->
            <!--<el-popover trigger="hover" placement="top">-->
              <!--<p>活动名称: {{ scope.row.name }}</p>-->
              <!--<p>活动标签: {{ scope.row.tag }}</p>-->
              <!--<div slot="reference" class="name-wrapper">-->
                <!--<el-tag size="medium">{{ scope.row.name }}</el-tag>-->
              <!--</div>-->
            <!--</el-popover>-->
          <!--</template>-->
        <!--</el-table-column>-->
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
            <el-popover trigger="hover" placement="top">
              <!--<i class="el-icon-time"></i>-->
              <p v-for="strategy in scope.row.ruleStrategy">满: {{ strategy.full }} 减: {{ strategy.reduction }}</p>
              <div slot="reference" class="name-wrapper">
                <!--<el-tag size="medium">{{ scope.row.ruleStrategy[0] }}</el-tag>-->
                <el-tag size="medium" v-if="scope.row.ruleStrategy.length !== 0">满: {{ scope.row.ruleStrategy[0].full }}
                  减: {{ scope.row.ruleStrategy[0].reduction }}
                </el-tag>
              </div>
            </el-popover>
            <!--<i class="el-icon-time"></i>-->
            <!--<span v-for="e in JSON.parse(scope.row.ruleStrategy)" >{{ e }}</span>-->
            <!--<span>{{ JSON.parse(scope.row.ruleStrategy) }}</span>-->
            <!--<span v-for="e in scope.row.ruleStrategy">{{ e }}</span>-->
            <!--<span>{{ scope.row.ruleStrategy }}</span>-->
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
            <span>{{ scope.row.promotionId }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="状态"
          width="180">
          <template slot-scope="scope">
            <!--<i class="el-icon-time"></i>-->
            <span>{{ scope.row.status === 0 ? '已结束': '正在进行' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button v-if="scope.row.status === 1"
              size="mini"
              type="danger"
              @click="handlePromotionStatus(scope.$index, scope.row, 0)">结束活动
            </el-button>
            <el-button v-if="scope.row.status === 0"
                       size="mini"
                       type="success"
                       @click="handlePromotionStatus(scope.$index, scope.row, 1)">开启活动
            </el-button>
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
          layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>

  </div>

</template>

<script>
  import { promotionList,promotionStatus } from '@/api/promotion'
  // import fullReductionCreate from '@/views/promotionCenter/fullReduction/fullReductionCreate'
  import fullReductionEdit from '@/views/promotionCenter/fullReduction/fullReductionEdit'

  export default {
    name: 'fullReductionList',
    components: {
      // fullReductionCreate,
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
          ruleStrategy: [],
          productRange: '',
          productIdList: ''
        }],
        selectRow: null,
        editType: '创建活动'
      }
    },
    created() {
      this.queryList({})
    },
    methods: {
      handleSizeChange(pageSize) {
        console.log(`每页 ${pageSize} 条`)
        this.pagination.size = pageSize
        this.queryList({})
      },
      handleCurrentChange(pageNum) {
        console.log(`当前页: ${pageNum}`)
        this.pagination.page = pageNum
        this.queryList({})
      },

      queryList(param) {
        param.ruleType = 1
        param.pageNum = this.pagination.page
        param.pageSize = this.pagination.size
        promotionList(param).then(response => {
          console.log(response)
          if (response.code === 200) {
            this.pagination.total = response.total
            this.tableData = response.data.sort((a, b) => a.promotionId - b.promotionId)
            this.tableData.forEach(e => {
              if (e.ruleStrategy && typeof e.ruleStrategy === 'string') { // 规则是字符串必须转换成数组
                e.ruleStrategy = JSON.parse(e.ruleStrategy)
              }
            })
            // this.tableData = this.tableData.map(a => {
            //   return {}
            // })
          }
        }).catch(err => console.log(err))
      },
      goToList() {
        // this.showCreateCompoent = false
        this.showEditCompoent = false
        this.queryList({})
      },
      handleCreate() {
        this.editType = '创建活动'
        this.selectRow = null
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
      onEditSuccess(editType) {
        console.log(editType)
        this.showEditCompoent = false
        this.queryList({})
      },
      handlePromotionStatus(index, row, status) {
        // console.log(row)
        const params = {}
        params.vendorId = row.vendorId
        params.promotionId = row.promotionId
        params.status = status
        promotionStatus(params).then(response => {
          if (response.code === 200) {
            console.log(response)
            this.$message.success(response.msg)
            this.queryList({})
          }
        }).catch(err => console.log(err))
      }
    }
  }
</script>

<style scoped>

</style>
