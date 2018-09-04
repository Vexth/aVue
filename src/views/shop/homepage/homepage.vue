<template>
  <div class="app-container">
    <div class="hander">
      <span>我的店铺</span>
      <el-button style="float: right;margin-top: 9px;" type="primary" size="small" @click="primary">保存</el-button>
    </div>
    <div class="public left">
      <span>组件库</span>
      <v-homepage-left v-for="(item, i) in listData" :key="i" :pageleft="item" @ModuleSwitching="ModuleSwitching"></v-homepage-left>
    </div>
    <div class="con">
      <div class="m-phone">
        <div class="m-phone-con">
          <draggable v-model="items" :options="{group:'people'}" @start="drag=true" @end="drag=false" :move="getdata" @update="datadragEnd">
            <sortablecomponent v-for="(element, index) in items" :key="index" :item="element" @del_sub="del_sub" @selectedelEment="selectedelEment"></sortablecomponent>
          </draggable>
        </div>
      </div>
    </div>
    <div class="public rigth">
      <span style="text-align: left;padding-left: 12px;">{{rigth['title']}}</span>
      <component :is="isComponent" :componentId="componentId" ref="component" @uploadListBool="uploadListBool"></component>
    </div>

    <el-dialog
      class="dialog"
      :title="title"
      :visible.sync="tpDialogVisible"
      width="50%"
      :before-close="handleClose"
      center>
      <tree-grid v-if="isTreeGrid" ref="isTreeGrid" :columns="columns" :tree-structure="true" tree-type="" :data-source="dataSource"></tree-grid>
      <component :is="isImg" ref="Img"></component>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="sub">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import draggable from 'vuedraggable'
import sortablecomponent from '@/views/shop/homepage/Sortable/sortablecomponent.vue'

import vHomepageLeft from '@/views/shop/homepage/components/vHomepageLeft.vue'
import vHomepageBanner from '@/views/shop/homepage/components/vHomepageBanner.vue'
import vHomepageInputBox from '@/views/shop/homepage/components/vHomepageInputBox.vue'
import vHomepageVideo from '@/views/shop/homepage/components/vHomepageVideo.vue'
import vHomepageSearch from '@/views/shop/homepage/components/vHomepageSearch.vue'
import vHomepageTitle from '@/views/shop/homepage/components/vHomepageTitle.vue'
import vHomepageImg from '@/views/shop/homepage/components/vHomepageImg.vue'
import vHomepageCommodity from '@/views/shop/homepage/components/vHomepageCommodity.vue'
import vHomepageCategory from '@/views/shop/homepage/components/vHomepageCategory.vue'
import vHomepageMap from '@/views/shop/homepage/components/vHomepageMap.vue'
import vHomepageTab from '@/views/shop/homepage/components/vHomepageTab.vue'

import vImg from '@/views/shop/showcase/zujian/img.vue'
import CommodityAdComponent from '@/views/shop/homepage/components/component/CommodityAdComponent.vue'
import highlightCurrentRow from '@/views/shop/homepage/components/component/highlightCurrentRow.vue'

import TreeGrid from '@/views/shop/homepage/TreeGrid/TreeGrid.vue'

import { list } from './components/test.js'

import { uniqueObj } from '@/utils'

import { shopPagePageList, shopPagePageInfo, tree, shopPageUpdatepage } from '@/views/shop/server'


export default {
  components: {
    draggable,
    sortablecomponent,
    vHomepageLeft,
    TreeGrid,
    'CurrentRow': highlightCurrentRow,
    'vimg': vImg,
    'commodity': CommodityAdComponent,
    'banner': vHomepageBanner,
    'announcement': vHomepageInputBox,
    'ivideo': vHomepageVideo,
    'search': vHomepageSearch,
    'ititle': vHomepageTitle,
    'large-img': vHomepageImg,
    'in-img': vHomepageImg,
    'small-img': vHomepageImg,
    'large-commodity': vHomepageCommodity,
    'in-commodity': vHomepageCommodity,
    'small-commodity': vHomepageCommodity,
    'category': vHomepageCategory,
    'usermap': vHomepageMap,
    'imgtab': vHomepageTab
  },
  data() {
    return {
      columns: [
        {
          text: '名称',
          dataIndex: 'name'
        }
      ],
      dataSource: [],
      isTreeGrid: false,
      items: [],
      title: '',
      tpDialogVisible: false,
      rigth: {},
      isComponent: '',
      isComponentList: [],
      isImg: '',
      componentId: null,
      listData: list,
      pageId: null,
      index: 0,
      shopPagePageInfoList: [],
      delete_data: '',
    }
  },
  mounted() {
    this.shopPagePageList()
    this.tree()
  },
  beforeDestroy() {
    // alert('11111')
  },
  methods: {
    selectedelEment(item) {
      const l = JSON.parse(item)
      this.items = this.items.map(res => {
        const l = JSON.parse(res)
        l.selectedel = false
        if (res === item) {
          l.selectedel = true
        }
        return JSON.stringify(l)
      })
      
      this.isComponent = l.url
      this.componentId = {
        componentId: l.componentId,
        difference: l.difference
      }
    },
    del_sub(item) {
      const l = this.$store.getters.data_list
      delete l[item.difference]
      console.log(l)
      this.$store.commit('MODIFY_DATA_LIST', l)

      this.items = this.items.filter(res => {
        const s = JSON.parse(res)
        if (item.difference !== s.difference) {
          return JSON.stringify(s)
        }
      })
      this.isComponent = ''
    },
    getdata(item) {
      console.log(item)
    },
    datadragEnd(item) {
      console.log(this.items)
    },
    tree() {
      tree().then(res => res.code === 200 ? this.dataSource = res.data : console.log(res)).catch(err => console.log(err))
    },
    shopPagePageList() {
      shopPagePageList().then(res => {
        if (res.code === 200) {
          const data = res.data[0]
          this.pageId = data.id
          this.shopPagePageInfo(data.id)
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => console.log(err))
    },
    shopPagePageInfo(pageId) {
      shopPagePageInfo({pageId: pageId}).then(res => {
        if (res.code === 200) {
          let list = []
          let l = {}
          this.items = []
          if (res.data['config'] !== undefined) {
            list = JSON.parse(res.data.config)
            this.shopPagePageInfoList = list
            const len = list.length
            this.index = list[len - 1]['type'] + 1

            let list_data = []
            this.listData.map(res => list_data = [...list_data, ...res['items']])
            
            list.map(res => list_data.map(item => {
              if (item['componentId'] === res['componentId']) {
                item['difference'] = res['type']
                this.items.push(JSON.stringify(item))
              }
            }))

            l = list.reduce((pre, cur) => {
              pre[cur['type']] = cur
              return pre
            }, {})
            this.$store.commit('DATA_LIST', l)
            sessionStorage.setItem('data_list', JSON.stringify(l))
          }
          
          sessionStorage.setItem('homePageList', JSON.stringify(list))
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => console.log(err))
    },
    ModuleSwitching(item) {
      item['difference'] = this.index
      item['selectedel'] = false
      this.isComponentList.push(item.url)
      this.rigth = item
      this.items.push(JSON.stringify(item))
      if (this.isComponent !== '' && this.$refs.component.sub) {
        this.$refs.component.sub()
      }
      this.componentId = {
        componentId: item.componentId,
        difference: this.index
      }
      this.isComponent = item.url
      this.index++
    },
    uploadListBool(item) {
      const type = Object.prototype.toString.call(item)
      this.isTreeGrid = false
      if (type === '[object Boolean]') {
        this.isImg = 'vimg'
        this.title = '我的图片'
      } else if (type === '[object String]') {
        this.isImg = 'CurrentRow'
        this.title = '我的商品'
      } else if (type === '[object Number]') {
        this.isTreeGrid = true
        this.title = '我的商品分类'
        this.isImg = ''
      } else {
        this.isImg = 'commodity'
        this.title = '我的商品'
      }
      this.tpDialogVisible = true
    },
    handleClose() {
      this.tpDialogVisible = false
    },
    primary() {
      if (this.isComponent !== '' && this.$refs.component.sub) {
        this.$refs.component.sub()
      }
      const data_list = JSON.parse(sessionStorage.getItem('data_list'))
      const l = this.items.map(res => {
        const r = JSON.parse(res)
        return data_list[r['difference']]
      })

      const config = JSON.stringify(l)
      const listData = {
        pageId: this.pageId,
        config,
        attach: config,
      }
      shopPageUpdatepage(listData).then(res => {
        this.shopPagePageInfo(this.pageId)
      }).catch(err => console.log(err))
    },
    sub() {
      this.tpDialogVisible = false
      if (this.isTreeGrid) {
        let list = this.$refs.isTreeGrid.handleCurrent()
        this.$refs.component.boolPage(list)
        return
      }
      const list = this.$refs.Img.sub()
      if (this.isImg === 'vimg') {
        if (list.length > 1) {
          this.$message.error('请选择一张图片！')
          return
        }
        this.$refs.component.boolPage(list[0]['url'])
        this.$refs.Img.kong()
      } else {
        this.$refs.component.boolPage(list)
      }
      if (this.isImg === 'commodity') {
        this.$refs.Img.clearSelection()
      }
    },
  }
}
</script>

<style lang="scss" scoped>
%background {
  background: #ffffff;
}
%tb {
  top: 100px;
  bottom: 0;
}
.app-container {
  padding: 0;
  .hander {
    @extend %background;
    height: 50px;
    line-height: 50px;
    padding-left: 40px;
    padding-right: 40px;
  }
  .left {
    width: 310px;
  }
  .rigth {
    right: 0px;
    width: 410px;
  }
}

.dialog-footer {
  @extend %background;
}
.public {
  position: fixed;
  z-index: 5;
  @extend %tb;
  @extend %background;
  padding-top: 0px;
  -webkit-box-sizing: border-box;
  box-shadow: 0 0px 2px rgba(0,0,0,0.35);
  box-sizing: border-box;
  overflow: auto;
  outline: none;
  -ms-touch-action: none;
  touch-action: none;
  span {
    display: block;
    line-height: 36px;
    text-align: center;
    background: #f2f2f2;
  }
}

%ws {
  &::-webkit-scrollbar {
    width: 6px;
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #C3C3C3;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #E6E6E6;
    border-radius: 10px;
  }
}
.public {
  @extend %ws;
}

.con {
  position: absolute;
  width: 100%;
  @extend %tb;
  background: #e4e4e4;
  img {
    width: 100%;
  }
  .m-phone {
    left: 50%;
    display: inline-block;
    top: 45px;
    width: 320px;
    height: 640px;
    margin: 10px auto;
    margin-left: -240px;
    position: absolute;
    background-image: url('/static/img/phone.png');
    background-repeat: no-repeat;
    background-size: 100% auto;
    padding: 44px 11px 61px 9px;
    -webkit-transform: translate(-55px);
    transform: translate(-55px);
    .m-phone-con {
      @extend %ws;
      height: 535px;
      overflow-y: auto;
    }
  }
}
</style>
