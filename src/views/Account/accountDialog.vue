<template>
	<el-dialog width="60%" :close-on-click-modal="false" :before-close="handleClose" :show-close="true" :title="$t('account.modifyAccount')" :visible.sync="visible">
		<el-skeleton :loading="loading" animated :count="1">
			<template slot="template">
				<el-skeleton-item style="width: 100%; height: 267px" />
			</template>
			<template>
				<el-form :rules="rules" ref="ruleForm" :model="accountInfo" size="small" label-width="40px" class="mt35 mb35">
					<el-row :gutter="35">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
              <Upload @updatePhoto="updatePhoto" class="h100 account-upload">
											<img
												:src="
													accountInfo.pugeAvater
														? accountInfo.pugeAvater
														: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg'
												"
											/>
										</Upload>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mb20">
							<el-form-item prop="name" label-width="100px" :label="$t('account.nickName')">
								<el-input v-model="accountInfo.nickName" :placeholder="$t('account.pleaseUser')" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mb20">
							<el-form-item label-width="100px" :label="$t('account.pugeName')">
								<el-input
									v-model="accountInfo.pugeName"
									:placeholder="$t('account.pleasePugeName')"
									clearable
								></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mb20">
							<el-form-item label-width="100px" :label="$t('account.pugeSignature')">
								<el-input v-model="accountInfo.pugeSignature" :placeholder="$t('account.pleasePugeSignature')" clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mb20">
							<el-form-item label-width="100px" :label="$t('account.pugeSex')">
								<el-input v-model="accountInfo.pugeSex" :placeholder="$t('account.pleasePugeSex')" clearable></el-input>
							</el-form-item>
						</el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mb20">
							<el-form-item label-width="100px" :label="$t('account.pugeBirthday')">
                <el-date-picker
													class="w100"
													v-model="accountInfo.pugeBirthday"
													type="date"
													:placeholder="$t('account.pleasePugeBirthday')"
                          @change="change"
												></el-date-picker>
							</el-form-item>
						</el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mb20">
							<el-form-item prop="pugeEmail" label-width="100px" :label="$t('account.pugeEmail')">
								<el-input v-model="accountInfo.pugeEmail" :placeholder="$t('account.pleasePugeEmail')" clearable></el-input>
							</el-form-item>
						</el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mb20">
							<el-form-item prop="mobile" label-width="100px" :label="$t('account.phone')">
								<el-input v-model="accountInfo.mobile" :placeholder="$t('account.pleasePhone')" clearable></el-input>
							</el-form-item>
						</el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mb20">
							<el-form-item label-width="100px" :label="$t('account.schoolAge')">
								<!-- <el-input v-model="accountInfo.schoolAge" :placeholder="$t('account.pleaseSchoolAge')" clearable></el-input> -->
                <el-select
													v-model="accountInfo.schoolAge"
													:placeholder="$t('account.pleaseSchoolAge')"
													clearable
													class="w100"
												>
													<el-option label="大一" value="4"></el-option>
													<el-option label="大二" value="3"></el-option>
                          <el-option label="大三" value="2"></el-option>
                          <el-option label="大四" value="1"></el-option>
												</el-select>
							</el-form-item>
						</el-col>
            <!-- <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mb20">
							<el-form-item prop="mobile" label-width="100px" :label="$t('account.password')">
								<el-input type="password" v-model="accountInfo.password" :placeholder="$t('account.pleasePassword')" clearable></el-input>
							</el-form-item>
						</el-col> -->

						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
							<el-form-item>
								<el-button @click="updateAccount" type="primary" icon="el-icon-position">{{
									$t('account.updateAccountInformation')
								}}</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</template>
		</el-skeleton>
	</el-dialog>
</template>


<script>
import Upload from '~/components/Upload';
import { checkPhone, checkPgEmail } from '~/utils/validate';
import { mapGetters } from 'vuex';
import { accountGetInfo, accountPutInfo } from '~/api/personMessage';
import { toTime } from '~/utils/date/date';
export default {
	props: {
		// 弹窗变量
		visible: {
			type: Boolean,
			default: false
		},
    remoteClose: Function
	},
	components: {
		Upload
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	data () {
		return {
			loading: true,
			rules: {
				pugeEmail: [{ required: true, message: '请填写正确的邮箱', validator: checkPgEmail, trigger: 'blur' }],
				mobile: [{ required: true, message: '请填写手机号', validator: checkPhone, trigger: 'blur' }]
			},
      accountInfo: {}
		};
	},
	mounted () {
		this.loading = false;
    this.fetchData();
	},
	methods: {
    change (time) {
      this.accountInfo.pugeBirthday = toTime(time);
    },
    fetchData () {
			this.userInfo.uid &&
				accountGetInfo(this.userInfo.uid)
					.then((res) => {
						if (res.data.user) {
							this.accountInfo = res.data.user;
							this.loading = false;
						}
						this.loading = false;
					})
					.catch(() => {
						this.loading = false;
						// this.$message.error('数据加载失败');
					});
		},
    handleClose () {
      this.remoteClose();
    },
		updatePhoto (photo) {
        this.accountInfo.pugeAvater = photo;
        this.userInfo.uid &&
				accountPutInfo(this.accountInfo)
					.then(() => {
						this.$message({
							message: '修改成功',
							type: 'success'
						});
            this.fetchData();
					})
					.catch(() => {
						this.$message({
							message: '保存失败',
							type: 'error'
						});
					});
		},
    updateAccount () {
          this.userInfo.uid &&
				accountPutInfo(this.accountInfo)
					.then(() => {
            this.fetchData();
					})
					.catch(() => {
						this.$message({
							message: '保存失败',
							type: 'error'
						});
					});
    }
	}
};
</script>

<style scoped lang="scss">
.account-upload {
  text-align: center;
  img {
    width: 130px;
    height: 130px;
    border-radius: 50%;
  }
}
</style>
