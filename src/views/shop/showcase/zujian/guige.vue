<template>
  <div>
    <div class="title mb0">
      <span>规格名：</span>
      <el-select v-model="value1" placeholder="请选择" @change="itemsListFn">
        <el-option
          v-for="item in ggNmaeList"
          :key="item.value"
          :label="item.attrName"
          :value="item.id"
          :disabled="item.disabled"
        >
        </el-option>
      </el-select>
      <el-button @click="Guige">添加规格名</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="del"></el-button>
    </div>

    <div class="title mb0 bgf">
      <span>规格值：</span>
      <el-select v-if="productType === '1'" v-model="state1" placeholder="请选择" @change="sub">
        <el-option
          v-for="item in options5"
          :key="item.id"
          :label="item.attrName"
          :value="item.id">
        </el-option>
      </el-select>

      <el-select v-else
        v-model="state1"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="请选择" @change="sub">
        <el-option
          v-for="item in options5"
          :key="item.id"
          :label="item.attrName"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button @click="Guige">添加规格值</el-button>
    </div>

    <el-dialog
      :title="title"
      :visible.sync="centerDialogVisible"
      :before-close="handerClose"
      width="30%"
      center>
      <div style="text-align: center;">
        <span>{{title}}：</span>
        <el-input v-model="formGuige"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handerClose">取 消</el-button>
        <el-button type="primary" @click="subGuige">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getSkuAttrOption, productSkuAttrCreate } from '../../server'
export default {
  data() {
    return {
      list: [],
      centerDialogVisible: false,
      formGuige: '',
      title: '',
      disabled: true,
      ggNmaeList: [],
      options5: [],
      value1: '',
      state1: [],
      formGuigeId: null
    }
  },
  props: {
    i: Number,
    productType: {
      type: String,
      required: true,
      default: ''
    }
  },
  watch: {
    productType: {
      immediate: true,
      handler(newVal, oldVal) {
        this.state1 = newVal === '1' ? '' : []
      },
      deep: true
    }
  },
  mounted() {
    this.getSkuAttrOption()
  },
  methods: {
    getSkuAttrOption() {
      return getSkuAttrOption().then(res => {
        if (res.code === 200) {
          this.ggNmaeList = res.data
          if (this.value1 !== '') {
            this.itemsListFn()
          }
        } else {
          console.log(res)
        }
      }).catch(err => console.log(err))
    },
    itemsListFn() {
      this.list = this.ggNmaeList.filter(res => res.id === +this.value1)[0]
      var list = []
      list[this.i] = this.list
      if (sessionStorage.getItem('list') === null) {
        sessionStorage.setItem('list', JSON.stringify(list))
      } else {
        var a = JSON.parse(sessionStorage.getItem('list'))
        if (this.title !== '添加规格值' && this.title !== '添加规格名') {
          for (let i = 0; i < a.length; i++) {
            const res = a[i]
            if (res !== null && res.id === +this.value1) {
              this.$alert('规格名不能选择相同的', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$message({
                    type: 'error',
                    message: '规格名选择相同了，请重新选择'
                  })
                  this.value1 = null
                  list[this.i] = null
                }
              })
              return
            }
          }
        }
        a[this.i] = this.list
        sessionStorage.setItem('list', JSON.stringify(a))
      }
      this.options5 = this.list['children']
    },
    handerClose() {
      this.centerDialogVisible = false
      this.formGuige = ''
    },
    Guige(e) {
      this.title = e.target.innerText
      this.title === '添加规格名' ? this.addGuiGeName() : this.addGuiGeZi()
    },
    addGuiGeName() {
      this.centerDialogVisible = true
      this.formGuigeId = 0
    },
    addGuiGeZi() {
      if (this.value1 === '') {
        this.$message.error('请选择规格名！')
        return
      }
      this.centerDialogVisible = true
      this.formGuigeId = +this.value1
    },
    del() {
      this.$emit('del', this.i)
    },
    async subGuige() {
      const list = {
        attrName: this.formGuige,
        parentId: this.formGuigeId,
        sortOrder: 0
      }
      await productSkuAttrCreate(list).then(res => {
        if (res.code === 200) {
          this.centerDialogVisible = false
        } else {
          console.log(res)
        }
      }).catch(err => console.log(err))
      await this.getSkuAttrOption()
    },
    sub() {
      if (this.state1.length > 5) {
        this.state1.length = 5
      }
      let stat
      if (this.productType !== '1') {
        stat = this.options5.filter(res => res.id === this.state1.filter(v => v === res.id)[0]).map(res => {
          const a = {}
          const name = `a${this.i}`
          const id = `a${this.i}Id`
          a[name] = res.attrName
          a[id] = res.id
          return a
        })
      } else {
        stat = this.options5.filter(res => res.id === this.state1).map(res => {
          const a = {}
          const name = `a${this.i}`
          const id = `a${this.i}Id`
          a[name] = res.attrName
          a[id] = res.id
          return a
        })
      }
      const list = {
        hander: { label: `${this.list['attrName']}` },
        stat
      }
      this.$emit('sub', list, this.i)
    }
  }
}
</script>

<style scoped>
.el-select--medium {
  width: 400px;
}
.el-input--medium {
  width: 200px;
}
.title {
  background-color: #f8f8f8;
  font-size: 14px;
  font-weight: 700;
  padding: 10px;
  margin-bottom: 20px;
}
.mb0 {
  margin-bottom: 0;
}
.bgf {
  background: #fff;
}
</style>
