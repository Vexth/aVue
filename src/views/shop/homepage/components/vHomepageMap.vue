<template>
  <div class="div">
    <el-form ref="ruleForm2" v-model="mapData" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商户名称：">
        <el-input v-model="mapData.shopName" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="商户地址：">
        <el-input v-model="mapData.address" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="营业时间：">
        <el-row width="200">
          <el-time-picker
            @change="changeTime"
            style="width: 100%;"
            is-range
            v-model="worktime"
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
let loc
window.addEventListener('message', function(event) {
  // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
  loc = event.data
  if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
    // console.log('location', loc)
    loc = loc
  }
}, false)
export default {
  props: {
    componentId: Number
  },
  data() {
    return {
      l: null,
      isbool: true,
      worktime: [new Date(2016, 9, 10, 0, 0), new Date(2016, 9, 10, 0, 0)],
      mapData: {
        type: null,
        shopName: '',
        address: '',
        workTime: '',
        longitude: null,
        latitude: null,
      },
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
        const l = this.$store.getters.data_list
        const ld = l[newVal.difference]
        this.mapData = {
          type: newVal.difference,
          shopName: '',
          address: '',
          workTime: '',
          longitude: null,
          latitude: null,
        }
        if (ld !== undefined) {
          this.mapData = ld['data']
        }
        
        this.l = {
          type: newVal.difference,
          componentId: newVal.componentId,
          data: this.mapData
        }

        this.$store.dispatch('AddDataList', this.l)
      }
    }
  },
  methods: {
    changeTime() {
      if (this.worktime === null || this.worktime.length !== 2) {
        this.mapData.workTime = ''
      } else {
        var startTime = ((Array(2).join(0) + this.worktime[0].getHours()).slice(-2)) + ":" + ((Array(2).join(0) + this.worktime[0].getMinutes()).slice(-2))
        var endTime = ((Array(2).join(0) + this.worktime[1].getHours()).slice(-2)) + ":" + ((Array(2).join(0) + this.worktime[1].getMinutes()).slice(-2))
        this.mapData.workTime = startTime+"-"+endTime
      }
    },
    sub() {
      if (loc === undefined || Object.prototype.toString.call(loc) === '[object String]') {
        this.$message.error('请选择位置')
        return
      }
      
      this.mapData.longitude = loc['latlng'] === undefined ? this.mapData.longitude : loc['latlng']['lng']
      this.mapData.latitude = loc['latlng'] === undefined ? this.mapData.latitude : loc['latlng']['lat']

      this.l['data'] = this.mapData
      this.$store.commit('ADD_DATA_LIST', this.l)
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
</style>