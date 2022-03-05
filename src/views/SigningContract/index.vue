<template>
    <div>
        <pdfSign :isControl="isControl" @showFlag="showFlag" :image="image" class="pdfSign" />
        <div class="wrap">
            <signature
            :visible.sync="receiverSignFlag"
            @getImage="getImage"
            :remoteDialog="remoteDialog"
            />
            <div class="sign" v-if="show">
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
import PdfSign from '~/components/ContractProduction/index';
import Signature from '~/components/SignatureProduction/index';
import defer from '~/mixins/defer';
export default {
    mixins: [defer],
    components: {
        PdfSign,
        Signature
    },
    data () {
        return {
            image: '',
            widthDialog: 0,
            receiverSignFlag: false,
            show: false,
            url: '',
            isControl: false
        };
    },
    created () {
    },
    methods: {
        handleReceiverFlag () {
                this.receiverSignFlag = true;
                this.isControl = true;
        },
        remoteDialog () {
            this.receiverSignFlag = false;
        },
        getImage (img) {
            this.image = img;
        },
        showFlag (e) {
            this.show = e;
        }
    }
};
</script>

<style lang="scss" scoped>
.wrap {
    margin-bottom: 50px;
}
.sign {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    margin-left: 20%;
}
</style>
