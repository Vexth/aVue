<template>
  <div class="app-container">
		<el-form ref="form" :model="form" label-width="150px">
			<div class="title">基本信息</div>
			<el-form-item label="商品名称：">
				<el-input v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="分享描述：">
				<el-input v-model="form.brief"></el-input>
			</el-form-item>
      <el-form-item label="商品类目：">
        <el-select v-model="value" placeholder="请选择" @change="optionChange(value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>

			<div class="title">价格库存</div>
			<el-form-item label="商品规格：">
        <template>
          <div class="guige">
            <div v-if="isSp" v-for="(item, i) in form.items" :key="i">
              <div class="title mb0">
                <span>规格名：</span>
                <el-select v-model="form.items[i].value1" placeholder="请选择" @change="itemsListFn(form.items[i].value1, i)">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item" :disabled="item.disabled">
                  </el-option>
                </el-select>
                <!-- <el-button type="danger" icon="el-icon-delete" @click="del(i)"></el-button> -->
              </div>
              
              <div class="title mb0 bgf">
                <span>规格值：</span>
                <el-select
                  v-model="form.items[i].state1"
                  multiple
                  placeholder="请选择" @change="itemChange(form.items[i].state1, form.items[i].value1, i)">
                  <el-option
                    v-for="item in form.items[i].options5"
                    :key="item.id"
                    :label="item.attrContent"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="title mb0">
              <el-button :disabled="isdisabled" @click="addItem">添加规格项目</el-button>
              <el-button type="primary" @click="addTale">生成规格明细</el-button>
            </div>
          </div>
        </template>
			</el-form-item>
      <el-form-item v-if="isXS" label="规格明细：">
        <template>
          <div class="guigeul">
            <ul>
              <li style="display: flex; border-bottom: 1px solid #dcdfe6;">
                <div v-for="(row, i) in rows" :key="i">{{row.label}}</div>
              <li>
              <li v-for="(items, index) in dataList" :key="index" style="display: table; border-bottom: 1px solid #dcdfe6; width: 100%;">
                <div style="border-right: 1px solid #dcdfe6;" v-if="items.attrContent === '' ? false : true" :style="{float: 'left', height: items.list.length * 56 + 'px', lineHeight: items.list.length * 56 + 'px', padding: 0}">{{items.attrContent}}</div>
                <ul style="float: left;">
                  <li v-for="(item, i) in items.list" :key="i" style="display: flex;">
                    <div v-if="item.attrContent === '' ? false : true">{{item.attrContent}}</div>
                    <div>
                      <!-- <el-input
                        placeholder="请输入价格"
                        v-model="items.list[i].unitPrice"
                        clearable>
                      </el-input> -->
                      <input type="text" v-model="dataList[index]['list'][i].unitPrice" @blur="OnInput({unitPrice:`${items.list[i].unitPrice}`, attrOption: `${dataList[index].id}|${items.list[i].id}`})" />
                      <span>{{dataList[index]['list'][i].unitPrice}}</span>
                    </div>
                    <div>
                      <!-- <el-input
                        placeholder="请输入库存"
                        v-model="items.list[i].stockAmount"
                        clearable>
                      </el-input> -->
                      <input type="text" v-model="dataList[index]['list'][i].stockAmount" @blur="OnInput({stockAmount:`${items.list[i].stockAmount}`, attrOption: `${dataList[index].id}|${items.list[i].id}`})" />
                      <span>{{dataList[index]['list'][i].stockAmount}}</span>
                    </div>
                    <div>
                      <!-- <el-input
                        placeholder="请输入规格编码"
                        v-model="items.list[i].input3"
                        clearable>
                      </el-input> -->
                      <input type="text" v-model="dataList[index]['list'][i].input3" @blur="OnInput({input3:`${items.list[i].input3}`, attrOption: `${dataList[index].id}|${items.list[i].id}`})" />
                      <span>{{dataList[index]['list'][i].input3}}</span>
                    </div>
                    <div>
                      <!-- <el-input
                        placeholder="请输入成本价"
                        v-model="items.list[i].costPrice"
                        clearable>
                      </el-input> -->
                      <input type="text" v-model="dataList[index]['list'][i].costPrice" @blur="OnInput({costPrice:`${items.list[i].costPrice}`, attrOption: `${dataList[index].id}|${items.list[i].id}`})" />
                      <span>{{dataList[index]['list'][i].costPrice}}</span>
                    </div>
                    <div>{{item.saleAmount ? item.saleAmount : 0}}</div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </template>
			</el-form-item>
      <!-- <el-form-item label="价格：">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
      <el-form-item label="划线价：">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
      <el-form-item label="库存：">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
      <el-form-item label="商品编码：">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
      <el-form-item label="成本价：">
				<el-input v-model="form.name"></el-input>
			</el-form-item> -->
			<el-form-item>
				<el-button type="primary" @click="onSubmit">立即创建</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [],
      isXS: false,
      isdisabled: false,
      options1: [],
      rows: [],
      form: {
        title: '',
        name: '',
        brief: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        items: []
      },
      isSp: false,
      options: [],
      value: '',
      driver: null,
      itemsList: {},
      productCategoryId: null,
      iscfxz: '',
      formList: {},
      skuList: []
    }
  },
  watch: {
    form(val) {
      console.log(val)
    }
  },
  mounted() {
    this.axios.get('shop/ProductCategoryOption?vendorId=1').then(res => {
      if (res.status === 200) {
        this.options = res.data.data
      } else {
        console.error(res)
      }
    }).catch(err => console.log(err))
    // this.axios.get('api/ting?method=baidu.ting.billboard.billList&type=1&size=10&offset=0').then(res => console.log(res))
  },
  methods: {
    dataToFunc(data1, data2) {
      const data = []
      for (let i = 0; i < data1.length; i++) {
        for (let j = 0; j < data2.length; j++) {
          if (data1[i].id === data2[j]) {
            data1[i].unitPrice = ''
            data1[i].stockAmount = ''
            data1[i].input3 = ''
            data1[i].costPrice = ''
            data.push(data1[i])
          }
        }
      }
      return data
    },
    addTale() {
      let key1 = []
      let key2 = []
      const rows = [
        {
          prop: 'date',
          label: '价格（元）'
        },
        {
          prop: 'name',
          label: '库存'
        },
        {
          prop: 'address',
          label: '规格编码'
        },
        {
          prop: 'address1',
          label: '成本价'
        },
        {
          prop: 'address2',
          label: '销量'
        }
      ]
      for (const key in this.formList) {
        if (key === 'COLOR') {
          rows.splice(0, 0, {
            prop: 'COLOR',
            label: '颜色'
          })
          key1 = this.dataToFunc(this.itemsList[key], this.formList[key].list)
        } else if (key === 'SIZE') {
          rows.splice(1, 0, {
            prop: 'SIZE',
            label: '尺码'
          })
          key2 = this.dataToFunc(this.itemsList[key], this.formList[key].list)
        }
      }
      key1.map(res => {
        if (key2.length === 0) {
          key2 = [{ attrContent: '', id: '' }]
        }
        res['list'] = key2
      })
      this.isXS = true
      this.rows = rows
      this.dataList = key1
      console.log(this.dataList)
    },
    optionChange(e) {
      this.productCategoryId = e.id
      this.axios.get(`shop/getProductAttrOption?productCategoryId=${e.id}`).then(res => {
        if (res.status === 200) {
          const obj = res.data.data
          for (const ite in obj) {
            if (ite === 'COLOR') {
              this.options1 = [...this.options1, { value: 'COLOR', label: '颜色' }]
            } else if (ite === 'SIZE') {
              this.options1 = [...this.options1, { value: 'SIZE', label: '尺码' }]
            }
          }
          this.itemsList = obj
        } else {
          console.error(res)
        }
      }).catch(err => console.log(err))
    },
    itemsListFn(e, i) {
      if (this.iscfxz === e.value) {
        this.$alert('规格名不能选择相同的', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'error',
              message: '规格名选择相同了，请重新选择'
            })
          }
        })
        return
      }
      this.formList[e.value] = e
      this.iscfxz = e.value
      this.form.items[i].options5 = this.itemsList[e.value]
    },
    del(e) {
      this.isdisabled = false
      this.form.items.splice(e, 1)
      this.isXS = false
    },
    itemChange(e, v, i) {
      if (e.length > 5) {
        e.splice(5, 1)
        return
      }
      this.formList[v.value].list = e
      let attrType = ''
      const arr = e.filter(res => Object.prototype.toString.call(res) === '[object String]')
      if (arr.length < 1) {
        return
      }
      if (v.value === 'COLOR') {
        attrType = 'COLOR'
      } else if (v.value === 'SIZE') {
        attrType = 'SIZE'
      }
      const data = {
        attrContent: arr[0],
        attrType: attrType,
        productCategoryId: this.productCategoryId,
        sortOrder: 0
      }
      this.axios.post('shop/setProductAttrOption', data).then(res => {
        console.log(res.data.data[v.value])
        this.form.items[i].options5 = res.data.data[v.value]
      }).catch(err => console.log(err))
      console.log(e, v, i)
      /*
      this.isXS = true
      if (e.length > 5) {
        e.splice(5, 1)
        return
      }
      const arr = []
      for (let i = 0, len = this.rows.length; i < len; i++) {
        if (this.rows[i]['label'] === v['label']) {
          e.map(res => {
            arr.push({
              title: res,
              list: [
                { mane: '', price: '价格2', stock: '库存2', coding: '编码2', costprice: '成本价2', volume: '销量2', title: 1 }
              ]
            })
          })
          this.dataList = arr
          return
        }
      }
      this.rows = [{
        prop: 'date',
        label: v['label'],
        width: ''
      }, ...this.rows]
      this.dataList.push({
        title: e[0],
        list: [
          { mane: '', price: '价格2', stock: '库存2', coding: '编码2', costprice: '成本价2', volume: '销量2', title: 1 }
        ]
      })
      {"product":
        {"isOnSale":0,"priceUnderline":1.0,"productCategoryId":1,"sortOrder":0,"title":"标题","vendorUserId":1},
        "skuList":[
          {"attrOption":"1|3","costPrice":1.23,"saleAmount":0,"stockAmount":0,"unitPrice":1.23},
          {"attrOption":"2|3","costPrice":1.23,"saleAmount":0,"stockAmount":0,"unitPrice":1.23}]
      }
      */
    },
    dataToList(data) {
      const skuList = []
      data.map(res => res['list'].map(v => {
        const obj = {}
        obj['attrOption'] = `${res.id}|${v.id}`
        obj['costPrice'] = v.costPrice
        obj['saleAmount'] = 0
        obj['stockAmount'] = v.stockAmount
        obj['unitPrice'] = v.unitPrice
        skuList.push(obj)
      }))
      console.log(skuList)
    },
    OnInput(e) {
      this.skuList.push(e)
    },
    onSubmit() {
      let skuList = this.skuList
      skuList = skuList.map((item, index, arr) => {
        const i = arr.find(_item => item['attrOption'] === _item['attrOption'])
        if (i !== item) {
          i.a = { ...i.a, ...item }
          return undefined
        } else {
          console.log(i.a)
          i.a = i.a
          return i
        }
      }).filter(item => item !== undefined).map(res => {
        res = { ...res, ...res.a }
        delete res.a
        return res
      })
      const list = {
        product: { productCategoryId: this.productCategoryId, title: this.form.title, brief: this.form.brief, vendorUserId: 1 },
        skuList: skuList
      }
      this.axios.post('shop/createProduct', list).catch(err => console.log(err)).then(res => console.log(res))
      console.log(list)
    },
    addItem() {
      this.isSp = true
      this.form.items.push({ value1: '', state1: '' })
      if (this.form.items.length >= 2) {
        this.isdisabled = true
      }
    }
  }
}
</script>
<style scoped>
.guigeul ul, .guigeul li{
  margin: 0;
  padding: 0;
  list-style-type: none;
}
/* @import url('./base.css');
@import url('./good.css'); */
.title {
  background-color: #f8f8f8;
  font-size: 14px;
  font-weight: 700;
  padding: 10px;
  margin-bottom: 20px;
}
.el-input {
  width: 200px;
}
.guige {
  border: 1px solid #dcdfe6;
  background-color: #fff;
  padding: 10px;
}
.guige .el-select--medium{
  width: 400px;
}
.mb0 {
  margin-bottom: 0;
}
.bgf {
  background: #fff;
}
.has-border {
  border-top: 1px solid #ccc;
}

.guigeul {
  border: 1px solid #dcdfe6;
  background-color: #fff;
  padding: 10px;
  display: inline-block;
  width: 100%;
}
.guigeul div {
  /* padding: 10px; */
  width: 200px;
  text-align: center;
  line-height: 56px;
}

.guigeul div.el-input--medium {
  width: 180px;
}
</style>
