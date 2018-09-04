<template>
  
</template>

<script>
export default {
  data() {
    return {
      l: null
    }
  },
  props: {
    componentId: {
      type: Object,
      default: {}
    }
  },
  watch: {
    componentId: {
      immediate:true,
      handler(newVal, oldVal) {
        this.l = {
          type: newVal.difference,
          componentId: newVal.componentId,
        }
        this.$store.commit('ADD_DATA_LIST', this.l)
      }
    }
  },
}
</script>

<style>

</style>
