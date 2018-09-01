<template>
  <div>
    <span name="title">{{pageleft['title']}}</span>
    <ul>
      <li v-for="(item, i) in pageleft.items" :key="i" @click="click(item)">
        <div><img :src="item.src" alt="" srcset=""></div>
        <span>{{item['title']}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pageleft: {
      type: Object,
      required: true,
      default: {}
    }
  },
  watch: {
    pageleft: {
      immediate: true,
      handler(newVal, oldVal) {
        // console.log(newVal, oldVal)
      },
      deep: true
    }
  },
  methods: {
    click(item) {
      this.$emit('ModuleSwitching', item)
    }
  }
}
</script>

<style scoped>
span[name="title"] {
  font-size: 16px;
  line-height: 36px;
  border-bottom: 1px solid #f2f2f2;
  padding-left: 10px;
  text-align: left;
}
span {
  margin-top: 5px;
  display: block;
  text-align: center;
  color: #666;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: normal;
}
ul, li {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
ul {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
}
ul li{
  position: relative;
  float: left;
  padding: 20px 10px;
  width: 33.33333333%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  color: #848484;
  border-bottom: 1px solid #f2f2f2;
  border-right: 1px solid #f2f2f2;
  list-style: none;
}
ul li:hover {
  background-color: #f0f0f0;
}
ul li:nth-child(3n) {
  border-right: 0px;
}
ul li div {
  height: 40px;
  width: 40px;
  margin: 0 auto;
}
img {
  width: 100%;
}
</style>
