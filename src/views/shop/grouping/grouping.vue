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

    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="50%" center>
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="链接" :label-width="formLabelWidth">
          <el-input v-model="form.url" auto-complete="off"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="图标" :label-width="formLabelWidth">
          <el-input v-model="form.icon" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="form.sortOrder" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <v-img ref="DialogImg" :KindsImageList="KindsImageList" :image="image" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sub(title)">确 定</el-button>
      </div>
  </el-dialog>
  </div>
</template>

<script>
import vImg from './img.vue'
export default {
  data() {
    return {
      data: [{
        groupId: 0,
        parentId: 0,
        label: '分类管理',
        children: []
      }],
      formLabelWidth: '60px',
      form: {
        groupId: null,
        parentId: null,
        name: '',
        imageId: '',
        sortOrder: null
      },
      title: '',
      dialogFormVisible: false,
      KindsImageList: [],
      image: {}
    }
  },

  components: {
    vImg
  },

  created() {
    this.getTreeList()
    this.getImg()
  },

  methods: {
    getImg() {
      this.axios.get('api/v1/shop/image/list').then(res => {
        if (res.data.code === 200) {
          this.KindsImageList = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => console.log(err))
    },
    getTreeList() {
      // GET /api/v1/shop/product/group/tree 商家获取商品分组
      this.axios.get('api/v1/shop/product/group/tree').then(res => {
        const data = res.data.data
        this.treeList(data)
      }).catch(err => console.log(err))
    },
    treeMap(data) {
      data.map(res => {
        res['label'] = res['name']
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
        groupId: null,
        parentId: null,
        name: '',
        imageId: '',
        sortOrder: null
      }
      this.title = title
      if (title === '新增') {
        this.form.parentId = data.groupId
      } else if (title === '修改') {
        this.form = data
        this.image = {
          id: data.imageId,
          url: data.imageUrl
        }
      }
    },
    sub(data) {
      const list = this.$refs.DialogImg.tpSub()
      if (list.length > 1) {
        this.$message.error('请选择一张图片作为轮播图片！')
        return
      }
      this.form.imageId = list[0]['id']
      if (data === '新增') {
        this.add()
      } else if (data === '修改') {
        this.modify()
      }
    },

    // 新增
    add() {
      const list = {
        parentId: this.form.parentId,
        name: this.form.name,
        imageId: this.form.imageId,
        sortOrder: this.form.sortOrder
      }
      // POST /api/v1/shop/product/group/add 商家添加商品分组
      this.axios.post('api/v1/shop/product/group/add', list).then(res => {
        this.getTreeList()
        this.dialogFormVisible = false
        this.success('新增成功')
      }).catch(err => console.log(err))
    },

    // 删除
    remove(node, data) {
      this.$confirm('确认是否删除？').then(_ => {
        // DELETE /api/v1/shop/product/group/delete 商家删除商品分组
        this.axios.delete(`api/v1/shop/product/group/delete?groupId=${data.groupId}`).then(res => {
          this.getTreeList()
          this.success('删除成功')
        }).catch(err => console.log(err))
        done()
      }).catch(_ => {})
    },

    // 修改 
    modify() {
      const list = {
        groupId: this.form.groupId,
        name: this.form.name,
        imageId: this.form.imageId,
        sortOrder: this.form.sortOrder
      }
      // POST /api/v1/shop/product/group/modify 商家修改商品分组
      this.axios.post('api/v1/shop/product/group/modify', list).then(res => {
        this.getTreeList()
        this.dialogFormVisible = false
        this.success('修改成功')
      }).catch(err => console.log(err))
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