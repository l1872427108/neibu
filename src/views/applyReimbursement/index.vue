<template>
	<div>
		<el-button icon="el-icon-search" type="primary" @click="AddData" style="margin-bottom:20px;">添加报销单</el-button>

		<el-table :data="list" border stripe style="width: 100%">
			<el-table-column align="center" type="index" :label="$t('apply.serialNumber')" width="60" />
			<el-table-column align="center" prop="name" :label="$t('apply.fullName')" />
			<el-table-column align="center" prop="applyProject" :label="$t('apply.reimbursement')" />
			<el-table-column align="center" prop="applyMoney" :label="$t('apply.money')" />
			<el-table-column align="center" prop="department" :label="$t('apply.department')" />
			<el-table-column align="center" prop="payPicture" :label="$t('apply.voucher')">
				<template slot-scope="scope">
					<img
						:src="scope.row.payPicture ? scope.row.payPicture : 'https://project-resources.puge.net/WechatIMG111.jpeg'"
						style="width: 80px; height: 80px"
					/>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="payerQrcode" :label="$t('apply.code')">
				<template slot-scope="scope">
					<img
						:src="scope.row.payerQrcode ? scope.row.payerQrcode : 'https://project-resources.puge.net/WechatIMG111.jpeg'"
						style="width: 80px; height: 80px"
					/>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="auditStatus" :label="$t('apply.AuditStatus')">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.auditStatus == 1" type="success">已通过</el-tag>
					<el-tag v-if="scope.row.auditStatus == 0" type="danger">未通过</el-tag>
					<el-tag v-if="scope.row.auditStatus == 2" type="warning">审计中</el-tag>
				</template>
			</el-table-column>

			<el-table-column align="center" prop="ifBepaied" :label="$t('apply.Reimbursement')">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.ifBepaied == 1" type="success">已报销</el-tag>
					<el-tag v-if="scope.row.ifBepaied == 0" type="danger">未报销</el-tag>
					<el-tag v-if="scope.row.auditStatus == 2" type="warning">报销中</el-tag>
				</template>
			</el-table-column>
		</el-table>

		<AddVisible :FromVisible="FromVisible" :handleClose="handleClose" />
	</div>
</template>

<script>
import AddVisible from './AddVisible.vue';
import { UserIdSearch } from '~/api/applyReimbursement';
import { Cookie, Key } from '~/utils/cache/cookie';
export default {
	name: 'PugeCInsideInfoFrontIndex',

	data () {
		return {
			FromVisible: false,
			list: []
		};
	},
	components: {
		AddVisible
	},
	created () {
		// console.log(JSON.parse(Cookie.get(Key.userInfoKey)));
		this.SearchData();
	},
    computed: {
		userId () {
			return JSON.parse(Cookie.get(Key.userInfoKey)).uid;
		}
	},
	methods: {
		SearchData () {
			UserIdSearch(this.userId).then((res) => {
				// console.log(res);
				this.list = res.data.applyList;
			});
		},

		AddData () {
			this.FromVisible = true;
		},
		handleClose () {
			this.FromVisible = false;
			this.SearchData();
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
