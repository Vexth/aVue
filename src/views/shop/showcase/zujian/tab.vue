<template>
  <div>
    <el-table :data="tableData" border style="width: 100%" align="center">
      <el-table-column v-for="(v, i) in row" :label="v.label" :key="i" align="center">
        <template slot-scope="scope">
          {{ scope.row[i][`a${i}`] }}
        </template>
      </el-table-column>
      <el-table-column label="价格（元）" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row[0].unitPrice" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="库存" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row[0].stockAmount" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="规格编码" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row[0].stockBarcode" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="成本价" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row[0].costPrice" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="销量" align="center">
        <template slot-scope="scope">
          <span>0</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button :type="iconCheck.indexOf(scope.$index) > -1 ? 'success' : 'primary'" size="mini" @click="handleEdit(scope.$index, scope.row)">{{iconCheck.indexOf(scope.$index) > -1 ? '成功' : '上传'}}<i class="el-icon--right" :class="iconCheck.indexOf(scope.$index) > -1 ? 'el-icon-circle-check-outline' : 'el-icon-upload'"></i></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="我的图片"
      :visible.sync="DialogVisible"
      width="50%"
      :before-close="handleClose"
      center>
      <v-img ref="Img" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="sub">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import vImg from './img.vue'
export default {
  data() {
    return {
      DialogVisible: false,
      index: null,
      iconCheck: [],
      List: [],
    }
  },
  components: {
    vImg
  },
  props: {
    row: Array,
    tableData: Array
  },
  methods: {
    handleClose() {
      this.DialogVisible = false
    },
    handleEditPromotion(index, row) {
      this.index = index
      this.DialogVisible = true
      const attrOption = []
      row.map((res, i) => {
        let a = res[`a${i}Id`]
        attrOption.push(a)
      })
      row[0]['attrOption'] = attrOption.join("|")
    },
    sub() {
      const list = this.$refs.Img.sub()
      if (list.length > 1) {
        this.$message.error('请选择一张图片！')
        return
      }
      this.$refs.Img.kong()
      this.DialogVisible = false
      this.iconCheck.push(this.index)
      this.tableData[this.index][0]['imageId'] = list[0]['id']
    },
    bc() {
      return this.tableData
    }
  }
}
</script>

<style>

</style>
