<template>
  <div class="app-container">
    <el-button @click="handleAdd">创建商户</el-button>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="ID"
          width="180">
          <template slot-scope="scope">
            <!--<i class="el-icon-time"></i>-->
            <span style="margin-left: 10px">{{ scope.row.vendorId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户名"
          width="180">
          <template slot-scope="scope">
            <!--<i class="el-icon-time"></i>-->
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="商户名"
          width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>商户名: {{ scope.row.vendorName }}</p>
              <p>备注: {{ scope.row.vendorRemark }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.vendorName }}</el-tag>
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

    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="50%" center>
      <el-form :model="form" ref="formRules" :rules="formRules">
        <el-form-item prop="username" label="登录名" :label-width="formLabelWidth">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <!--<el-form-item prop="repassword" label="确认密码" :label-width="formLabelWidth">-->
          <!--<el-input type="password" v-model="form.repassword" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item prop="vendorName" label="店铺名字" :label-width="formLabelWidth">
          <el-input v-model="form.vendorName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺备注" :label-width="formLabelWidth">
          <el-input v-model="form.vendorRemark" auto-complete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="真实姓名" :label-width="formLabelWidth">-->
          <!--<el-input v-model="form.vendorName" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleId" placeholder="请选择绑定的角色">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.mobilePhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="appId" label="小程序 ID" :label-width="formLabelWidth">
          <el-input v-model="form.appId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="appSecret" label="小程序 secret" :label-width="formLabelWidth">
          <el-input v-model="form.appSecret" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="payMchId" label="微信支付 商户号" :label-width="formLabelWidth">
          <el-input v-model="form.payMchId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="payKey" label="微信支付 key" :label-width="formLabelWidth">
          <el-input v-model="form.payKey" placeholder="微信商户平台(pay.weixin.qq.com)-->账户设置-->API安全-->密钥设置" auto-complete="off"></el-input>
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
  import { roleList, vendorList, vendorAdd, vendorDelete, vendorModify } from '@/api/permission'
  export default {
    data() {
      const validateNotNull = (rule, value, callback) => {
        // if (!isvalidUsername(value)) {
        if (!value) {
          callback(new Error('不能为空！'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          // if (this.form.repassword !== '') {
          //   this.$refs.formRules.validateField('repassword')
          // }
          callback()
        }
      }
      // const validatePass2 = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请再次输入密码'))
      //   } else if (value !== this.form.password) {
      //     callback(new Error('两次输入密码不一致!'))
      //   } else {
      //     callback()
      //   }
      // }
      // var checkMobilePhone = (rule, value, callback) => {
      //   if (!value) {
      //     return callback(new Error('不能为空'))
      //   }
      //   setTimeout(() => {
      //     if (!Number.isInteger(value)) {
      //       callback(new Error('请输入11位手机'))
      //     } else {
      //       if (value.toString().length !== 11) {
      //         callback(new Error('必须11位'))
      //       } else {
      //         callback()
      //       }
      //     }
      //   }, 500)
      // }
      return {
        tableData: [],
        options: [],
        formLabelWidth: '140px',
        form: {
          vendorId: null,
          username: null,
          password: '',
          repassword: '',
          vendorName: '',
          vendorRemark: '',
          roleId: null,
          mobilePhone: '',
          appId: '',
          appSecret: '',
          payMchId: '',
          payKey: ''
        },
        formRules: {
          vendorId: [{ required: true, trigger: 'blur', validator: validateNotNull }],
          username: [{ required: true, trigger: 'blur', validator: validateNotNull }],
          password: [{ required: true, trigger: 'blur', validator: validatePass }],
          // repassword: [{ required: true, trigger: 'blur', validator: validatePass2 }],
          vendorName: [{ required: true, trigger: 'blur', validator: validateNotNull }],
          // vendorRemark: [{ required: true, trigger: 'blur', validator: validateNotNull }],
          roleId: [{ required: true, trigger: 'blur', validator: validateNotNull }],
          // mobilePhone: [{ required: true, trigger: 'blur', validator: checkMobilePhone }],
          appId: [{ required: true, trigger: 'blur', validator: validateNotNull }],
          appSecret: [{ required: true, trigger: 'blur', validator: validateNotNull }],
          payMchId: [{ required: true, trigger: 'blur', validator: validateNotNull }],
          payKey: [{ required: true, trigger: 'blur', validator: validateNotNull }]
        },
        title: '',
        dialogFormVisible: false
      }
    },
    created() {
      vendorList().then(response => {
        console.log(response)
        if (response.code === 200) {
          console.log(response.data)
          this.tableData = response.data
        }
      }).catch(err => console.log(err))

      roleList().then(response => {
        console.log(response)
        if (response.code === 200) {
          console.log(response.data)
          if (response.data) {
            this.options = response.data.map(e => {
              return { value: e.roleId, label: e.roleName }
            })

          }
          // tableData = response.data
        }
      }).catch(err => console.log(err))

    },
    methods: {
      list() {
        vendorList().then(response => {
          console.log(response)
          if (response.code === 200) {
            console.log(response.data)
            this.tableData = response.data
          }
        }).catch(err => console.log(err))
      },
      handleAdd() {
        this.dialogFormVisible = true
        this.title = '创建商户'
      },
      handleEdit(index, row) {
        console.log(row)
        this.dialogFormVisible = true
        this.title = '修改商户'
        this.form.vendorId = row.vendorId
        this.form.username = row.username
        this.form.password = row.password
        this.form.repassword = row.repassword
        this.form.vendorName = row.vendorName
        this.form.vendorRemark = row.vendorRemark
        this.form.roleId = row.roleId
        this.form.mobilePhone = row.mobilePhone
        this.form.appId = row.appId
        this.form.appSecret = row.appSecret
        this.form.payMchId = row.payMchId
        this.form.payKey = row.payKey
      },
      handleDelete(index, row) {
        console.log(row)
      },
      submit(title) {
        this.$refs.formRules.validate((valid) => {
          if (valid) {
            if (title === '创建商户') {
              vendorAdd(this.form).then(response => {
                if (response.code === 200) {
                  console.log(response)
                  this.dialogFormVisible = false
                  this.list()
                }
              }).catch(err => console.log(err))
            } else if (title === '修改商户') {
              console.log(this.form)
              vendorModify(this.form).then(response => {
                if (response.code === 200) {
                  console.log(response)
                  this.dialogFormVisible = false
                  this.list()
                }
              }).catch(err => console.log(err))
            }
            // alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
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
