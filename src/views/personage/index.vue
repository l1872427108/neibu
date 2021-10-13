<template>
  <div class="personal">
    <el-row>
        <el-skeleton style="width:100%;" :loading="loading" animated :count="1">
            <template slot="template">
            <el-skeleton-item
                style="width: 100%; height: 267px;"
            />
            </template>
            <template>
                <el-col :xs="24" :sm="24">
            <el-card shadow="hover" :header="$t('person.personInfo')">
                <div class="personal-user">
                    <div class="personal-user-left">
                        <Upload @updatePhoto="updatePhoto" class="h100 personal-user-left-upload">
                            <img class="personal-user-left-upload" :src="personalForm.photo ? personalForm.photo : 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg'" />
                        </Upload>
                    </div>
                    <div class="personal-user-right">
                        <el-row>
                            <el-col :span="24" class="personal-title mb18">{{ $t(`person.${currentTime}`) }}，{{userInfo.nickName}}，{{$t('person.better')}} </el-col>
                            <el-col :span="24">
                                <el-row>
                                    <el-col :xs="24" :sm="8" class="personal-item mb6">
                                        <div class="personal-item-label">{{$t('person.nickName')}}：</div>
                                        <div class="personal-item-value">{{userInfo.nickName}}</div>
                                    </el-col>
                                    <el-col :xs="24" :sm="16" class="personal-item mb6">
                                        <div class="personal-item-label">{{$t('person.username')}}：</div>
                                        <div class="personal-item-value">{{userInfo.username}}</div>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="24">
                                <el-row>
                                    <el-col :xs="24" :sm="8" class="personal-item mb6">
                                        <div class="personal-item-label">{{$t('person.phone')}}：</div>
                                        <div class="personal-item-value">{{userInfo.mobile}}</div>
                                    </el-col>
                                    <el-col :xs="24" :sm="16" class="personal-item mb6">
                                        <div class="personal-item-label">{{$t('person.time')}}：</div>
                                        <div class="personal-item-value">{{currentDate}}</div>
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
        <el-skeleton style="width:100%;" :loading="loading" animated :count="1">
            <template slot="template">
            <el-skeleton-item
                style="width: 100%; height: 267px;"
            />
            </template>
            <template>
                <el-col :span="24" class="mt18">
            <el-card shadow="hover" :header="$t('person.saying')">
                <el-row :gutter="15" class="personal-saying-row mb10">
                    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-for="(v, k) in recommendList" :key="k" class="personal-saying-col">
                        <div class="personal-saying" :style="{ 'background-color': v.bg }">
                            <i :class="v.icon" :style="{ color: v.iconColor }"></i>
                            <div class="personal-saying-auto">
                                <div>{{ $t(`person.${v.name}`) }}</div>
                                <div class="personal-saying-msg">{{$t(`person.${v.content}`)}}</div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
            </template>
        </el-skeleton>
        <el-skeleton style="width:100%;" :loading="loading" animated :count="1">
            <template slot="template">
            <el-skeleton-item
                style="width: 100%; height: 267px;"
            />
            </template>
            <template>
                <el-col :span="24">
            <el-card shadow="hover" class="mt15 personal-edit" :header="$t('person.updateInfo')">
                <div class="personal-edit-title">{{$t('person.basicInfo')}}</div>
                <el-form :rules="rules" ref="ruleForm" :model="personalForm" size="small" label-width="40px" class="mt35 mb35">
                    <el-row :gutter="35">
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="mb20">
                            <el-form-item prop="name" label-width="100px" :label="$t('person.nickName')">
                                <el-input v-model="personalForm.name" :placeholder="$t('person.pleaseUser')" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="mb20">
                            <el-form-item prop="pugeEmail" label-width="100px" :label="$t('person.email')">
                                <el-input v-model="personalForm.pugeEmail" :placeholder="$t('person.pleaseEmail')" clearable></el-input>
                            </el-form-item>
						</el-col>
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="mb20">
                            <el-form-item prop="mobile" label-width="100px" :label="$t('person.phone')">
                                <el-input v-model="personalForm.mobile" :placeholder="$t('person.pleasePhone')" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="mb20">
                            <el-form-item prop="nubmerInfo" label-width="100px" :label="$t('person.card')">
                                <el-input v-model="personalForm.nubmerInfo" :placeholder="$t('person.pleaseCard')" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="mb20">
                            <el-form-item prop="nativeInfo" label-width="100px" :label="$t('person.address')">
                                <el-input v-model="personalForm.nativeInfo" :placeholder="$t('person.pleaseAddress')" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="mb20">
                            <el-form-item prop="familyMoneyInfo" label-width="100px" :label="$t('person.situation')">
                                <el-input v-model="personalForm.familyMoneyInfo" :placeholder="$t('person.pleaseSituation')" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="mb20">
                            <el-form-item prop="familyNumber" label-width="100px" :label="$t('person.households')">
                                <el-input :min="1" :max="10" v-model="personalForm.familyNumber" :placeholder="$t('person.pleaseUser')" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="mb20">
                            <el-form-item prop="pugeNumber" label-width="100px" :label="$t('person.work')">
                                <el-input v-model="personalForm.pugeNumber" :placeholder="$t('person.pleaseWork')" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="mb20">
                            <el-form-item prop="yesnoInfo" label-width="100px" :label="$t('person.single')">
                                <el-select v-model="personalForm.yesnoInfo" :placeholder="$t('person.pleaseSingle')" clearable class="w100">
                                    <el-option label="是" value="1"></el-option>
                                    <el-option label="否" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="mb20">
                            <el-form-item prop="pugeBirthday" label-width="100px" :label="$t('person.birthday')">
                                <el-date-picker class="w100" v-model="personalForm.pugeBirthday" type="date" :placeholder="$t('person.pleaseBirthday')"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="mb20">
                            <el-form-item prop="pugeSex" label-width="100px" :label="$t('person.gender')">
                                <el-select v-model="personalForm.pugeSex" :placeholder="$t('person.pleaseGender')" clearable class="w100">
                                    <el-option label="男" value="1"></el-option>
                                    <el-option label="女" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item>
                                <el-button @click="submitForm('ruleForm')" type="primary" icon="el-icon-position">{{$t('person.updatePersonalInformation')}}</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
        </el-col>
            </template>
        </el-skeleton>
    </el-row>
  </div>
</template>

<script>
import Upload from '~/components/Upload';
import { formatData, dateFormat } from '~/utils/date/date';
import { identity, checkPhone, checkEmail } from '~/utils/validate';
import { personPutInfo, personSearchInfo, personUpdatePhoto } from '~/api/personMessage';
import { mapGetters } from 'vuex';
export default {
    components: {
        Upload
    },
    computed: {
        ...mapGetters(['userInfo']),
        currentTime () {
            return formatData(new Date());
        },
        currentDate () {
            return dateFormat(new Date());
        }
    },
    data () {
        return {
            loading: true,
            recommendList: [{
                icon: 'el-icon-food',
                bg: '#48D18D',
                iconColor: '#64d89d',
                name: 'quotesOnePerson',
                content: 'quotesOne'

            },
            {
                icon: 'el-icon-shopping-bag-1',
                bg: '#F95959',
                iconColor: '#F86C6B',
                name: 'quotesTwoPerson',
                content: 'quotesTwo'
            },
            {
                icon: 'el-icon-school',
                bg: '#8595F4',
                iconColor: '#92A1F4',
                name: 'quotesThreePerson',
                content: 'quotesThree'
            },
            {
                icon: 'el-icon-alarm-clock',
                bg: '#FEBB50',
                iconColor: '#FDC566',
                name: 'quotesFourPerson',
                content: 'quotesFour'
            }],
            personalForm: {
                name: '',
                pugeEmail: '',
                mobile: '',
                nubmerInfo: '',
                nativeInfo: '',
                familyMoneyInfo: '',
                familyNumber: '',
                pugeNumber: '',
                yesnoInfo: '',
                pugeBirthday: '',
                pugeSex: ''
            },
            rules: {
                name: [{ required: true, message: '请输入姓名', trigger: 'blur' }, { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }],
                pugeEmail: [{ required: true, message: '请填写正确的邮箱', validator: checkEmail, trigger: 'blur' }],
                mobile: [{ required: true, message: '请填写手机号', validator: checkPhone, trigger: 'blur' }],
                nubmerInfo: [{ required: true, validator: identity, message: '请填写正确的证件号码', trigger: 'blur' }],
                nativeInfo: [{ required: true, message: '请填写家庭地址', trigger: 'blur' }],
                familyMoneyInfo: [{ required: true, message: '请填写家庭状况', trigger: 'blur' }],
                familyNumber: [{ required: true, message: '请填写家庭人数', trigger: 'blur' }],
                pugeSex: [{ required: true, message: '请填写性别', trigger: 'blur' }],
                pugeBirthday: [{ required: true, type: 'date', message: '请选择日期', trigger: 'blur' }]
            }
        };
    },
    mounted () {
        this.fetchData();
    },
    methods: {
        fetchData () {
            this.userInfo.uid && personSearchInfo(this.userInfo.uid)
            .then(res => {
                this.personalForm = res.data.peopleInfo;
                this.loading = false;
            }).catch(() => {
                this.$message.erro('数据加载失败');
            });
        },
        submitForm (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.submitData();
                } else {
                    this.$message.info('完善个人信息');
                    return false;
                }
            });
        },
        submitData () {
            this.userInfo.uid && personPutInfo(this.personalForm, this.userInfo.uid).then(res => {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                this.fetchData();
            }).catch(() => {
                this.$message({
                    message: '保存失败,请重新输入',
                    type: 'error'
                });
            });
        },
        updatePhoto (photo) {
            this.personalForm.photo = photo;
            this.photo = photo;
            this.userInfo.uid && personUpdatePhoto(this.userInfo.uid, photo).then(res => {
                console.log(res);
            });
        }
    }
};
</script>

<style scoped lang="scss">
@import '~/styles/mixins/mixin';
.personal {
    .personal-user {
        height: 130px;
		display: flex;
		align-items: center;
        .personal-user-left {
            width: 100px;
			height: 130px;
			border-radius: 3px;
            .personal-user-left-upload {
                margin-right: 100px !important;
				img {
					width: 100%;
					height: 100%;
					border-radius: 3px;

				}
				&:hover {
					img {
						animation: logoAnimation 0.3s ease-in-out;
					}
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
    .personal-saying-row {
		.personal-saying-col {
			.personal-saying {
				position: relative;
				height: 120px;
				color: var(--variable--color-fontcolor);
				border-radius: 3px;
				overflow: hidden;
				cursor: pointer;
				&:hover {
					i {
						right: 0px !important;
						bottom: 0px !important;
						transition: all ease 0.3s;
					}
				}
				i {
					position: absolute;
					right: -10px;
					bottom: -10px;
					font-size: 70px;
					transform: rotate(-30deg);
					transition: all ease 0.3s;
				}
				.personal-saying-auto {
					padding: 10px;
					position: absolute;
					left: 0;
					top: 3%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
					.personal-saying-msg {
						font-size: 12px;
						margin-top: 5px;
					}
				}
			}
		}
	}
	.personal-edit {
		.personal-edit-title {
			position: relative;
			padding-left: 10px;
			color: var(--variable--color-primary);
			&::after {
				content: '';
				width: 2px;
				height: 10px;
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				background: var(--variable--color-primary);
			}
		}
		.personal-edit-safe-box {
			border-bottom: 1px solid var(--variable--color-bg);
			padding: 15px 0;
			.personal-edit-safe-item {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.personal-edit-safe-item-left {
					flex: 1;
					overflow: hidden;
					.personal-edit-safe-item-left-label {
						color: var(--variable--color-primary);
						margin-bottom: 5px;
					}
					.personal-edit-safe-item-left-value {
						color: var(--variable--color-primary);
						@include text-ellipsis(1);
						margin-right: 15px;
					}
				}
			}
			&:last-of-type {
				padding-bottom: 0;
				border-bottom: none;
			}
		}
	}
}
</style>
