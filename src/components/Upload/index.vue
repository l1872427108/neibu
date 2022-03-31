<template>
  <div>
    <el-upload
      :data="uploadData"
      :class="className"
      :action="host"
      :before-upload="handleChange"
      :accept="extend"
      :on-success="upSuccess"
      :show-file-list="false"
      border
    >
      <div v-show="className == 'upload-demo'">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传/{{ extend }}文件</div>
      </div>
      <div v-show="className == 'avatar-uploader'">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </div>
      <slot v-show="className == ''" />
    </el-upload>
  </div>
</template>

<script>
import { contractPolicy } from '~/api/contractManagement'
import { randomString } from '~/utils/util'
export default {
  props: {
    extend: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      uploadData: {},
      fileName: '',
      host: 'http://testoss.puge.net'
    }
  },
  methods: {
    async handleChange(file) {
      const { name } = file
      this.fileName = name
      await this.gainKays()
    },
    gainKays() {
      return new Promise((resolve, reject) => {
        contractPolicy()
          .then(res => {
            const oss = res.data.ossData
            this.host = oss.host
            this.uploadData.key = oss.dir + '/' + randomString(6) + '/' + this.fileName
            this.uploadData.dir = oss.dir
            this.uploadData.host = oss.host
            this.uploadData.policy = oss.policy
            this.uploadData.ossaccessKeyId = oss.accessid
            this.uploadData.signature = oss.signature
            this.uploadData.callback = oss.callback
            console.log(this.uploadData)
            resolve(true)
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: '上传失败',
              duration: 1500
            })
            reject(err)
          })
      })
    },
    upSuccess(res) {
      this.$emit('updatePhoto', res.data.ossData.filename)
      this.$message({
        type: 'success',
        message: '上传成功',
        duration: 1500
      })
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9 ;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #409eff;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	text-align: center;
	border: 1px dashed  gray;
}
.avatar-uploader-icon::before{
	line-height: 178px;

}
.avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>
