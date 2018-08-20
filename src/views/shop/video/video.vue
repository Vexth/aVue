<template>
  <div class="app-container">
      <div class="video-list">
            <div class="video-one" v-for="(video, index) in videoList" :key="index">
                <div class="video-one-title"> {{ video.title }}</div>
                <video class="video-video" :src="video.url" controls="controls" width="250"/>
                <div class="botton-view">
                    <el-button type="primary" @click="modifyVideo(index)">修改</el-button>
                    <el-button type="primary" @click="subdelete(index)">删除</el-button>
                </div>
            </div>
            <v-plus v-if="isXs" :form="form" @plus="plus" />
       </div>
       <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
            center>
            <span>
                <span style="font-size: 18px">标题</span>
                <el-input class="edit-input" size="small" placeholder="请输入标题" v-model="currentVideo.title"></el-input>
                <span style="font-size: 18px">视频vid</span>
                <el-input class="edit-input" size="small" placeholder="请输入视频vid" v-model="currentVideo.vid" :disabled="testVideoLoad===false">
                </el-input>
                <video :src="currentVideo['url']" controls="controls" width="250"/>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="testVideo" :disabled="testVideoLoad===false">测试vid</el-button>
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="handleSubmit" :disabled="testVideoLoad">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="确定删除"
            :visible.sync="dialogDeleteVisible"
            width="30%"
            :before-close="handleDeleteClose"
            center>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleDeleteClose">取 消</el-button>
                <el-button type="primary" @click="handleDeleteSubmit">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
import { getVideoList, getVideoUrl, addVideo, modifyVideo, deleteVideo } from '../server'
import vPlus from './plus.vue'
export default {
    components: {
        vPlus
    },
    data() {
        return {
            currentVideo: {title:"", vid:"", url:""},
            testButton: false,
            testVideoLoad: true,
            currentObject: -1,
            dialogTitle: '添加视频',
            isXs: true,
            dialogVisible: false,
            dialogDeleteVisible: false,
            videoList: [],
            form: {
                val: '点击添加视频',
                item: '最多十个视频'
            },
            selected: [],
        }
    },
    created() {
        this.getVideoList();
    },
    methods: {
        //获取videoList
        getVideoList() {
            let that = this
            getVideoList().then(res => {
                if (res.code === 200) {
                    that.videoList = res.data
                    // console.log(JSON.stringify(this.videoList))
                    if (that.videoList.length >= 10) {
                        that.isXs = false
                    } 
                }
            })

            console.log(JSON.stringify(this.videoList))
        },
        doneEdit(e) {
            const value = e.target.value.trim()
            const { todo } = this
            // if (this.editing) {
                // this.editTodo({
                // todo,
                // value
                // })
                // this.editing = false
            // }
        },
        cancelEdit() {

        },

        plus(val) {
            if (this.videoList.length >= 10) {
                this.isXs = false
                return
            }
            this.testVideoLoad=true
            this.testButton=false
            this.dialogTitle='添加视频'
            this.dialogVisible=true
            this.currentVideo = {title:"", vid:"", url:""}
        },

        modifyVideo(val) {
            this.dialogTitle='修改视频'
            this.dialogVisible=true
            this.currentObject = val
            this.testVideoLoad=true
            this.testButton=false
            var str = JSON.stringify(this.videoList[val])
            this.currentVideo = JSON.parse(str)
        },

        handleClose(val) {
            this.dialogTitle=''
            this.dialogVisible=false
            this.currentObject = -1
            this.currentVideo = {title:"", vid:"", url:""}
        },

        testVideo(val) {
            let that = this
            if (this.currentVideo.vid) {
                console.log("this.currentVideo.vid:"+this.currentVideo.vid)
                getVideoUrl({videoVid: this.currentVideo.vid}).then(res => {
                    if (res.code === 200 && res.data && res.data != "") {
                        that.currentVideo["url"] = res.data
                        that.testVideoLoad=false
                        that.testButton=true
                    } else {
                        that.$message('视频vid测试失败');
                    }
                })
            } else {
                this.$message('视频vid不能为空');
            }
            
        },

        handleSubmit(val) {
            let that = this
            if (!this.currentVideo.title || this.currentVideo.title==='') {
                this.$message('标题不能为空');
                return
            }
            if (this.currentObject === -1) {
                addVideo(this.currentVideo).then(res => {
                    if (res.code === 200) {
                        that.dialogTitle=''
                        that.dialogVisible=false
                        that.currentObject = -1
                        that.currentVideo = {title:"", vid:"", url:""}
                        that.$message('添加视频成功');
                        that.getVideoList();
                    }
                    else {
                        that.$message('添加视频失败');
                        return
                    }
                })
            } else {
                modifyVideo(this.currentVideo).then(res => {
                    // console.log("res["+JSON.stringify(res)+"]")
                    if (res !== undefined && res.code !== undefined && res.code === 200) {
                        that.dialogTitle=''
                        that.dialogVisible=false
                        that.currentObject = -1
                        that.currentVideo = {title:"", vid:"", url:""}
                        that.$message('修改视频成功');
                        that.getVideoList();
                    }
                    else {
                        that.dialogTitle=''
                        that.dialogVisible=false
                        that.currentObject = -1
                        that.currentVideo = {title:"", vid:"", url:""}
                        return
                    }
                }).catch(err => console.log(err))

            }
        },

        subdelete(val) {
            this.dialogDeleteVisible=true
            this.currentObject = parseInt(val)
            // this.currentVideo = this.videoList[val]
            // console.log("subdelete video id."+JSON.stringify(val))
        },

        handleDeleteClose(val) {
            this.dialogDeleteVisible=false
            this.currentObject = -1
            this.currentVideo = {title:"", vid:"", url:""}
        },

        handleDeleteSubmit(val) {
            
            var video = this.videoList[this.currentObject]
            let that = this
            if (video==null || video.id == null) {
                this.$message('删除视频失败')
                return
            }
            deleteVideo(video.id).then(res => {
                if (res !== undefined && res.code !== undefined && res.code === 200) {
                    that.$message('删除视频成功')
                    // console.log("that.currentObject:"+that.currentObject)
                    that.videoList.splice(that.currentObject,1)
                    that.dialogDeleteVisible=false
                    that.currentObject = -1
                    that.currentVideo = {title:"", vid:"", url:""}
                }
                else {
                    that.dialogDeleteVisible=false
                    that.currentObject = -1
                    that.currentVideo = {title:"", vid:"", url:""}
                    return
                }
            }).catch(err => console.log(err))
            // that.dialogDeleteVisible=false
            // that.currentObject = -1
            // that.currentVideo = {title:"", vid:"", url:""}
        }
    }
}
</script>

<style scoped>
.video-list{
  background: #f4f6f9;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* float: left; */
  padding: 20px;
  border: 1px solid #d8dbe3;
  margin: 0;
  width: 100%;
}

.video-one {
    width: 250px;
    padding: 0px;
    margin: 0px;
    /* float: left; */
    display: flex;  
    flex-direction: column;
    margin-bottom: 20px;
    border: 1px solid #d8dbe3;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    background: #f4f6f9
}

.botton-view {
    margin-top: 5px;
    margin-bottom: 5px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center
}

.edit-botton {
    height: 30px;
    width: 100px;
    background: blue;
    color: #d8dbe3;
    line-height: 30px;
    float: left;
    text-align: center;
    margin-left: 20px;
}

.delete-botton {
    height: 30px;
    width: 100px;
    background: red;
    color: #d8dbe3;
    line-height: 30px;
    float: right;
    text-align: center;
    margin-right: 20px;
}


/* .video-one:nth-child(3n+2) {
    margin-left: 5px;
    margin-right: 5px
} */

.video-one-title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 20px
}

.ideo-video {

}

.edit-input {
  /* padding-right: 100px; */
  margin-bottom: 10px
}

</style>