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
        <el-table-column
            prop="cellId"
            label="ID"
            width="40">
        </el-table-column>
        <el-table-column
        property="cellLabel"
        label="通知">
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
        <el-button @click="addNotify()">添加通知</el-button>
    </div>
    <el-dialog
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
    </el-dialog>
  </div>
</template>

<script>
import { shopConfigList, shopConfigSave, shopConfigDelete } from '../server'
export default {
	data() {
		return {
			currentIndex: -1,
			modifyType: -1,
			cellType: 5,
			cellId: null,
			editInput: false,
			dialogTitle: '',
			currentNotify: {cellId: -1, cellLabel: ''},
			dialogDeleteVisible: false,
			tableData: []
		}
	},
	created() {
		this.getNotifyList()
	},
	methods: {
		getNotifyList() {
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
		addNotify() {
			this.modifyType = 1
			this.dialogDeleteVisible = true
			this.editInput = false
			this.dialogTitle = '添加通知'
		},
		modifyHandle(val) {
			this.modifyType = 2
			this.editInput = false
			this.dialogTitle = '修改通知'
			this.dialogDeleteVisible = true
			this.currentIndex = parseInt(val)
			var str = JSON.stringify(this.tableData[val])
			this.currentNotify = JSON.parse(str)
		},
		deleteHandle(val) {
			this.modifyType = 3
			this.editInput = true
			this.dialogTitle = '确定删除'
			this.dialogDeleteVisible = true
			this.currentIndex = parseInt(val)
			var str = JSON.stringify(this.tableData[val])
			this.currentNotify = JSON.parse(str)
		},
		handleDeleteClose() {
			this.dialogDeleteVisible = false
			this.editInput = false
			this.dialogTitle = ''
			this.currentNotify = {
				cellId: -1,
				cellLabel: ''
			}  
			this.currentIndex = -1
		},
		handleDeleteSubmit() {
			if (this.modifyType == 1) {
				shopConfigSave({
					cellLabel: this.currentNotify.cellLabel,
					cellType: this.cellType,
					parentId: this.cellId,
					navigateType: -1
				}).then(res => {
					if (res.code === 200) {
						this.dialogDeleteVisible = false
						this.editInput = false
						this.dialogTitle = ''
						this.currentIndex = -1
						this.cellId = null
						this.getNotifyList() 
						this.currentNotify = {
							cellId: -1,
							cellLabel: ''
						}
					}else {
						this.$message.error(res.msg)
					}
				}).catch(err => console.log(err))
			} else if (this.modifyType == 2) {
				shopConfigSave({
					cellLabel: this.currentNotify.cellLabel,
					cellType: this.cellType,
					cellId: this.currentNotify.cellId,
					navigateType: -1
				}).then(res => {
					if (res.code === 200) {
						this.dialogDeleteVisible = false
						this.editInput = false
						this.dialogTitle = ''
						this.currentIndex = -1
						this.cellId = null
						this.getNotifyList() 
						this.currentNotify = {
							cellId: -1,
							cellLabel: ''
						}
					}else {
						this.$message.error(res.msg)
					}
				}).catch(err => console.log(err))
			} else if (this.modifyType == 3){
				shopConfigDelete(this.currentNotify.cellId).then(res => {
					if (res.code === 200) {
						this.dialogDeleteVisible = false
						this.editInput = false
						this.dialogTitle = ''
						this.currentIndex = -1
						this.cellId = null
						this.getNotifyList() 
						this.currentNotify = {
							cellId: -1,
							cellLabel: ''
						}
					}else {
					this.$message.error(res.msg)
					}
				}).catch(err => console.log(err))
			}
		}
	}
}
</script>

<style scoped>
</style>