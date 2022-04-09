<template>
  <div>
    <pdfSign :is-control="isControl" :image="image" class="pdfSign" @showFlag="showFlag" />
    <div class="signature-wrap">
      <signature
        :visible.sync="receiverSignFlag"
        :remote-dialog="remoteDialog"
        @getImage="getImage"
      />
      <div v-if="show" class="signature-sign">
        <el-button
          type="primary"
          class=""
          style="width: 200px;"
          @click="handleReceiverFlag"
        >签署名字</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import PdfSign from '~/components/ContractProduction/index'
import Signature from '~/components/SignatureProduction/index'
import defer from '~/mixins/defer'
export default {
  components: {
    PdfSign,
    Signature
  },
  mixins: [defer],
  data() {
    return {
      image: '',
      widthDialog: 0,
      receiverSignFlag: false,
      show: false,
      url: '',
      isControl: false
    }
  },
  created() {
  },
  methods: {
    handleReceiverFlag() {
      this.receiverSignFlag = true
      this.isControl = true
    },
    remoteDialog() {
      this.receiverSignFlag = false
    },
    getImage(img) {
      this.image = img
    },
    showFlag(e) {
      this.show = e
    }
  }
}
</script>

<style lang="scss">
#app {
  overflow: scroll !important;
}
.signature-wrap {
    margin-bottom: 50px;
}
.signature-sign {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    margin-left: 20%;
}
</style>
