<template>
  <div class="div">
    <el-form ref="ruleForm2" v-model="mapData" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商户名称：">
        <el-input v-model="mapData.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="商户地址：">
        <el-input v-model="mapData.address" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="营业时间：">
        <el-row width="200">
          <el-time-picker
            is-range
            v-model="mapData.worktime"
            @change="changeTime"
            size="small"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
        </el-row>
      </el-form-item>
    </el-form>
    <div class="telnet-map" >
        <iframe id="mapPage" width="100%" height="100%" frameborder=0
            src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp&coordtype=5">
        </iframe>
    </div>
  </div>
</template>

<script>
window.addEventListener('message', function(event) {
    // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
    this.loc = event.data;
    if (this.loc && this.loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
        console.log('location', this.loc);
    }
}, false);
export default {
//   components: {
//     TelnetMap
//   },
  props: {
    componentId: Number
  },
  data() {
    return {
      loc: {},
      homePageList: [],
      isbool: true,
      mapData: {
        type: null,
        name: '',
        address: '',
        worktime: [],
        worktimeStr: '',
        posterUrl: '/static/img/icon-add.png'
        // videoUrl: ''
      },
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
        this.mapData = {
          type: newVal.difference,
          name: '',
          address: '',
          // worktime: [],
          worktimeStr: '',
          posterUrl: '/static/img/icon-add.png'
        }
        let data = {
          type: newVal.difference,
          componentId: newVal.componentId,
          data: {}
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
    changeTime() {
      console.log(this.mapData.worktime)
      if (this.mapData.worktime==null || this.mapData.worktime.length != 2) {
        this.mapData.worktimeStr=''
      }
      else {
        var startTime = ((Array(2).join(0) + this.mapData.worktime[0].getHours()).slice(-2))+":"+((Array(2).join(0) + this.mapData.worktime[0].getMinutes()).slice(-2))
        var endTime = ((Array(2).join(0) + this.mapData.worktime[1].getHours()).slice(-2))+":"+((Array(2).join(0) + this.mapData.worktime[1].getMinutes()).slice(-2))
        console.log(startTime+"-"+endTime)
      }
    },
    uploadList() {
      this.$emit('uploadListBool', true)
    },
    boolPage(item) {
      this.isbool = false
      this.mapData.posterUrl = item
    },
    sub() {
      this.bool = false
      return this.$store.dispatch('mapData', this.mapData)
    },
    primary() {
      console.log('usermap')
    }
  }
}
</script>

<style lang="scss" scoped>
.div {
  padding: 14px;
  color: #6B747A;
  font-size: 12px;
}

.v-li-uploadList {
  cursor: pointer;
  width: 100px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #fff;
  border: 1px solid #e5e5e5;
  img {
    vertical-align: middle;
    margin-top: -3px;
  }
  .img {
    width: 100%;
    height: 100%;
  }
}

.telnet-map {
    width: 350px;
    height: 400px
}

.el-range-editor--small.el-input__inner{
  width: 275px
}
</style>