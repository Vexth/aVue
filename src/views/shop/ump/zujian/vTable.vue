<template>
  <el-table :data="list" border fit highlight-current-row style="width: 100%" ref="multipleTable">

    <el-table-column v-for="(v, i) in row" :key="i" :align="v.align" :label="v.label" :width="v.width" :type="v.type">
      <template slot-scope="scope" v-if="v.type !== 'selection'">
        <div v-if="v.p">
          <span>{{v.p[`${scope.row[v['name']]}`]}}</span>
        </div>
        <component v-else-if="v.fn" :is="componentId" :row="scope.row" @response="response"></component>
        <span v-else>{{scope.row[v['name']]}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import vP from './p.vue'
export default {
  data() {
    return {
      componentId: 'vp'
    }
  },
  components: {
    'vp': vP
  },
  props: ['row', 'list'],
  methods: {
    response(v) {
      this.$emit('response', v)
    }
  }
}
</script>

<style>

</style>