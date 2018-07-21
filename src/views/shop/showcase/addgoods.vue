<template>
  <div class="app-container">
		<el-form ref="form" :model="form" label-width="150px">
      <div class="title">商品类型</div>
			<el-form-item label="" style="margin-left: -150px;">
				<el-radio v-model="radio7" label="1" border>物流发货</el-radio>
        <el-radio v-model="radio7" label="2" border>无需物流</el-radio>
        <el-radio v-model="radio7" label="3" border>同城送或自提</el-radio>
			</el-form-item>
			<div class="title">基本信息</div>
			<el-form-item label="商品名称：" required>
				<el-input v-model="form.title" style="width: 300px;" placeholder="商品名称必须填，最多100个字"></el-input>
        <el-tooltip placement="right">
          <div slot="content">111111111111111111111</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
			</el-form-item>
			<el-form-item label="分享描述：">
				<el-input v-model="form.sharetitle"></el-input>
        <el-tooltip placement="right">
          <div slot="content">111111111111111111111</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
			</el-form-item>
      <el-form-item label="描述图片上传：" required>
        <v-img-list :list="'imgDescList'" :tpList="imgDescList" @uploadList="uploadList" />
        <el-tooltip placement="right">
          <div slot="content">111111111111111111111</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
			</el-form-item>
      <el-form-item label="商品类目：" required>
        <el-select v-model="categoryId" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-tooltip placement="right">
          <div slot="content">111111111111111111111</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="商品一级分组：">
        <el-select v-model="groupId" placeholder="请选择">
          <el-option
            v-for="item in optionsFZ"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-tooltip placement="right">
          <div slot="content">111111111111111111111</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="商品二级分组：">
        <el-select v-model="groupId" placeholder="请选择">
          <el-option
            v-for="item in optionsFZ"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-tooltip placement="right">
          <div slot="content">111111111111111111111</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="主图上传：" required>
        <v-img-list :list="'imgPrimaryList'" :tpList="imgPrimaryList" @uploadList="uploadList" />
        <el-tooltip placement="right">
          <div slot="content">111111111111111111111</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
			</el-form-item>
      <el-form-item label="规格参数图片上传：" required>
				<v-img-list :list="'imgSpecList'" :tpList="imgSpecList" @uploadList="uploadList" />
        <el-tooltip placement="right">
          <div slot="content">111111111111111111111</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
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
                    :label="item.attrName"
                    :value="item.id" :disabled="item.disabled">
                  </el-option>
                </el-select>
                <el-button @click="addGuigeMing(options1, i, '规格名')">添加规格名</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="del(i)"></el-button>
              </div>

              <div class="title mb0 bgf">
                <span>规格值：</span>
                <el-select
                  v-model="form.items[i].state1"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请选择" @change="itemChange(form.items[i].state1, form.items[i], i)">
                  <el-option
                    v-for="item in form.items[i].options5"
                    :key="item.id"
                    :label="item.attrName"
                    :value="item.id">
                  </el-option>
                </el-select>
                <el-button @click="addGuige(form.items[i], i, '规格值')">添加规格值</el-button>
              </div>
            </div>
            <div class="title mb0">
              <el-button :disabled="isdisabled" @click="addItem">添加规格项目</el-button>
              <el-button type="primary" @click="addTale" :disabled="disabled">生成规格明细</el-button>
            </div>
          </div>
        </template>
			</el-form-item>
      <el-form-item v-if="isXS" label="规格明细：" required>
        <template>
          <div class="guigeul">
            <ul>
              <li style="display: flex; border-bottom: 1px solid #dcdfe6;">
                <div v-for="(row, i) in rows" :key="i">{{row.label}}</div>
              <li>
              <li v-for="(items, index) in dataList" :key="index" style="display: flex; border-bottom: 1px solid #dcdfe6; width: 100%;">
                <div v-for="(item, i) in items" :key="i">{{item.attrName}}</div>
                <div>
                  <input type="text" v-model="items[0].unitPrice" @blur="OnInput(items)" onKeyPress="if((event.keyCode<48 || event.keyCode>57) && event.keyCode!=46 || /\.\d\d$/.test(value))event.returnValue=false" />
                </div>
                <div>
                  <input v-model="items[0].stockAmount" type="text" @blur="OnInput(items)" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" />
                </div>
                <div>
                  <input type="text" v-model="items[0].stockBarcode" @blur="OnInput(items)" />
                </div>
                <div>
                  <input type="text" v-model="items[0].costPrice" @blur="OnInput(items)" />
                </div>
                <div>0</div>
                <div>
                  <el-button :type="iconCheck.indexOf(index) > -1 ? 'success' : 'primary'" size="mini" @click="addTP('imageId', items, index)">{{iconCheck.indexOf(index) > -1 ? '成功' : '上传'}}<i class="el-icon--right" :class="iconCheck.indexOf(index) > -1 ? 'el-icon-circle-check-outline' : 'el-icon-upload'"></i></el-button>
                </div>
              </li>
            </ul>
          </div>
          <!-- <div class="guigeul">
            <ul>
              <li style="display: flex; border-bottom: 1px solid #dcdfe6;">
                <div v-for="(row, i) in rows" :key="i">{{row.label}}</div>
              <li>
              <li v-for="(items, index) in dataList" :key="index" style="display: table; border-bottom: 1px solid #dcdfe6; width: 100%;">
                <div style="border-right: 1px solid #dcdfe6;" v-if="items.attrName === undefined ? false : true" :style="{float: 'left', height: items.list.length * 56 + 'px', lineHeight: items.list.length * 56 + 'px', padding: 0}">{{items.attrName}}</div>
                <ul style="float: left;">
                  <li v-for="(item, i) in items.list" :key="i" style="display: flex;">
                    <div v-if="item.attrName === '' ? false : true">{{item.attrName}}</div>
                    <div>
                      <input type="text" v-model="dataList[index]['list'][i].unitPrice" onKeyPress="if((event.keyCode<48 || event.keyCode>57) && event.keyCode!=46 || /\.\d\d$/.test(value))event.returnValue=false" @blur="OnInput({unitPrice:`${items.list[i].unitPrice}`, attrOption: `${dataList[index].id}|${items.list[i].id}`})" />
                    </div>
                    <div>
                      <input v-model="dataList[index]['list'][i].stockAmount" type="text" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" @blur="OnInput({stockAmount:`${items.list[i].stockAmount}`, attrOption: `${dataList[index].id}|${items.list[i].id}`})" />
                    </div>
                    <div>
                      <input type="text" v-model="dataList[index]['list'][i].stockBarcode" @blur="OnInput({stockBarcode:`${items.list[i].stockBarcode}`, attrOption: `${dataList[index].id}|${items.list[i].id}`})" />
                    </div>
                    <div>
                      <input type="text" v-model="dataList[index]['list'][i].costPrice" @blur="OnInput({costPrice:`${items.list[i].costPrice}`, attrOption: `${dataList[index].id}|${items.list[i].id}`})" />
                    </div>
                    <div>{{item.saleAmount ? item.saleAmount : 0}}</div>
                    <div>
                      <el-button type="primary" size="mini" @click="addTP('imageId', {imageId: '', attrOption: `${dataList[index].id}|${items.list[i].id}`})">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div> -->
        </template>
			</el-form-item>
      <!-- <el-form-item label="价格：">
				<el-input v-model="form['价格']" :disabled="isXS"></el-input>
			</el-form-item> -->
      <el-form-item label="市场价：">
				<el-input v-model="form.priceUnderline"></el-input>
        <el-tooltip placement="right">
          <div slot="content">111111111111111111111</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
			</el-form-item>
      <!-- <el-form-item label="库存：">
				<el-input v-model="form['库存']" :disabled="isXS"></el-input>
			</el-form-item>
      <el-form-item label="商品编码：">
				<el-input v-model="form['商品编码']"></el-input>
			</el-form-item>
      <el-form-item label="成本价：">
				<el-input v-model="form['成本价']" :disabled="true"></el-input>
			</el-form-item> -->
      <div class="title">其他信息</div>
      <el-form-item label="是否上架：" required>
				<el-checkbox v-model="saleStatus">是否立即上架</el-checkbox>
        <el-tooltip placement="right">
          <div slot="content">111111111111111111111</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
			</el-form-item>
      <!-- <el-form-item label="留言：">
				<el-input v-model="form['留言']"></el-input>
			</el-form-item>
      <el-form-item label="快递运费：">
				<el-input v-model="form['快递运费']"></el-input>
			</el-form-item>
      <el-form-item label="上架时间：">
				<el-input v-model="form['上架时间']"></el-input>
			</el-form-item>
      <el-form-item label="限购：">
				<el-checkbox v-model="checked1">限制每人可购买数量</el-checkbox>
        <div v-if="checked1">每个买家帐号累计限购<el-input v-model="form['限购数']"></el-input>件</div>
				<div><el-checkbox v-model="checked2">只允许特定用户购买</el-checkbox></div>
        <div v-if="checked2">
          <div>请选择拥有哪些会员卡的用户可以购买该商品</div>
          <div>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
			</el-form-item> -->
			<el-form-item>
				<el-button type="primary" @click="onSubmit">立即创建</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>

    <el-dialog
      :title="title"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <div style="text-align: center;">
        <span>{{titleName}}：</span>
        <el-input v-model="formGuige"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false, formGuige = ''">取 消</el-button>
        <el-button type="primary" @click="subGuige">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="我的图片"
      :visible.sync="tpDialogVisible"
      width="50%"
      center>
      <DialogImg ref="DialogImg" :selected="selected" :selectedImgList="selectedImgList"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tpDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="tpSub">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Dropzone from '@/components/Dropzone/index.vue'
import DialogImg from './dialogImg.vue'
import vImgList from './imgList.vue'
export default {
  data() {
    return {
      itemId: '',
      iconCheck: [],
      disabled: true,
      title: '',
      titleName: '',
      centerDialogVisible: false,
      tpDialogVisible: false,
      formGuige: '',
      formGuigeId: null,
      formI: null,
      radio7: '2',
      action: 'api/v1/shop/uploadfile',
      dialogImageUrl: '',
      dialogVisible: false,
      dataList: [],
      isXS: false,
      isdisabled: false,
      options1: [],
      rows: [],
      form: {
        // '商品名称': '',
        // '分享描述': '',
        '规格明细': [],
        '价格': '',
        // '划线价': '',
        '库存': '',
        '商品编码': '',
        '成本价': '',
        '留言': '',
        '快递运费': '',
        '上架时间': '',
        '限购数': '',
        title: '',
        sharetitle: '',
        priceUnderline: '',
        // name: '',
        // brief: '',
        // region: '',
        // date1: '',
        // date2: '',
        // delivery: false,
        // type: [],
        // resource: '',
        // desc: '',
        items: []
      },
      imgPrimaryList: [],
      imgDescList: [],
      imgSpecList: [],
      imgList: [],
      imageId: {},
      imageIdstr: '',
      selected: [],
      selectedImg: '',
      selectedImgList: [],
      saleStatus: false,
      isSp: false,
      options: [],
      value: '',
      optionsFZ: [],
      valueFZ: '',
      driver: null,
      itemsList: {},
      categoryId: null,
      groupId: null,
      iscfxz: [],
      formList: {},
      skuList: [],
      checked1: false,
      checked2: false
    }
  },
  components: {
    Dropzone, DialogImg, vImgList
  },
  mounted() {
    // GET /api/v1/shop/product/getCategoryOption
    this.axios.get('/api/v1/shop/product/group/tree').then(res => {
      if (res.status === 200) {
        this.options = res.data.data
      } else {
        console.error(res)
      }
    }).catch(err => console.log(err))
    // // GET /api/v1/shop/product/getGroupOption
    this.axios.get('/api/v1/shop/product/group/tree').then(res => {
      if (res.status === 200) {
        this.optionsFZ = res.data.data
      } else {
        console.error(res)
      }
    }).catch(err => console.log(err))
    // this.axios.get('api/ting?method=baidu.ting.billboard.billList&type=1&size=10&offset=0').then(res => console.log(res))
    this.getSkuAttrOption()
  },
  methods: {
    tpSub() {
      this.selectedImgList = this.$refs.DialogImg.tpSub()
      if (this.imageIdstr === 'imageId') {
        if (this.selectedImgList.length > 1) {
          this.$message.error('请选择一张图片！')
          return
        }
        this.tpDialogVisible = false
        this.imageId.imageId = this.selectedImgList[0]['id']
        this.skuList.push(this.imageId)
        this.iconCheck.push(this.itemId)
        return
      }
      this.tpDialogVisible = false
      this[this.selectedImg] = [...this[this.selectedImg], ...this.selectedImgList]
    },
    uploadList(val) {
      this.selected = []
      this.selectedImgList = []
      this.selectedImg = val
      this.tpDialogVisible = true
    },
    addTale() {
      var list = []
      const rows = [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        {
          prop: 'unitPrice',
          label: '价格（元）'
        },
        {
          prop: 'stockAmount',
          label: '库存'
        },
        {
          prop: 'stockBarcode',
          label: '规格编码'
        },
        {
          prop: 'costPrice',
          label: '成本价'
        },
        {
          prop: 'saleAmount',
          label: '销量'
        },
        {
          prop: 'cz',
          label: '操作'
        }
      ]
      for (let i = 0; i < this.form.items.length; i++) {
        const element = this.form.items[i]
        if (element.value1 === '') {
          this.$message.error('请选择规格名！')
          return
        }
        if (element.state1.length === 0) {
          this.$message.error('请选择规格值！')
          return
        }
        rows[i] = {
          prop: 'attrName',
          label: element['guige']['attrName']
        }
        list[i] = element['guige']
      }
      this.isXS = true
      this.rows = rows.filter(res => res !== undefined)
      // console.log(list)
      var results = []
      var result = []
      function doExchange(arr, depth) {
        for (var i = 0; i < arr[depth].length; i++) {
          result[depth] = { ...arr[depth][i], unitPrice: '', stockAmount: '', stockBarcode: '', costPrice: '', imageId: '' }
          if (depth !== arr.length - 1) {
            doExchange(arr, depth + 1)
          } else {
            results.push(JSON.stringify(result))
          }
        }
      }
      function test(arr) {
        doExchange(arr, 0)
      }
      var garr = list.map(res => res['children'])
      test(garr)
      // console.log(results.length, results)
      this.skuList = []
      this.dataList = results.map(res => JSON.parse(res))
      // list[0]['children'].map(res => {
      //   res.list = []
      //   res.unitPrice = ''
      //   res.stockAmount = ''
      //   res.stockBarcode = ''
      //   res.costPrice = ''
      // })
      // const data = [{
      //   list: list[0]['children']
      // }]
      // if (list.length > 1) {
      //   list[1]['children'].map(res => {
      //     res['list'] = list[0]['children']
      //   })
      // }
      // this.dataList = list.length > 1 ? list[1]['children'] : data
    },
    addTP(title, val, index) {
      this.itemId = index
      this.selected = []
      this.selectedImgList = []
      this.tpDialogVisible = true
      this.imageIdstr = title
      const list = this.OnInput(val)
      this.imageId = list
    },
    getSkuAttrOption() {
      // GET /api/v1/shop/product/getSkuAttrOption
      this.axios.get(`/api/v1/shop/product/group/tree`).then(res => {
        if (res.status === 200) {
          this.options1 = res.data.data
        } else {
          console.error(res)
        }
      }).catch(err => console.log(err))
    },
    itemsListFn(e, i) {
      this.form.items[i].state1 = []
      if (this.iscfxz.indexOf(e) > -1) {
        this.$alert('规格名不能选择相同的', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'error',
              message: '规格名选择相同了，请重新选择'
            })
            this.form.items[i].value1 = ''
            this.iscfxz[i] = ''
          }
        })
        return
      }
      this.iscfxz[i] = e
      this.axios.get(`/api/v1/shop/product/group/tree`).then(res => {
        console.log(this.form.items[i])
        if (res.status === 200) {
          this.options1 = res.data.data
          const a = this.options1.filter(res => res.id === e)[0]
          this.form.items[i].optionsList = a
          this.form.items[i].options5 = a['children']
        } else {
          console.error(res)
        }
      }).catch(err => console.log(err))
    },
    del(e) {
      this.isdisabled = false
      this.form.items.splice(e, 1)
      this.isXS = false
      if (this.form.items.length === 0) {
        this.disabled = true
      }
    },
    itemChange(e, v, i) {
      if (e.length > 5) {
        e.splice(5, 1)
        return
      }
      const a = this.form.items[i].options5
      const b = []
      for (let i = 0; i < e.length; i++) {
        const l = a.filter(res => res.id === e[i])
        b.push(l[0])
      }
      this.form.items[i]['guige'] = this.form.items[i].optionsList
      this.form.items[i]['guige'].children = b
    },
    OnInput(e) {
      const list = {}
      const attrOption = []
      e.map(res => {
        attrOption.push(res.id)
      })
      list['attrOption'] = attrOption.join('|')
      list['costPrice'] = e[0]['costPrice']
      list['stockAmount'] = e[0]['stockAmount']
      list['stockBarcode'] = e[0]['stockBarcode']
      list['unitPrice'] = e[0]['unitPrice']
      list['imageId'] = e[0]['imageId']
      this.skuList.push(list)
      return list
    },
    ArrayCon(arr, fn) {
      return arr.map((item, index, arr) => {
        const i = arr.find(_item => item[fn] === _item[fn])
        if (i !== item) {
          i.a = { ...i.a, ...item }
          return undefined
        } else {
          i.a = i.a
          return i
        }
      }).filter(item => item !== undefined).map(res => {
        res = { ...res, ...res.a }
        delete res.a
        return res
      })
    },
    onSubmit() {
      if (this.form.title === '') {
        this.$message.error('请填写商品名称！')
        return
      }
      if (this.categoryId === null) {
        this.$message.error('请选择商品类目！')
        return
      }
      if (this.imgPrimaryList.length === 0) {
        this.$message.error('请上传主图！')
        return
      }
      if (this.imgDescList.length === 0) {
        this.$message.error('请上传描述图片！')
        return
      }
      if (this.imgSpecList.length === 0) {
        this.$message.error('请上传规格参数图片！')
        return
      }
      if (this.skuList.length === 0) {
        this.$message.error('请填写规格明细！')
        return
      }
      const product = {}
      product['imgPrimaryList'] = this.imgPrimaryList
      product['imgDescList'] = this.imgDescList
      product['imgSpecList'] = this.imgSpecList
      product['saleStatus'] = this.saleStatus ? 0 : 1
      product['categoryId'] = this.categoryId
      product['groupId'] = this.groupId
      product['title'] = this.form.title
      product['sharetitle'] = this.form.sharetitle
      product['priceUnderline'] = this.form.priceUnderline

      let skuList = this.skuList
      skuList = this.ArrayCon(skuList, 'attrOption')
      // .map(res => {
      //   const attrOption = res.attrOption
      //   let a = attrOption.split('|')
      //   const i = a.indexOf('undefined')
      //   if (i > -1) {
      //     a = a.splice(1, 1)
      //     res.attrOption = a[0]
      //   }
      //   return res
      // })
      // console.log(product, skuList)
      for (let i = 0; i < skuList.length; i++) {
        const element = skuList[i]
        if (element['unitPrice'] === undefined || element['unitPrice'] === '') {
          this.$message.error('请填写价格！')
          return
        }
        if (element['stockAmount'] === undefined || element['stockAmount'] === '') {
          this.$message.error('请填写库存！')
          return
        }
      }
      // /api/v1/shop/product/productCreate
      this.axios.post('api/v1/shop/product/productCreate', { product, skuList }).catch(err => console.log(err)).then(res => {
        if (res.data.code === 200) {
          this.$router.push('/showcase/goodslist')
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    addGuige(val, i, title) {
      if (val.optionsList === undefined) {
        this.$message.error('请选择规格名！')
        return
      }
      this.centerDialogVisible = true
      this.title = `添加${title}`
      this.titleName = title
      this.formGuigeId = val.optionsList.id
      this.formI = i
    },
    addGuigeMing(val, i, title) {
      this.centerDialogVisible = true
      this.title = `添加${title}`
      this.titleName = title
      this.formGuigeId = 0
    },
    subGuige() {
      const data = {
        attrName: this.formGuige,
        parentId: this.formGuigeId,
        sortOrder: 0
      }
      // /api/v1/shop/product/productSkuAttrCreate
      this.axios.post('api/v1/shop/product/productSkuAttrCreate', data).then(res => {
        if (res.data.code === 200) {
          this.centerDialogVisible = false
          this.axios.get(`/api/v1/shop/product/group/tree`).then(res => {
            if (res.status === 200) {
              this.formGuige = ''
              this.options1 = res.data.data
              if (this.titleName === '规格值') {
                const a = res.data.data.filter(res => res.attrName === this.form.items[this.formI].optionsList.attrName)[0]
                this.form.items[this.formI].options5 = a['children']
                this.form.items[this.formI].optionsList = a
              }
            } else {
              console.error(res)
            }
          }).catch(err => console.log(err))
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch(err => console.log(err))
    },
    focus(i) {
      if (this.formI === null) {
        return
      }
      this.form.items[i].options5 = this.form.items[this.formI].options5
      this.form.items[i].optionsList = this.form.items[this.formI].optionsList
    },
    addItem() {
      this.disabled = false
      this.isSp = true
      this.form.items.push({ value1: '', state1: '' })
      if (this.form.items.length >= 5) {
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
  width: 180px;
  text-align: center;
  line-height: 56px;
  display: inline-block;
}

.guigeul div.el-input--medium {
  width: 180px;
}
.el-icon-question {
  font-size: 14px;
  color: #ccc;
}

.guigeul input {
  width: 120px;
}
</style>
