<template>
  <div @click="plus">
    <i class="el-icon-plus"></i>
    <p>{{form.val}}</p>
    <p>（注：{{form.item}}）</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 1
    }
  },
  props: {
    form: Object
  },
  methods: {
    plus() {
      this.$emit('plus', this.index)
      this.index++
    }
  }
}
</script>

<style scoped>
div {
  float: left;
  width: 200px;
  height: 160px;
  text-align: center;
  border: 1px dashed #c0ccda;
  margin-top: 20px;
  cursor: pointer;
}
i {
  margin-top: 5px;
  font-size: 100px;
  color: #ccc;
}
p {
  margin: 0;
  line-height: 24px;
  color: #ccc;
}
</style>
