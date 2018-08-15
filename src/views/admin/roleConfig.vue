<template>
  <div class="app-container">
    <div class="buttons">
      <!--<el-button @click="getCheckedNodes">通过 node 获取</el-button>-->
      <!--<el-button @click="getCheckedKeys">通过 key 获取</el-button>-->
      <!--<el-button @click="setCheckedNodes">通过 node 设置</el-button>-->
      <!--<el-button @click="setCheckedKeys">通过 key 设置</el-button>-->
      <el-button @click="handleAdd">创建角色</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="ID"
          width="180">
          <template slot-scope="scope">
            <!--<i class="el-icon-time"></i>-->
            <span style="margin-left: 10px">{{ scope.row.roleId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.roleName }}</p>
              <p>详情: {{ scope.row.description }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.roleName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>创建时间: {{ scope.row.createTime }}</p>
              <p>更新时间: {{ scope.row.updateTime }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.createTime }}</el-tag>
              </div>
            </el-popover>
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
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    @open="dialogOpen()"
    @close="dialogClose()"
    width="50%" >
    <!--:before-close="handleClose"-->
  <!--&gt;-->
    <span>Role Id =  {{form.roleId}}</span>
    <el-form status-icon  :model="form">
      <el-form-item  prop="label" label="角色名" :label-width="'80px'">
        <el-input v-model="form.roleName" auto-complete="off"></el-input>
      </el-form-item>
      <!--<el-form-item  prop="label" label="角色描述" :label-width="'80px'">-->
        <!--<el-input v-model="form.description" auto-complete="off"></el-input>-->
      <!--</el-form-item>-->
    </el-form>
    <el-tree
      :data="treeData"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps">
    </el-tree>
    <div class="buttons">
      <!--<el-button @click="getCheckedNodes">通过 node 获取</el-button>-->
      <!--<el-button @click="getCheckedKeys">通过 key 获取</el-button>-->
      <!--<el-button @click="setCheckedNodes">通过 node 设置</el-button>-->
      <!--<el-button @click="setCheckedKeys">通过 key 设置</el-button>-->
      <el-button @click="resetChecked">清空</el-button>
    </div>

    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit(title)">确 定</el-button>
  </span>
  </el-dialog>
  </div>
</template>

<script>
  import { menuList, roleList, roleAdd, roleDelete, roleModify } from '@/api/permission'
  export default {
    data() {
      return {
        tableData: [{
          roleId: '',
          roleName: '',
          createTime: '上海市普陀区金沙江路 1518 弄',
          updateTime: '上海市普陀区金沙江路 1518 弄',
          description: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogVisible: false,
        treeData: [],
        defaultProps: {
          id: 0,
          parentId: 0,
          label: 'label',
          path: 'path',
          children: 'children'
        },
        title: '',
        form: {
          roleId: null,
          roleName: null,
          rolePermissionIdList: null
        }
      }
    },
    created() {
      roleList().then(response => {
        console.log(response)
        if (response.code === 200) {
          console.log(response.data)
          this.tableData = response.data
        }
      }).catch(err => console.log(err))

      menuList().then(response => {
        console.log(response)
        if (response.code === 200) {
          console.log(response.data)
          this.treeData = response.data
        }
      }).catch(err => console.log(err))
    },
    methods: {
      dialogOpen() {
        console.log('dialogOpen')
        setTimeout(() => {
          console.log(this.form.rolePermissionIdList)
          if (this.form.rolePermissionIdList) {
            this.setCheckedKeys(this.form.rolePermissionIdList)
          }
        }, 200)
      },
      dialogClose() {
        this.resetChecked()
        this.form.rolePermissionIdList = null
      },
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedKeys(list) {
        this.$refs.tree.setCheckedKeys(list)
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([])
      },
      handleAdd() {
        // this.resetChecked()
        this.dialogVisible = true
        this.title = '创建角色'
        this.form.roleId = ''
        this.form.roleName = ''
      },
      handleEdit(index, row) {
        this.dialogVisible = true
        this.title = '修改角色'
        this.form.roleId = row.roleId
        this.form.roleName = row.roleName
        console.log(row.rolePermissionIdList)
        if (row.rolePermissionIdList) {
          this.form.rolePermissionIdList = row.rolePermissionIdList
          // this.form.rolePermissIdList = row.rolePermissIdList.filter(id => Number.isInteger(id))
          // console.log(row.rolePermissIdList.filter(id => Number.isInteger(id)))
        }
        // console.log(this.form.rolePermissIdList)
        // this.resetChecked()
        // if (row.rolePermissIdList) {
        //   console.log(row.rolePermissIdList.filter(id => Number.isInteger(id)))
        //   this.setCheckedKeys(row.rolePermissIdList.filter(id => Number.isInteger(id)))
        // }
        // this.$refs.tree.setCheckedKeys(row.rolePermissIdList)
        // console.log(index, row)
      },
      handleDelete(index, row) {
        console.log(index, row)
      },
      list() {
        roleList().then(response => {
          console.log(response)
          if (response.code === 200) {
            console.log(response.data)
            this.tableData = response.data
          }
        }).catch(err => console.log(err))
      },
      submit(title) {
        if (title === '创建角色') {
          // 创建
          // console.log('roleId=' + this.form.roleId)
          console.log('Name=' + this.form.roleName)
          // console.log('rolePermissIdList=' + this.form.rolePermissIdList)
          console.log('permissIdList=' + this.$refs.tree.getCheckedKeys(true))
          // console.log(this.$refs.tree.getCheckedNodes())
          // this.$refs.tree.getCheckedNodes()
          const data = {
            roleName: this.form.roleName,
            rolePermissionIdList: this.$refs.tree.getCheckedKeys(true)
          }
          roleAdd(data).then(response => {
            if (response && response.code === 200) {
              console.log(response)
              this.dialogVisible = false
              this.list()
            }
          }).catch(err => console.log(err))

        } else if (title === '修改角色') {
          // 修改
          console.log('roleId=' + this.form.roleId)
          console.log('permissIdList=' + this.$refs.tree.getCheckedKeys(true))
          const data = {
            roleId: this.form.roleId,
            roleName: this.form.roleName,
            rolePermissionIdList: this.$refs.tree.getCheckedKeys(true)
          }
          roleModify(data).then(response => {
            if (response && response.code === 200) {
              console.log(response)
              this.dialogVisible = false
              this.list()
            }
          }).catch(err => console.log(err))
        }
      }
    }
  }
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    /*justify-content: space-between;*/
    font-size: 14px;
    padding-right: 8px;
  }
</style>
