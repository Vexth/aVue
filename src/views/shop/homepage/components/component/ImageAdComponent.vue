<template>
  <el-form :model="ruleForm2" status-icon label-width="100px" class="demo-ruleForm">
    <el-form-item label="图片：">
      <div class="v-li-uploadList" @click="uploadList('img')">
        <img :src="imageUrl" alt="" :class="bool ? '' : 'img'" srcset="">
        <span v-if="bool">添加图片</span>
      </div>
    </el-form-item>
    <el-form-item label="标题：">
      <el-input v-model="ruleForm2.title" placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form-item label="链接：">
      <el-popover
        placement="bottom"
        width="390"
        trigger="hover">
        <div class="path">

          <ul v-for="(item, i) in typeList" :key="i">
            <li class="li">{{item.title}}</li>
            <li v-for="(v, index) in item.items" :key="index" @click="path(v.type, v.name)" :type="v.name">{{v.name}}</li>
          </ul>
        </div>
        <el-button class="reference" slot="reference">{{setCategory}}</el-button>
      </el-popover>
    </el-form-item>
    <div class="delete" @click="deleteClick">×</div>
  </el-form>
</template>

<script>
import { li } from '../test.js'

const plugins = ['detail', 'group']
export default {
  data() {
    return {
      val: {},
      bool: true,
      typeList: li,
      setCategory: '设置链接到的产品或分类',
      imageUrl: '/static/img/icon-add.png',
      ruleForm2: {
        imageUrl: '',
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
          this.bool = false
          this.imageUrl = this.val['ruleForm2']['imageUrl']
          this.ruleForm2 = this.val['ruleForm2']

          let l = []
          let type = this.ruleForm2['navigateTo']['navigateName']
          li.map(res => l = [...l, ...res['items']])
          let d = l.filter(res => res['type'] === type)
          if (d.length === 1 && d[0].type !== '') {
            this.setCategory = d[0]['name']
          }
        }
      }
    }
  },
  methods: {
    uploadList(item) {
      this.$emit('uploadListBool', item, this.name)
    },
    boolPage(item) {
      const type = Object.prototype.toString.call(item)
      // console.log(type)
      if (type === '[object String]') {
        this.bool = false
        this.ruleForm2.imageUrl = item
        this.imageUrl = item
      } else if (type === '[object Object]') {
        if (item['product'] !== undefined) {
          this.ruleForm2.navigateTo.navigateParam = item['product']['id']
        } else {
          this.ruleForm2.navigateTo.navigateParam = item['groupId']
        }
      }
      this.val['ruleForm2'] = this.ruleForm2
      return this.val
    },
    deleteClick() {
      this.$emit('deleteClick', this.val['component'])
    },
    path(item, name) {
      if (item === '') {
        this.ruleForm2.navigateTo.navigateName = ''
        this.ruleForm2.navigateTo.navigateParam = ''
        this.setCategory = '设置链接到的产品或分类'
        return
      }
      this.ruleForm2.navigateTo.navigateName = item
      this.val['ruleForm2'] = this.ruleForm2
      if (plugins.indexOf(item) > -1) {
        this.uploadList(item)
      }
      this.setCategory = name
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