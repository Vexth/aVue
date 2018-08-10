<template>
  <!-- <el-upload
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList2"
    list-type="picture">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload> -->
  <el-form :model="ruleForm" ref="ruleForm">
    <el-form-item label="上传文件">
      <el-upload ref="uploada" :action="mixinUploadUrl" :file-list="fileList" multiple="multiple">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">导出</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {},
      fileList: [],
      mixinUploadUrl: 'https://jsonplaceholder.typicode.com/posts/'
    };
  },
  methods: {
    submitForm (formName) {
      //包含上传的文件信息和服务端返回的所有信息都在这个对象里
      console.log(formName)
      console.log(this.$refs.uploada.uploadFiles)
    }
  }
}
</script>

<style>

</style>
