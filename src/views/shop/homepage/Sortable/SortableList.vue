<template>
  <ul class="list">
    <slot />
  </ul>
</template>

<script>
import { ContainerMixin } from 'vue-slicksort'

export default {
  name: 'SortableList',
  mixins: [ContainerMixin],
}
</script>

<style lang="scss" scoped>
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
</style>

