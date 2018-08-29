<template>
  <li :class="isSelected ? 'list-item' : ''" :type="list.componentId" :data-item="item">
    <img :src="list.imgurl" alt="" srcset="">
    <el-popover
      placement="left"
      width="160"
      v-model="visible2">
      <p>这个模块您确定要删除吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
        <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
      </div>
      <el-button class="button" size="mini" slot="reference">×</el-button>
    </el-popover>
  </li>
</template>

<script>
import { ElementMixin } from 'vue-slicksort'
export default {
  name: 'SortableItem',
  mixins: [ElementMixin],
  props: {
    item: {
      type: String,
      default: ''
    }
  },
  watch: {
    item: {
      immediate:true,
      handler(newVal, oldVal) {
        this.list = JSON.parse(newVal)
      }
    }
  },
  data() {
    return {
      isSelected: false,
      visible2: false,
      list: {}
    }
  },
  methods: {
    selected(item) {
      this.isSelected = item
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  margin: 0;
  padding: 0;
  list-style-type: none;
  cursor: all-scroll;
  text-align: center;
  border: 2px dashed transparent;
  position: relative;
  img {
    width: 100%;
  }
  .button {
    position: absolute;
    right: 0;
    top: 0;
    width: 25px;
    height: 25px;
    font-size: 20px;
    border: 0;
    border-radius: 50%;
    padding: 0;
    background: rgba(0,0,0,0.5);
    color: #fff;
  }
}
.list-item {
  border-color: #f96132;
}
</style>

