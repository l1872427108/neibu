<template>
  <div class="personal">
    <el-row>
        <el-col :xs="24" :sm="16">
            <el-card shadow="hover" header="个人信息">
                <div class="personal-user">
                    <div class="personal-user-left">
                        <Upload @updatePhoto="updatePhoto" class="h100 personal-user-left-upload">
                            <img class="personal-user-left-upload" :src="personalForm.photo ? personalForm.photo : 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg'" />
                        </Upload>
                    </div>
                    <div class="personal-user-right">
                        <el-row>
                            <el-col :span="24" class="personal-title mb18">{{ currentTime }}，{{userInfo.nickName}}，生活变的再糟糕，也不妨碍我变得更好！ </el-col>
                            <el-col :span="24">
                                <el-row>
                                    <el-col :xs="24" :sm="8" class="personal-item mb6">
                                        <div class="personal-item-label">昵称：</div>
                                        <div class="personal-item-value">{{userInfo.nickName}}</div>
                                    </el-col>
                                    <el-col :xs="24" :sm="16" class="personal-item mb6">
                                        <div class="personal-item-label">用户名：</div>
                                        <div class="personal-item-value">{{userInfo.username}}</div>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="24">
                                <el-row>
                                    <el-col :xs="24" :sm="8" class="personal-item mb6">
                                        <div class="personal-item-label">手机号：</div>
                                        <div class="personal-item-value">{{userInfo.mobile}}</div>
                                    </el-col>
                                    <el-col :xs="24" :sm="16" class="personal-item mb6">
                                        <div class="personal-item-label">登录时间：</div>
                                        <div class="personal-item-value">{{currentDate}}</div>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-card>
        </el-col>
        <el-col :xs="24" :sm="8" class="pl15 personal-info">
				<el-card shadow="hover">
					<template #header>
						<span>消息通知</span>
						<span class="personal-info-more">更多</span>
					</template>
					<div class="personal-info-box">
						<ul class="personal-info-ul">

						</ul>
					</div>
				</el-card>
			</el-col>
        <el-col :span="24" class="mt18">
            <el-card shadow="hover" header="经典语录">
                <el-row :gutter="15" class="personal-saying-row mb10">
                    <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-for="(v, k) in recommendList" :key="k" class="personal-saying-col">
                        <div class="personal-saying" :style="{ 'background-color': v.bg }">
                            <i :class="v.icon" :style="{ color: v.iconColor }"></i>
                            <div class="personal-saying-auto">
                                <div>{{ v.name }} --- {{v.comeFrom}}</div>
                                <!-- <div>{{ v.comeFrom }}</div> -->
                                <div class="personal-saying-msg">{{v.content}}</div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
        <el-col :span="24">
            <el-card shadow="hover" class="mt15 personal-edit" header="更新信息">
                <div class="personal-edit-title">基本信息</div>
                <el-form :rules="rules" ref="ruleForm" :model="personalForm" size="small" label-width="40px" class="mt35 mb35">
                    <el-row :gutter="35">
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
                            <el-form-item prop="name" label-width="100px" label="昵称">
                                <el-input v-model="personalForm.name" placeholder="请输入昵称" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
                            <el-form-item prop="pugeEmail" label-width="100px" label="邮箱">
                                <el-input v-model="personalForm.pugeEmail" placeholder="请输入邮箱" clearable></el-input>
                            </el-form-item>
						</el-col>
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
                            <el-form-item prop="mobile" label-width="100px" label="手机">
                                <el-input v-model="personalForm.mobile" placeholder="请输入手机" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
                            <el-form-item prop="nubmerInfo" label-width="100px" label="身份证">
                                <el-input v-model="personalForm.nubmerInfo" placeholder="请输入身份证" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
                            <el-form-item prop="nativeInfo" label-width="100px" label="家庭地址">
                                <el-input v-model="personalForm.nativeInfo" placeholder="请输入家庭地址" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
                            <el-form-item prop="familyMoneyInfo" label-width="100px" label="家庭状况">
                                <el-input v-model="personalForm.familyMoneyInfo" placeholder="请输入家庭状况" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
                            <el-form-item prop="familyNumber" label-width="100px" label="家庭人数">
                                <el-input :min="1" :max="10" v-model="personalForm.familyNumber" placeholder="请输入家庭人数" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
                            <el-form-item prop="pugeNumber" label-width="100px" label="普歌工号">
                                <el-input v-model="personalForm.pugeNumber" placeholder="请输入普歌工号" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
                            <el-form-item prop="yesnoInfo" label-width="100px" label="是否单亲">
                                <el-select v-model="personalForm.yesnoInfo" placeholder="是否单亲" clearable class="w100">
                                    <el-option label="是" value="1"></el-option>
                                    <el-option label="否" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
                            <el-form-item prop="pugeBirthday" label-width="100px" label="生日">
                                <el-date-picker class="w100" v-model="personalForm.pugeBirthday" type="date" placeholder="请输入生日"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
                            <el-form-item prop="pugeSex" label-width="100px" label="性别">
                                <el-select v-model="personalForm.pugeSex" placeholder="请选择性别" clearable class="w100">
                                    <el-option label="男" value="1"></el-option>
                                    <el-option label="女" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item>
                                <el-button @click="submitForm('ruleForm')" type="primary" icon="el-icon-position">更新个人信息</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import Upload from '~/components/Upload';
import { formatData, dateFormat } from '~/utils/date';
import { identity, checkPhone, checkEmail } from '~/utils/validate';
import { personPutInfo, personSearchInfo, personUpdatePhoto } from '~/api/personMessage';
import { mapGetters } from 'vuex';
export default {
    components: {
        Upload
    },
    computed: {
        currentTime () {
            return formatData(new Date());
        },
        ...mapGetters(['userInfo']),
        currentDate () {
            return dateFormat(new Date());
        }
    },
    data () {
        return {
            recommendList: [{
                icon: 'el-icon-food',
                bg: '#48D18D',
                iconColor: '#64d89d',
                name: '颜渊',
                comeFrom: '论语',
                content: '君子心地平坦宽广，小人却经常局促忧愁。君子襟怀坦白，安贫乐业，与人为善，知足常乐，所以能坦荡荡。小人欲念太多，患得患失，忧心忡忡，怨天尤人，局促不安，所以常心怀戚戚。'

            },
            {
                icon: 'el-icon-shopping-bag-1',
                bg: '#F95959',
                iconColor: '#F86C6B',
                name: '荀子',
                comeFrom: '劝学',
                content: '木料经过木工用墨线（木工用具）划直线加工以后，就变直了；金属物品在磨刀石上磨砺后，就能锋利。人经过学习磨练，自我反省，就会变得聪慧明智，不犯错误，也越来越坚强。'
            },
            {
                icon: 'el-icon-school',
                bg: '#8595F4',
                iconColor: '#92A1F4',
                name: '老子',
                comeFrom: '第六十四章',
                content: '千里遥远的路程是从脚下第一步开始的。任何事情的成功都是从头开始，从小到大逐渐积累的。万事开头难，没有个开头就不会有结果。任何事情都要从一点一滴的小事开始做起。'
            },
            {
                icon: 'el-icon-alarm-clock',
                bg: '#FEBB50',
                iconColor: '#FDC566',
                name: '朱熹',
                    comeFrom: '训学斋规',
                    content: '读书有三到，谓心到，眼到，口到。心不在此，则眼看不仔细，心眼既不专一，却只漫浪诵读，决不能记，久也不能久也。三到之中，心到最急，心既到矣，眼口岂不到乎？'
            }],
            personalForm: {},
            rules: {
                name: [
                { required: true, message: '请输入姓名', trigger: 'blur' },
                {
                    min: 2,
                    max: 5,
                    message: '长度在 2 到 5 个字符',
                    trigger: 'blur'
                }
                ],
                pugeEmail: [{ required: true, message: '请填写正确的邮箱', validator: checkEmail, trigger: 'blur' }],
                mobile: [{ required: true, message: '请填写手机号', validator: checkPhone, trigger: 'blur' }],
                nubmerInfo: [{ required: true, validator: identity, message: '请填写正确的证件号码', trigger: 'blur' }],
                nativeInfo: [{ required: true, message: '请填写家庭地址', trigger: 'blur' }],
                familyMoneyInfo: [{ required: true, message: '请填写家庭状况', trigger: 'blur' }],
                familyNumber: [{ required: true, message: '请填写家庭人数', trigger: 'blur' }],
                pugeSex: [{ required: true, message: '请填写性别', trigger: 'blur' }],
                pugeBirthday: [
                    {
                        required: true,
                        // type: 'date',
                        message: '请选择日期',
                        trigger: 'change'
                    }
                ]
            }
        };
    },
    mounted () {
        this.fetchData();
        console.log('www');
    },
    methods: {
        fetchData () {
            this.userInfo.uid && personSearchInfo(this.userInfo.uid)
            .then(res => {
                this.personalForm = res.data.peopleInfo;
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
    .personal-info {
		.personal-info-more {
			float: right;
			color: var(--variable--color-primary);
			font-size: 13px;
			&:hover {
				color: var(--variable--color-primary);
				cursor: pointer;
			}
		}
		.personal-info-box {
			height: 130px;
			overflow: hidden;
			.personal-info-ul {
				list-style: none;
				.personal-info-li {
					font-size: 13px;
					padding-bottom: 10px;
					.personal-info-li-title {
						display: inline-block;
						@include text-ellipsis(1);
						color: var(--variable--color-primary);
						text-decoration: none;
					}
					& a:hover {
						color: var(--variable--color-primary);
						cursor: pointer;
					}
				}
			}
		}
	}
    .personal-saying-row {
		.personal-saying-col {
			.personal-saying {
				position: relative;
				height: 130px;
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
                    /* justify-items: center; */
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
