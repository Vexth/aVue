<template>
  <el-form :model="ruleForm2" status-icon label-width="100px" class="demo-ruleForm">
    <el-form-item label="大图片：">
      <div class="v-li-uploadList" @click="uploadList('img')">
        <img :src="ruleForm2.imageUrl" alt="" :class="bool ? '' : 'img'" srcset="">
        <span v-if="bool">添加图片</span>
      </div>
    </el-form-item>
    <el-form-item label="小图片：">
      <div class="v-li-uploadList-small" @click="uploadList('img')">
        <img :src="ruleForm2.imageUrl" alt="" :class="bool ? '' : 'img'" srcset="">
        <span v-if="bool">添加图片</span>
      </div>
    </el-form-item>
    <el-form-item label="链接：">
      <el-popover
        placement="bottom"
        width="390"
        trigger="hover">
        <div class="path">
          <ul>
            <li class="li">常用功能</li>
            <li @click="path('home')" type="home">主页</li>
            <li @click="path('shop-cart')" type="shop-cart">购物车</li>
            <li @click="path('user')" type="user">个人中心</li>
            <li @click="path('addcar')" type="addcar">车型选择</li>
            <li @click="path('address-add')" type="address-add">添加地址</li>
            <li @click="path('select-address')" type="select-address">地址选择</li>
            <li @click="path('bindcar')" type="bindcar">绑定车型</li>
            <li @click="path('card-detail')" type="card-detail">会员卡详情</li>
            <li @click="path('company-introduction')" type="company-introduction">闲约科技介绍</li>
          </ul>
          
          <ul>
            <li class="li">商品相关</li>
            <li @click="path('detail')" type="detail">商品详情</li>
            <li @click="path('group')" type="group">产品分类</li>
            <li @click="path('order')" type="order">我的订单</li>
            <li @click="path('order-details')" type="order-details">订单详情</li>
            <li @click="path('productlist')" type="productlist">产品列表</li>
          </ul>

          <ul>
            <li class="li">营销工具</li>
            <li @click="path('shopRecord')" type="shopRecord">会员卡消费记录</li>
            <li @click="path('to-pay-order')" type="to-pay-order">订单支付页面</li>
            <li @click="path('vipcard')" type="vipcard">会员卡页面</li>
          </ul>
        </div>
        <el-button class="reference" slot="reference">设置链接到的产品或分类</el-button>
      </el-popover>
    </el-form-item>
    <div class="delete" @click="deleteClick">×</div>
  </el-form>
</template>

<script>
const plugins = ['detail', 'group']
export default {
  data() {
    return {
      val: {},
      bool: true,
      ruleForm2: {
        imageUrl: '/static/img/icon-add.png',
        title: '',
        navigateTo: {
          navigateName: '',
          navigateParam: ''
        }
      }
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  watch: {
    name: {
      immediate:true,
      handler(newVal, oldVal) {
        this.val = JSON.parse(newVal)
        if (this.val['ruleForm2']['imageUrl'] !== '') {
          this.ruleForm2 = this.val['ruleForm2']
        }
      }
    }
  },
  methods: {
    uploadList(item) {
      console.log(this.name)
      this.$emit('uploadListBool', item, this.name)
    },
    boolPage(item) {
      this.bool = false
      this.ruleForm2.imageUrl = item
      this.val['ruleForm2'] = this.ruleForm2
      return this.val
    },
    deleteClick() {
      this.$emit('deleteClick', this.val['component'])
    },
    path(item) {
      this.ruleForm2.navigateTo.navigateName = item
      this.val['ruleForm2'] = this.ruleForm2
      if (plugins.indexOf(item) > -1) {
        this.uploadList(item)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.reference {
  border: 0;
  padding: 0;
  font-size: 14px;
  color: #3399FF;
  &:hover {
    background: #fff;
  }
}
.el-input {
  width: 200px;
}
.demo-ruleForm {
  position: relative;
  padding: 25px 5px 5px;
  border: 1px solid #e5e5e5;
  width: 380px;
  margin: 10px auto 0px;
  .delete {
    display: none;
    position: absolute;
    z-index: 2;
    top: -9px;
    right: -9px;
    width: 20px;
    height: 20px;
    font-size: 16px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    background: rgba(153,153,153,0.6);
    border-radius: 10px;
  }
  &:hover .delete {
    display: block;
  }
}

.v-li-uploadList {
  width: 100px;
  height: 50px;
  line-height: 50px;
  .img {
    width: 100%;
    height: 100%;
  }
}
.v-li-uploadList-small {
  width: 80px;
  height: 80px;
//   font-size: 8px;
  line-height: 80px;
  border: 1px solid #e5e5e5;
  border-radius: 50%;
  .img {
    width: 100%;
    height: 100%;
  }
}
span {
  font-size: 14px;
  color: #3399FF;
}

ul, li {
  list-style-type: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
}
.path {
  display: flex;
  flex-flow: row;
  ul {
    width: 200px;
    li {
      margin: 5px 0;
      &:hover {
        color: #3399FF;
      }
    }
    .li {
      text-align: center;
      font-weight: bold;
      cursor: default;
      &:hover {
        color: #606266;
      }
    }
    &:nth-child(2) {
      padding-left: 10px;
      border-left: 1px rgba(0, 0, 0, 0.2) dashed;
      border-right: 1px rgba(0, 0, 0, 0.2) dashed;
    }
    &:nth-child(3) {
      padding-left: 10px;
    }
  }
}
</style>