<template>
  <div class="app-container">
    <div style="width:60%">
    <el-tree :data="data"
             :props="defaultProps"
             :expand-on-click-node="false"
             default-expand-all
             node-key="id"
    >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span style="width: 8em;">{{ node.label }} </span>
              <!--<span  style="width: 30em;" v-if="data.id !== 0"> id={{data.id}} pid={{data.parentId}}  path={{data.path}}</span>-->
              <span  style="width: 25em;" v-if="data.id !== 0">  path = {{data.path}}</span>
              <span>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => append(data)">
                  +增加
                </el-button>

                <el-button  v-if="data.id !== 0"
                  type="text"
                  size="mini"
                  @click="() => modify(data)">
                  修改
                </el-button>
                <el-button  v-if="data.id !== 0"
                  type="text"
                  size="mini"
                  @click="() => remove(data)">
                  -删除
                </el-button>
              </span>
          </span>
    </el-tree>
      <!--<el-tree-->
        <!--:data="data"-->
        <!--node-key="id"-->
        <!--:expand-on-click-node="true"-->
        <!--:defaultExpandAll="true"-->
        <!--:render-content="renderContent">-->
      <!--</el-tree>-->
    </div>

    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%" center>
      <el-form status-icon ref="formRules" :model="form" :rules="formRules">
        <el-form-item  prop="label" label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.label" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="path" label="链接" :label-width="formLabelWidth">
          <el-input v-model="form.path" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit(title)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { menuList, menuAdd, menuModify, menuDelete } from '@/api/permission'
  export default {
    'name': 'menuConfig',
    data() {
      const validateLabel = (rule, value, callback) => {
        // if (!isvalidUsername(value)) {
        if (!value) {
          callback(new Error('不能为空！'))
        } else {
          callback()
        }
      }
      const validatePath = (rule, value, callback) => {
        // if (!isvalidUsername(value)) {
        if (!value) {
          callback(new Error('不能为空！'))
        } else {
          callback()
        }
      }
      return {
        data: [{
          id: 0,
          label: '菜单管理',
          children: []
        }],
        defaultProps: {
          id: 0,
          parentId: 0,
          label: 'label',
          path: 'path',
          children: 'children'
        },
        formLabelWidth: '60px',
        form: {
          parentId: null,
          label: '',
          path: ''
        },
        formRules: {
          label: [{ required: true, trigger: 'blur', validator: validateLabel }],
          path: [{ required: true, trigger: 'blur', validator: validatePath }]
        },
        title: '',
        dialogFormVisible: false
      }
    },
    created() {
      menuList().then(response => {
        console.log(response)
        if (response.code === 200) {
          console.log(response.data)
          this.data[0].children = response.data
        }
      }).catch(err => console.log(err))
    },
    methods: {
      list() {
        menuList().then(response => {
          console.log(response)
          if (response && response.code === 200) {
            console.log(response.data)
            this.data[0].children = response.data
          }
        }).catch(err => console.log(err))
      },
      // 增加
      append(data) {
        console.log('self.id=' + data.id)
        this.dialogFormVisible = true

        this.form.id = null
        this.form.parentId = data.id
        this.form.label = ''
        this.form.path = ''
        this.title = '增加'
        // console.log('self.id=' + data.id)
        // const newChild = { id: id++, parentId: data.id, label: 'testtest', children: [] };
        // if (!data.children) {
        //   this.$set(data, 'children', []);
        // }
        // data.children.push(newChild);
      },
      fillDataToFrom(data) {
        this.form.id = data.id
        this.form.parentId = data.parentId
        this.form.label = data.label
        this.form.path = data.path
      },
      // 修改
      modify(data) {
        console.log(data)
        this.dialogFormVisible = true
        this.fillDataToFrom(data)
        this.title = '修改'
      },

      // 提交
      submit(title) {
        this.$refs.formRules.validate(vaild => {
          if (vaild) {
            if (title === '增加') {
              menuAdd(this.form).then(response => {
                // console.log(response)
                if (response && response.code === 200) {
                  this.dialogFormVisible = false
                  this.list()
                  this.$notify({
                    title: '增加成功',
                    message: response.msg,
                    type: 'success'
                  })
                }
              }).catch(err => console.log(err))
            } else if (title === '修改') {
              menuModify(this.form).then(response => {
                if (response && response.code === 200) {
                  this.dialogFormVisible = false
                  this.list()
                  this.$notify({
                    title: '修改成功',
                    message: response.msg,
                    type: 'success'
                  })
                }
              }).catch(err => console.log(err))
            }
            return true
          } else {
            return false
          }
        })
      },
      remove(data) {
        // console.log(data)
        menuDelete(data).then(response => {
          if (response && response.code === 200) {
            this.dialogFormVisible = false
            this.list()
            this.$notify({
              title: '删除成功',
              message: response.msg,
              type: 'success'
            })
          }
        }).catch(err => console.log(err))

        // const parent = node.parent;
        // const children = parent.data.children || parent.data;
        // const index = children.findIndex(d => d.id === data.id);
        // children.splice(index, 1);
      },
      handleNodeClick(data) {
        console.log(data)
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
