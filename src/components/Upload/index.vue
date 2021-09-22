<template>
  <div>
    <el-upload
      :data="uploadData"
      class="upload-demo"
      action="https://inside.puge.net"
      :before-upload="handleChange"
      accept=".jpg,.png,.pdf"
      :on-success="upSuccess"
      :show-file-list='false'
      :disabled="fa"
    >
      <el-button
        size="small"
        type="primary"
      >点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
import { searchQuit } from '~/api/oss';
import { randomString } from '~/utils/util';
export default {
  props: {
      fa: {
         type: Boolean
      }
  },
  data () {
    return {
      uploadData: {},
      fileName: ''
    };
  },
  methods: {
    async handleChange (file) {
      const { name } = file;
      this.fileName = name;
      await this.gainKays();
    },
    gainKays () {
      return new Promise((resolve, reject) => {
        searchQuit()
          .then(res => {
            const oss = res.data.ossData;
            this.uploadData.key = oss.dir + '/' + randomString(6) + '/' + this.fileName;
            this.uploadData.dir = oss.dir;
            this.uploadData.host = oss.host;
            this.uploadData.policy = oss.policy;
            this.uploadData.ossaccessKeyId = oss.accessid;
            this.uploadData.signature = oss.signature;
            this.uploadData.callback = oss.callback;
            console.log(this.uploadData);
            resolve(true);
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: '上传失败',
              duration: 1500
            });
            reject(err);
          });
      });
    },
    upSuccess (res) {
      this.$emit('func', res.data.ossData.filename);
      this.$message({
        type: 'success',
        message: '上传成功',
        duration: 1500
      });
    }
  }
};
</script>

<style>
</style>
