<template>
  <p @click="click">{{msg}}</p>
</template>

<script>
export default {
  data() {
    return {
      msg: 'a2'
    }
  },
  methods: {
    click() {
      this.$emit('ac', 'hhhhhhh')
    }
  }
}
</script>

<style>

</style>