<template>
  <div class="app-container">
		<el-form ref="form" :model="form" label-width="150px">
			<div class="title">基本信息</div>
			<el-form-item label="商品名称：">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="分享描述：">
				<el-input v-model="form.name"></el-input>
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
                <el-button type="danger" icon="el-icon-delete" @click="del(i)"></el-button>
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
            <div class="title mb0"><el-button :disabled="isdisabled" @click="addItem">添加规格项目</el-button></div>
          </div>
        </template>
			</el-form-item>
      <el-form-item v-if="isXS" label="规格明细：">
        <template>
          <div class="guigeul">
            <ul>
              <li style="display: flex;">
                <div v-for="(row, i) in rows" :key="i">{{row.label}}</div>
              <li>
              <li v-for="(items, index) in dataList" :key="index" style="display: table;">
                <div v-if="items.title === '' ? false : true" :style="{float: 'left', height: items.list.length * 56 + 'px', lineHeight: items.list.length * 56 + 'px', padding: 0}">{{items.title}}</div>
                <ul style="float: left;">
                  <li v-for="(item, i) in items.list" :key="i" style="display: flex;">
                    <div v-if="item.mane === '' ? false : true">{{item.mane}}</div>
                    <div>{{item.price}}</div>
                    <div>{{item.stock}}</div>
                    <div>{{item.coding}}</div>
                    <div>{{item.costprice}}</div>
                    <div>{{item.volume}}</div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </template>
			</el-form-item>
      <el-form-item label="价格：">
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
			</el-form-item>
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
      rows: [
        {
          prop: 'date',
          label: '价格（元）',
          width: 180
        },
        {
          prop: 'name',
          label: '库存',
          width: 180
        },
        {
          prop: 'address',
          label: '规格编码',
          width: 180
        },
        {
          prop: 'address1',
          label: '成本价',
          width: 180
        },
        {
          prop: 'address2',
          label: '销量',
          width: 180
        }
      ],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        restaurants: [],
        items: []
      },
      isSp: false,
      options: [],
      value: '',
      driver: null,
      itemsList: {},
      productCategoryId: null
    }
  },
  watch: {
    form(val) {
      console.log(val)
    }
  },
  mounted() {
    this.restaurants = this.loadAll()
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
      console.log(e)
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
      */
    },
    onSubmit() {
      console.log(this.form)
    },
    addItem() {
      this.isSp = true
      this.form.items.push({ value1: '', state1: '' })
      if (this.form.items.length >= 2) {
        this.isdisabled = true
      }
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll() {
      return [
        {
          'value': '(小杨生煎)西郊百联餐厅',
          'address': '长宁区仙霞西路88号百联2楼'
        },
        {
          'value': '阳阳麻辣烫',
          'address': '天山西路389号'
        },
        {
          'value': '南拳妈妈龙虾盖浇饭',
          'address': '普陀区金沙江路1699号鑫乐惠美食广场A13'
        }
      ]
    },
    handleSelect(item) {
      console.log(item)
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
  padding: 10px;
  width: 100px;
  text-align: center;
}
</style>
