<template>
  
</template>

<script>
export default {
  data() {
    return {
      homePageList: [],
      bool: true,
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
        if (oldVal !== undefined) {
          this.sub()
        }
        let data = {
          type: newVal.difference,
          componentId: newVal.componentId,
        }
        this.$store.dispatch('addHomePageList', data)
      }
    }
  },
  beforeDestroy() {
    if (this.bool) {
      this.sub()
    }
  },
  methods: {
    sub() {
      this.bool = false
      return this.$store.dispatch('Search')
    },
    primary() {
      console.log('primary')
    }
  }
}
</script>

<style>

</style>
