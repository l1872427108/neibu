
<template>
	<div class="account">
		<el-row class="row">
			<el-skeleton style="width: 100%" :loading="loading" animated :count="1">
				<template slot="template">
					<el-skeleton-item style="width: 100%; height: 267px" />
				</template>
				<template>
					<el-col :xs="24" :sm="24">
						<el-card shadow="hover" :header="$t('account.accountInfo')">
							<div class="personal-user">
								<div class="personal-user-left">
										<img
											:src="
												accountInfo.pugeAvater
													? accountInfo.pugeAvater
													: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg'
											"
										/>
								</div>
								<div class="personal-user-right" ref="acc">
									<el-row>
										<el-col :span="24" class="personal-title mb18"
											>{{ $t(`person.${currentTime}`) }},  {{ accountInfo.nickName }}   {{ `, ${accountInfo.pugeSignature}` }}
										</el-col>
										<el-col :span="24">
											<el-row>
												<el-col :xs="24" :sm="12" class="personal-item mb6">
													<div class="personal-item-label">{{ $t('account.nickName') }}：</div>
													<div class="personal-item-value">{{ accountInfo.nickName }}</div>
												</el-col>
                        <el-col :xs="24" :sm="12" class="personal-item mb6">
													<div class="personal-item-label">{{ $t('account.pugeName') }}：</div>
													<div class="personal-item-value">{{ accountInfo.pugeName }}</div>
												</el-col>
                        <el-col :xs="24" :sm="12" class="personal-item mb6">
													<div class="personal-item-label">{{ $t('account.pugeNumber') }}：</div>
													<div class="personal-item-value">{{ accountInfo.pugeNumber }}</div>
												</el-col>
                         <el-col :xs="24" :sm="12" class="personal-item mb6">
													<div class="personal-item-label">{{ $t('account.phone') }}：</div>
													<div class="personal-item-value">{{ accountInfo.mobile }}</div>
												</el-col>
                        <el-col :xs="24" :sm="12" class="personal-item mb6">
													<div class="personal-item-label">{{ $t('account.schoolAge') }}：</div>
													<div class="personal-item-value">{{ accountInfo.schoolAge | schoolAge }}</div>
												</el-col>
												<el-col :xs="24" :sm="12" class="personal-item mb6">
													<div class="personal-item-label">{{ $t('account.pugeSex') }}：</div>
													<div class="personal-item-value">{{ accountInfo.pugeSex }}</div>
												</el-col>
                        <el-col :xs="24" :sm="12" class="personal-item mb6">
													<div class="personal-item-label">{{ $t('account.pugeBirthday') }}：</div>
													<div class="personal-item-value">{{ accountInfo.pugeBirthday }}</div>
												</el-col>
												<el-col :xs="24" :sm="12" class="personal-item mb6">
													<div class="personal-item-label">{{ $t('account.pugeEmail') }}：</div>
													<div class="personal-item-value">{{ accountInfo.pugeEmail }}</div>
												</el-col>
												<el-col :xs="24" :sm="12" class="personal-item mb6">
													<div class="personal-item-label">{{ $t('person.time') }}：</div>
													<div class="personal-item-value">{{ currentDate }}</div>
												</el-col>
											</el-row>
										</el-col>
									</el-row>
								</div>
							</div>
						</el-card>
					</el-col>
				</template>
			</el-skeleton>
		</el-row>
	</div>
</template>

<script>
import { formatData, dateFormat } from '~/utils/date/date';
import { mapGetters } from 'vuex';
import { accountGetInfo } from '~/api/personMessage';
import { schoolAge } from '~/filters/filter';
export default {
	computed: {
		...mapGetters(['userInfo']),
		currentTime () {
			return formatData(new Date());
		},
		currentDate () {
			return dateFormat(new Date());
		}
	},
  filters: {
    schoolAge
  },
	data () {
		return {
			loading: true,
      accountInfo: {}
		};
	},
	mounted () {
    console.log('Account');
		this.loading = false;
    this.fetchData();
	},
  methods: {
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
						this.$message.error('数据加载失败');
					});
		}
  }
};
</script>

<style scoped lang="scss">
@import '~/styles/mixins/mixin';
.account {
	.account-logo-img {
		width: 150px;
		height: 70px;
	}
	.row {
		margin-top: 100px;
	}
	.personal-user {
		display: flex;
		align-items: center;
		.personal-user-left {
			width: 200px;
			border-radius: 3px;
			margin-right: 20px;
			img {
					width: 100%;
					border-radius: 3px;
			}
      &:hover {
					img {
						animation: logoAnimation 0.3s ease-in-out;
					}
				}
		}
		.personal-user-right {
			flex: 1;
			padding: 0 15px;
		}
		.personal-title {
			font-size: 18px;
			@include text-ellipsis(1);
		}
		.personal-item {
			display: flex;
			align-items: center;
			font-size: 13px;
			.personal-item-label {
				color: var(--variable--color-fontcolor);
				@include text-ellipsis(1);
			}
			.personal-item-value {
				@include text-ellipsis(1);
			}
		}
	}
}
</style>
