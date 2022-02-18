<template>
  <div>
    <div id="canvas-container" class="canvas-container">
        <canvas class="item" v-for="page in pages" :id="'the-canvas'+page" :key="page"></canvas>
    </div>
    <div class="qian">
        <el-button :disabled="!isControl" style="width: 200px;" type="success" v-if="flag" @click="getContract()">生成合约</el-button>
    </div>
    <contract-empty :visible="visible"></contract-empty>
  </div>
</template>
<script>
import PDFJS from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.entry';
import html2canvas from 'html2canvas';
import { contractPersonalInfo, contractPolicy, contractExamine } from '~/api/contractManagement';
PDFJS.workerSrc = workerSrc;
import axios from '~/utils/request/fetch';
import { randomString } from '~/utils/util';
import contractEmpty from './contractEmpty.vue';
export default {
    name: 'Pdf',
    components: {
        contractEmpty
    },
    props: {
        image: {
            required: false,
            type: [String],
            default: null
        },
        isControl: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data () {
        return {
            pages: [],
            canvas: null,
            context: null,
            container: null,
            flag: false,
            htmlUrl: '',
            pageUrl: '',
            id: '',
            visible: false,
            uploadData: {},
            filename: ''
        };
    },
    async mounted () {
        const contractId = this.$route.query.contractId;
        this.id = this.$route.query.id;
        const res = (contractId && await contractPersonalInfo(contractId));
        const pageUrl = res.data?.contract;
        // this.price = res.data?.contract?.contractPrice;
        if (pageUrl && pageUrl.contractContent) {
            this._loadFile(pageUrl.contractContent);
        } else {
            this.visible = true;
        }
    },
    methods: {
        init () {
            this.canvas = document.getElementById(`the-canvas${this.pages}`);
            if (this.canvas) {
                this.context = this.canvas.getContext('2d');
                this.container = document.getElementById('canvas-container');
                this.canvasInit();
            }
        },
        canvasInit () {
            console.log(window.screen.width);
            if (window.screen.width > 480 && window.screen.width < 979) {
                this.context.clearRect(this.canvas.getBoundingClientRect().width - 350, this.canvas.getBoundingClientRect().height - 350, 200, 150);
            } else {
                this.context.clearRect(this.canvas.getBoundingClientRect().width - 700, this.canvas.getBoundingClientRect().height - 700, 300, 200);
            }
            const image = new Image();
            image.src = this.image;
            image.width = 300;
            image.height = 200;
            image.setAttribute('crossOrigin', 'Anonymous');
            image.onload = () => {
                if (window.screen.width > 480 && window.screen.width < 979) {
                    this.context.drawImage(image, this.canvas.getBoundingClientRect().width - 350, this.canvas.getBoundingClientRect().height - 350, 200, 150);
                } else {
                    this.context.drawImage(image, this.canvas.getBoundingClientRect().width - 700, this.canvas.getBoundingClientRect().height - 700, image.width, image.height);
                }
            };
        },
        _loadFile (pageUrl) {
            PDFJS.getDocument(pageUrl).promise.then(async (pdf) => {
                this.pdfDoc = pdf;
                this.pages = this.pdfDoc.numPages;
                await this._renderPage(1);
                await this.init();
            });
        },
        async _renderPage (num) {
            this.pdfDoc.getPage(num).then((page) => {
            const canvas = document.getElementById('the-canvas' + num);
            const vp = page.getViewport({ scale: 1 });
            if (canvas) {
                const ctx = canvas.getContext('2d');
                const dpr = window.devicePixelRatio || 1;
                const bsr = ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1;
                const ratio = dpr / bsr;
                const viewport = page.getViewport({ scale: window.innerWidth / vp.width });
                canvas.width = viewport.width * ratio;
                canvas.height = viewport.height * ratio;
                canvas.style.width = viewport.width + 'px';
                ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                page.render(renderContext);
                if (this.pages > num) {
                    this._renderPage(num + 1);
                }
                this.flag = true;
                this.$emit('showFlag', this.flag);
                }
            });
        },
        getContract () {
            window.pageYOffset = 0;
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            const loading = this.$loading({
                lock: true,
                text: '生成合同中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            const element = document.querySelector('#canvas-container');
            html2canvas(element, {
                allowTaint: true,
                useCORS: true
            }).then(async (canvas) => {
              console.log('canvas', canvas);
                let pageData = new Image();
                pageData.setAttribute('crossOrigin', 'Anonymous');
                pageData = canvas.toDataURL('image/jpeg', 1.0);
                console.log('pageData', pageData);
                loading.close();
                this.htmlUrl = pageData;
                const a = await this.dataURLtoFile(pageData, '合同');
                this.ossUpload(a);
            });
        },
        async ossUpload (file) {
          console.log(file);
            const res = await contractPolicy();
            const formData = new FormData();
            // eslint-disable-next-line
            new Promise((resolve) => {
                const oss1 = res.data.ossData;
                formData.append('key', oss1.dir + '/' + randomString(6));
                formData.append('dir', oss1.dir);
                formData.append('host', oss1.host);
                formData.append('policy', oss1.policy);
                formData.append('ossaccessKeyId', oss1.accessid);
                formData.append('signature', oss1.signature);
                formData.append('callback', oss1.callback);
                formData.append('file', file);
                resolve(true);
            }).then(() => {
                axios.post('http://testoss.puge.net', formData, {
                    'Content-Type': 'multipart/form-data'
                }).then(res => {
                    return new Promise((resolve, reject) => {
                        resolve(res.data);
                    });
                }).then(async (res) => {
                    const obj = {
                        contractComplete: res.ossData.filename,
                        id: this.id
                    };
                    await contractExamine(obj);
                    this.$message.info('提交审核成功');
                    this.$router.push({ path: '/compact/management' });
                })
                .catch(() => {
                    this.$message.error('签约失败');
                });
            });
        },
        dataURLtoFile (dataurl, filename) {
            if (!dataurl) {
                return;
            }
            const arr = dataurl.split(',');
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            try {
                return new File([u8arr], filename, { type: mime }, { uid: 1111111111111 });
            } catch (err) {
                // return this.dataURL2blob(dataurl);
            }
        }
    },
    watch: {
        image () {
            setTimeout(() => {
                this.canvasInit();
            }, 0);
        }
    }
};
</script>

<style lang="scss">
 .canvas-container{
     width: 100%;
     margin: 0 auto;
     .item {
        width: 100% !important;
    }
 }
 .qian {
     display: flex;
     justify-content: flex-end;
     align-content: center;
     margin-top: 50px;
     margin-right: 20%;
     margin-bottom: -38px;
 }
</style>
