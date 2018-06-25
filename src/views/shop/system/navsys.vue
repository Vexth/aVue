<template>
  <div class="app-container">
    <div style="width:30%">
      <el-tree
        :data="data"
        node-key="id"
        :expand-on-click-node="false"
        :render-content="renderContent">
      </el-tree>
    </div>

    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%" center>
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接" :label-width="formLabelWidth">
          <el-input v-model="form.url" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="图标" :label-width="formLabelWidth">
          <el-input v-model="form.icon" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sub(title)">确 定</el-button>
      </div>
  </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [{
        id: 0,
        parentId: 0,
        label: '菜单管理',
        children: []
      }],
      formLabelWidth: '60px',
      form: {
        description: '',
        icon: 'icon',
        parentId: null,
        title: '',
        url: ''
      },
      title: '',
      dialogFormVisible: false
    }
  },

  created() {
    this.axios.get('/shop/getRoleMenu').then(res => {
      const data = res.data.data
      this.treeList(data)
    })
  },

  methods: {
    treeMap(data) {
      data.map(res => {
        res['label'] = res['title']
        if (res['children']) {
          this.treeMap(res['children'])
        }
      })
      return data
    },
    treeList(data) {
      const list = this.treeMap(data)
      this.data[0].children = list
    },
    success(data) {
      this.$notify({
        title: '成功',
        message: data,
        type: 'success'
      })
    },
    append(data, title) {
      this.dialogFormVisible = true
      this.form = {
        description: '',
        icon: 'icon',
        parentId: null,
        title: '',
        url: ''
      }
      this.title = title
      if (title === '新增') {
        this.form.parentId = data.id
      } else if (title === '修改') {
        this.form = data
      }
    },
    sub(data) {
      if (data === '新增') {
        this.add()
      } else if (data === '修改') {
        this.modify()
      }
    },

    // 新增
    add() {
      this.axios.post('/shop/roleMenuAdd', this.form).then(res => {
        const data = res.data.data
        this.treeList(data)
        this.dialogFormVisible = false
        this.success('新增成功')
      })
    },

    // 删除
    remove(node, data) {
      this.axios.post(`/shop/roleMenuDelete?id=${data.id}`).then(res => {
        const data = res.data.data
        this.treeList(data)
        this.success('删除成功')
      })
    },

    // 修改 POST /roleMenuModify
    modify() {
      this.axios.post('/shop/roleMenuModify', this.form).then(res => {
        const data = res.data.data
        this.treeList(data)
        this.dialogFormVisible = false
        this.success('修改成功')
      })
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <span>{node.label}</span>
          <span>
            <el-button size='mini' type='text' on-click={ () => this.append(data, '新增') }>新增</el-button>
            <el-button size='mini' type='text' on-click={ () => this.append(data, '修改') }>修改</el-button>
            <el-button size='mini' type='text' on-click={ () => this.remove(node, data) }>删除</el-button>
          </span>
        </span>)
    }
  }
}
</script>

<style scope>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
