<template>
  <div class="app-container">
    <el-button v-if="isParentId === 0" type="primary" @click="addKinds" size="small" icon="el-icon-circle-plus-outline">新增一级分类</el-button>
    <el-button v-else type="primary" size="small" icon="el-icon-circle-plus-outline">新增二级分类</el-button>
    <el-button type="success" size="small" icon="el-icon-sort">排序</el-button>
    <el-button v-if="isParentId !== 0" @click="back" size="small" icon="el-icon-back">返回上一级</el-button>

    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row @row-click="rowClick" style="width: 100%; margin-top: 20px;">

      <el-table-column width="100px" align="center" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.imageUrl" style="width: 50px;height: 50px;" >
        </template>
      </el-table-column>

      <el-table-column align="center" :label="label">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="序号">
        <template slot-scope="scope">
          <span>{{scope.row.sortId}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" @click='updateKinds(scope.row)' size="small" icon="el-icon-edit">修改</el-button>
          <el-button type="danger" @click="deleteKinds(scope.row)" size="small" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-dialog
      :title="title"
      :visible.sync="DialogVisible"
      width="50%"
      center>
      <div class="df">
        <span>{{title}}：</span>
        <el-input style="width: 68%" v-model="name" maxlength="18" placeholder="请输入内容" clearable></el-input>
      </div>
      <div class="df">
        <span>序号：</span>
        <el-input style="width: 68%" v-model="sortOrder" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入内容" clearable></el-input>
      </div>
      <div class="df" style="width: 100%;"></div>
      <!-- <div class="df">
        <span>当前等级：</span>
        <el-input style="width: 68%" v-model="currentGrade" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入内容" clearable></el-input>
      </div> -->
      <v-img ref="DialogImg" :KindsImageList="KindsImageList" :image="image" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sub(title)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import vImg from './img.vue'

import { shopKindsList, shopKindsImageList, shopAddKinds, shopUpdateKinds, shopDeleteKinds } from '../server'
export default {
  data() {
    return {
      label: '一级分组',
      kindsId: '',
      name: '',
      currentGrade: '',
      sortOrder: '',
      title: '',
      image: {},
      isParentId: 0,
      isGradeId: 1,
      selected: [],
      selectedImgList: [],
      isTrue: false,
      DialogVisible: false,
      KindsImageList: [],
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  components: {
    vImg
  },
  created() {
    this.kindsList(0, 1)
    this.kindsimageList(1)
  },
  methods: {
    kindsList(parentId, gradeId) {
      this.listLoading = true
      let list = {
        parentId,
        gradeId
      }
      // GET /api/v1/shop/kindsList 获取商户分类
      shopKindsList(list).then(res => {
        if (res.code === 200) {
          this.list = res.data.kindlist
        } else {
          this.$message.error(res.msg)
        }
        this.listLoading = false
      }).catch(err => console.log(err))
    },
    kindsimageList(gradeId) {
      // GET /api/v1/shop/kindsimage/list 查看分类图库列表
      shopKindsImageList({gradeId: gradeId}).then(res => res.code === 200 ? this.KindsImageList = res.data : this.$message.error(res.msg)).catch(err => console.log(err))
    },
    // 新增分类
    addKinds() {
      this.DialogVisible = true
      this.title = '新增分类'
      this.name = ''
      this.currentGrade = ''
      this.sortOrder = ''
      this.image = {}
    },
    addKindsList(list) {
      // POST /api/v1/shop/addKinds 添加分类
      shopAddKinds(list).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '新增成功!'
          })
          this.kindsList(this.isParentId, this.isGradeId)
          this.$refs.DialogImg.close()
          this.DialogVisible = false
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => console.log(err))
    },
    // 修改分类
    updateKinds(val) {
      event.stopPropagation()
      this.DialogVisible = true
      this.title = '修改分类'
      this.name = val.name
      this.currentGrade = this.isGradeId
      this.sortOrder = val.sortId
      this.kindsId = val.kindId
      const a = this.KindsImageList.filter(res => res.url === val.imageUrl)[0]
      this.image = a
    },
    updateKindsList(list) {
      // POST /api/v1/shop/updateKinds 修改分类
      shopUpdateKinds(this.kindsId, list).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.kindsList(this.isParentId, this.isGradeId)
          this.DialogVisible = false
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => console.log(err))
    },
    deleteKinds(val) {
      event.stopPropagation()
      // POST /api/v1/shop/deleteKinds 删除分类
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        shopDeleteKinds(val.kindId).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.kindsList(this.isParentId, this.isGradeId)
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => console.log(err))
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    rowClick(e) {
      if (this.isParentId === 0) {
        this.itemFn('二级分组', e.kindId, 2)
      }
    },
    back() {
      this.itemFn('一级分组', 0, 1)
    },
    itemFn(label, isParentId, isGradeId) {
      this.label = label
      this.isParentId = isParentId
      this.isGradeId = isGradeId
      this.kindsList(isParentId, isGradeId)
      this.kindsimageList(isGradeId)
    },
    sub(val) {
      this.selectedImgList = this.$refs.DialogImg.tpSub()
      if (this.selectedImgList.length !== 1) {
        this.$message.error('请选择一张图片作为分类的图标！')
        return
      }
      if (this.sortOrder === '') {
        this.$message.error('请填写序号！')
        return
      }
      if (this.name === '') {
        this.$message.error('请填写您要新增的分类！')
        return
      }
      const list = {
        name: this.name,
        currentGrade: this.isGradeId,
        sortOrder: this.sortOrder,
        parentId: this.isParentId,
        imageUrl: this.selectedImgList[0].url
      }
      if (this.title === '新增分类') {
        this.addKindsList(list)
      }
      if (this.title === '修改分类') {
        this.updateKindsList(list)
      }
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.df {
  /* display: flex; */
  margin-bottom: 20px;
  float: left;
}
.df span {
  line-height: 36px;
  margin-right: 5px;
}
</style>
