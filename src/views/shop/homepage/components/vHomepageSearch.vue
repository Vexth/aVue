<template>
  
</template>

<script>
export default {
  data() {
    return {
      homePageList: [],
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
        let data = {
          type: newVal.difference,
          componentId: newVal.componentId,
        }
        this.$store.dispatch('addHomePageList', data)
        this.sub()
      }
    }
  },
  beforeDestroy() {
    this.sub()
  },
  methods: {
    sub() {
      return this.$store.dispatch('Search')
    },
    primary() {
      this.sub()
      this.$store.commit('IS_PRIMARY', true)
      // console.log('primary')
    }
  }
}
</script>

<style>

</style>
