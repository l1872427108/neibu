<template>
	<el-dialog title="今日完成" :visible.sync="dialogTableVisible" :before-close="handleClose"  class="dialog">
		<Upload
			style="margin: 32px"
			:extend="extend"
			:className="className"
			@updatePhoto="updatePhoto"
			:imageUrl="updata.voucher"
			:UploadId="updata.UploadId"
		/>
		<el-button type="primary" @click="complete()" class="right">提 交</el-button>
	</el-dialog>
</template>

<script>
import Upload from '~/components/Upload';
import { completeTask } from '~/api/taskCenter';
export default {
	components: {
		Upload,
	},
	props: {
		dialogTableVisible: {
			type: Boolean,
			defalut: false,
		},
		UploadId: {
			type: String,
			required: true,
		},
		handleClose:Function
	},
	created() {
		console.log(this.UploadId)
	},
	data() {
		return {
			// 格式和样式
			extend: '.jpg,.png',
			className: 'avatar-uploader',
			updata: {
				id:'',
				state: '1',
				voucher: '',
			},
		};
	},
	methods: {
		updatePhoto(img) {
			this.updata.voucher = img;
			console.log(this.updata.voucher);
		},
		// 提交按钮
		complete() {
			this.updata.id = this.UploadId
			// this.updata.voucher = this.img
			// id state  voucher
			console.log(this.updata.id);
			console.log(this.updata.state);
			console.log(this.updata.voucher);
			console.log(this.updata);
			completeTask(this.updata).then((response) => {
				this.resp = response.data;
			});
			this.Close()
		},
		// 关闭弹窗并清空
		Close(){
			this.handleClose()
			this.updata={
				id:'',
				voucher: '',
				state: '1',
			}
		}
	},
};
</script>
<style scoped>
.right {
	margin: 30px 20px 20px 200px;
}
.dialog {
	margin: 0 auto;
	width: 620px;
}
</style>
