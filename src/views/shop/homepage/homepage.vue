<template>
  <div class="app-container">
    <div class="hander">
      <span>我的店铺</span>
      <el-button style="float: right;margin-top: 9px;" type="primary" size="small" @click="primary">保存</el-button>
    </div>
    <div class="public left">
      <span>组件库</span>
      <v-homepage-left :pageleft="list1" @ModuleSwitching="ModuleSwitching"></v-homepage-left>
      <v-homepage-left :pageleft="list2" @ModuleSwitching="ModuleSwitching"></v-homepage-left>
      <v-homepage-left :pageleft="list3" @ModuleSwitching="ModuleSwitching"></v-homepage-left>
    </div>
    <div class="con">
      <div class="m-phone">
        <div class="m-phone-con">
          <SortableList lockAxis="y" v-model="items" @input="input" @sortStart="sortStart">
            <SortableItem v-for="(item, index) in items" :index="index" :key="index" :item="item" :ref="item" />
          </SortableList>
          <!-- <div v-for="(item, i) in con" :key="i">{{item['title']}}{{i+1}}</div> -->
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
      <component :is="isImg" ref="Img"></component>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="sub">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SortableList from '@/views/shop/homepage/Sortable/SortableList.vue'
import SortableItem from '@/views/shop/homepage/Sortable/SortableItem.vue'

import vHomepageLeft from '@/views/shop/homepage/components/vHomepageLeft.vue'
import vHomepageBanner from '@/views/shop/homepage/components/vHomepageBanner.vue'
import vHomepageInputBox from '@/views/shop/homepage/components/vHomepageInputBox.vue'
import vHomepageVideo from '@/views/shop/homepage/components/vHomepageVideo.vue'
import vHomepageSearch from '@/views/shop/homepage/components/vHomepageSearch.vue'
import vHomepageTitle from '@/views/shop/homepage/components/vHomepageTitle.vue'
import vHomepageImg from '@/views/shop/homepage/components/vHomepageImg.vue'
import vHomepageCommodity from '@/views/shop/homepage/components/vHomepageCommodity.vue'
import vHomepageCategory from '@/views/shop/homepage/components/vHomepageCategory.vue'

import vImg from '@/views/shop/showcase/zujian/img.vue'
import CommodityAdComponent from '@/views/shop/homepage/components/component/CommodityAdComponent.vue'

import { list1, list2, list3 } from './components/test.js'

import { shopPagePageList, shopPagePageInfo } from '@/views/shop/server'

export default {
  components: {
    SortableItem,
    SortableList,
    vHomepageLeft,
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
  },
  data() {
    return {
      items: [],
      title: '',
      tpDialogVisible: false,
      rigth: {},
      isComponent: '',
      isComponentList: [],
      isImg: '',
      componentId: null,
      list1: list1,
      list2: list2,
      list3: list3,
      pageId: null,
      index: 0
    }
  },
  mounted() {
    this.shopPagePageList()
    let list = []
    sessionStorage.setItem('homePageList', JSON.stringify(list))
  },
  beforeDestroy() {
    // alert('11111')
  },
  watch: {
    items(val) {
      // console.log(val)
    }
  },
  methods: {
    shopPagePageList() {
      shopPagePageList().then(res => {
        if (res.code === 200) {
          const data = res.data[0]
          this.pageId = data.id
          this.$store.dispatch('addPageId', data.id)
          this.shopPagePageInfo(data.id)
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => console.log(err))
    },
    shopPagePageInfo(pageId) {
      shopPagePageInfo({pageId: pageId}).then(res => {
        if (res.code === 200) {
          console.log(res)
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => console.log(err))
    },
    ModuleSwitching(item) {
      item['difference'] = this.index
      this.isComponentList.push(item.url)
      this.rigth = item
      this.items.push(JSON.stringify(item))
      this.componentId = {
        componentId: item.componentId,
        difference: this.index
      }
      this.isComponent = item.url
      this.index++
    },
    uploadListBool(item) {
      if (Object.prototype.toString.call(item) === '[object Boolean]') {
        this.isImg = 'vimg'
        this.title = '我的图片'
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
      if (this.isComponent !== '') {
        this.$refs.component.primary()
      }
    },
    sortStart(item) {
      this.items.map(res => {
        this.$refs[res][0].selected(false)
        if (res === item.node.dataset.item) {
          this.$refs[res][0].selected(true)
        }
      })
    },
    input(item) {
      this.items = item
      // console.log(item)
    },
    sub() {
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
      this.tpDialogVisible = false
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
