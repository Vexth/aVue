<template>
  <div class="app-container">
    <el-button  icon="el-icon-back" @click="go" style="margin-bottom: 1em;">返回上一页</el-button>
    <component :is="componentId" ></component>
  </div>
</template>

<script>
import vGiftEdit from './gift-edit.vue'
import vGiftAdd from './gift-add.vue'
import vGiftList from './gift-list.vue'
export default {
  data() {
    return {
      componentId: ''
    }
  },
  components: {
    'list': vGiftList,
    'edit': vGiftEdit,
    'add': vGiftAdd
  },
  methods: {
    go() {
      this.componentId = 'list'
    }
  }
}
</script>
