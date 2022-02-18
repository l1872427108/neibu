<template>
  <div>
    <el-upload
      :data="uploadData"
      class="upload-demo"
      :action="uploadData.host"
      :before-upload="handleChange"
      accept=".jpg,.png,.pdf"
      :on-success="upSuccess"
      :show-file-list='false'
    >
      <slot></slot>
    </el-upload>
  </div>
</template>

<script>
import { contractPolicy } from '~/api/contractManagement';
import { randomString } from '~/utils/util';
export default {
  data () {
    return {
      uploadData: {
        host: 'http://testoss.puge.net'
      },
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
        contractPolicy()
          .then(res => {
            console.log('res==>', res);
            const oss = res.data.ossData;
            this.uploadData.key = oss.dir + '/' + randomString(6) + '/' + this.fileName;
            this.uploadData.dir = oss.dir;
            this.uploadData.host = oss.host;
            this.uploadData.policy = oss.policy;
            this.uploadData.ossaccessKeyId = oss.accessid;
            this.uploadData.signature = oss.signature;
            this.uploadData.callback = oss.callback;
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
      this.$emit('updatePhoto', res.data.ossData.filename);
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
