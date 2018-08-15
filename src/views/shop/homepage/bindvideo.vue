<template>
  <div class="app-container">
      <el-table
        :data="tableData"
        style="width: 100%">
         <el-table-column
            type="selection"
            width="55"
            aria-disabled="true">
        </el-table-column>
        <!-- <el-table-column
            prop="cellId"
            label="ID"
            width="40">
        </el-table-column> -->
        <el-table-column
        property="data.title"
        label="视频标题">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="60">
            <template slot-scope="scope">
                <el-button
                type="text"
                size="small"
                @click="playHandle(scope.$index)">
                播放
                </el-button>
            </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="60">
            <template slot-scope="scope">
                <el-button
                type="text"
                size="small"
                @click="modifyHandle(scope.$index)">
                修改
                </el-button>
            </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="60">
            <template slot-scope="scope">
                <el-button
                type="text"
                size="small"
                @click="deleteHandle(scope.$index)">
                移除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
        <el-button @click="addVideo()">添加视频</el-button>
    </div>
    <el-dialog
        :title="dialogBindTitle"
        :visible.sync="dialogBindVisible"
        width="50%"
        :before-close="handleBindDelete"
        center>
        <div class="select-view">
            <el-select v-model="value" placeholder="请选择" :disabled="isplay" :change="changeSelect(value)">
                <el-option
                v-for="(item, index) in videoList"
                :key="index"
                :label="item.title"
                :value="index">
                </el-option>
            </el-select>
        </div>
        <video :src="currentVideoUrl" controls="controls" width="450" muted="true"/>
        <span ref="button" slot="footer" class="dialog-footer">
            <el-button @click="handleBindDelete" >取 消</el-button>
            <el-button type="primary" @click="handleBindSubmit">确 定</el-button>
        </span>
    </el-dialog>
    <!-- <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogDeleteVisible"
        width="50%"
        :before-close="handleDeleteClose"
        center>
        <el-input class="edit-input" size="small" placeholder="请输入通知" maxlength="32" v-model="currentNotify.cellLabel" :disabled="editInput"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleDeleteClose">取 消</el-button>
            <el-button type="primary" @click="handleDeleteSubmit">确 定</el-button>
        </span>
    </el-dialog> -->
  </div>
</template>

<script>
import { shopConfigList, shopConfigSave, getVideoList, shopConfigDelete } from '../server'
export default {
    components: {},
     data() {
      return {
        isplay: false,
        videoList: [],
        dialogBindTitle: '',
        dialogBindVisible: false,
        currentVideoUrl:'',
        value: null,
        currentIndex: -1,
        modifyType: -1,
        cellType: 7,
        cellId: null,
        cellCurrntId: null,
        tableData: []
      }
    },
    created() {
        this.getBindList()
        this.getVideoList()
    },
    methods: {
        changeSelect(val) {
        if (val != null && this.videoList[val] != null) {
             this.currentVideoUrl = this.videoList[val].url
        }
    },
    //获取videoList
    getVideoList() {
        getVideoList().then(res => {
            if (res.code === 200) {
                this.videoList = res.data
                 console.log(JSON.stringify(this.videoList))
            }
        })
    },
      getBindList() {
        // GET /api/v1/shop/page/main/config/list 微信主页配置 列表
        shopConfigList(this.cellType).then(res => {
            if (res.code === 200) {
            const data = res.data
            console.log("res.data:["+JSON.stringify(res.data)+"]")
            this.cellId = data.cellId
            this.tableData = data['children'] === undefined ? [] : data['children']
            } else {
            this.$message.error(res.msg)
            }
        }).catch(err => console.log(err))
      },
      addVideo() {
          this.modifyType=1
          this.dialogBindVisible=true
          this.dialogBindTitle='添加视频'
          this.value= null
          this.currentVideoUrl=''
          this.isplay = false
      },
      handleBindDelete() {
          this.dialogBindVisible=false
          this.dialogBindTitle=''
          this.value=null
          this.currentVideoUrl=''
          this.isplay = false
          this.$refs.button.style.display = 'block';
          this.cellCurrntId = null
        //   this.cellId = null
      },
      handleBindSubmit() {
        if (this.modifyType==1) {
            shopConfigSave({cellType: this.cellType,
            parentId: this.cellId,
            imageId: this.videoList[this.value].id,
            navigateType: -1}).then(res => {
            if (res.code === 200) {
                this.dialogBindVisible=false
                this.dialogBindTitle=''
                this.value=null
                this.currentVideoUrl=''
                this.isplay = false
                this.cellId = null
                this.cellCurrntId = null
                this.getBindList()
            }else {
            this.$message.error(res.msg)
            }
            }).catch(err => console.log(err))
        } else if (this.modifyType==2) {   
            shopConfigSave({imageId: this.videoList[this.value].id,
                cellType: this.cellType,
                cellId: this.cellCurrntId,
                navigateType: -1}).then(res => {
                if (res.code === 200) {
                    this.dialogBindVisible=false
                    this.dialogBindTitle=''
                    this.value=null
                    this.currentVideoUrl=''
                    this.isplay = false
                    this.cellId = null
                    this.cellCurrntId = null
                    this.getBindList() 
                }else {
                this.$message.error(res.msg)
                }
                }).catch(err => console.log(err))
        } else if (this.modifyType==3) {   
            shopConfigDelete(this.cellCurrntId).then(res => {
                if (res.code === 200) {
                    this.dialogBindVisible=false
                    this.dialogBindTitle=''
                    this.value=null
                    this.currentVideoUrl=''
                    this.isplay = false
                    this.cellId = null
                    this.cellCurrntId = null
                    this.getBindList() 
                }else {
                this.$message.error(res.msg)
                }
                }).catch(err => console.log(err))
        }
      },
      playHandle(val) {
          
          this.isplay = true
          this.dialogBindVisible=true
          this.dialogBindTitle='播放视频'
          var videoId = this.tableData[val].data.id
          var index = 0
          for(;index<this.videoList.length;index++) {
            if (videoId == this.videoList[index].id) {
                break
            }
          }
          this.value= index
        //   this.currentVideoUrl=this.videoList[val].url
        //   console.log("playHandle:val["+val+']value['+this.value+"]")
          this.$refs.button.style.display = 'none';
      },

      
      modifyHandle(val) {
          this.modifyType=2
          this.dialogBindVisible=true
          this.dialogBindTitle='修改视频'
          this.isplay = false
          var videoId = this.tableData[val].data.id
          var index = 0
          for(;index<this.videoList.length;index++) {
            if (videoId == this.videoList[index].id) {
                break
            }
          }
          this.value= index
         this.cellCurrntId = this.tableData[val].cellId
          
      },
      deleteHandle(val) {
          this.modifyType=3
          this.isplay = true
          this.dialogBindVisible=true
          this.dialogBindTitle='删除视频'
          var videoId = this.tableData[val].data.id
          var index = 0
          for(;index<this.videoList.length;index++) {
            if (videoId == this.videoList[index].id) {
                break
            }
          }
          this.value= index
          this.cellCurrntId = this.tableData[val].cellId
      }
    }
}
</script>

<style scoped>
.select-view {
    margin-bottom: 10px
}
.dialog-footer { 
}
</style>