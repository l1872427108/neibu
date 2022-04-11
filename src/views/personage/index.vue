<template>
  <el-dialog
    :fullscreen="true"
    width="90%"
    :close-on-click-modal="false"
    :before-close="handleClose"
    :show-close="true"
    :title="$t('person.personCenter')"
    :visible.sync="visible"
  >
    <div class="personal">
      <el-row>
        <el-col :xs="24" :sm="24">
          <el-card shadow="hover" :header="$t('person.personInfo')">
            <div class="personal-user">
              <div class="personal-user-left">
                <Upload class="personal-user-left-upload" @updatePhoto="updatePhoto">
                  <img
                    class="personal-user-left-upload"
                    :src="
                      personalForm.photo
                        ? personalForm.photo
                        : 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg'
                    "
                  >
                </Upload>
              </div>
              <div class="personal-user-right">
                <el-row>
                  <el-col
                    :span="24"
                    class="personal-title mb18"
                  >{{ $t(`person.${currentTime}`) }}，{{ personalForm.name }}，{{ $t('person.better') }}
                  </el-col>
                  <el-col :span="24">
                    <el-row>
                      <el-col :xs="24" :sm="16" class="personal-item mb6">
                        <div class="personal-item-label">{{ $t('person.nickName') }}：</div>
                        <div class="personal-item-value">{{ personalForm.name }}</div>
                      </el-col>
                      <el-col :xs="24" :sm="16" class="personal-item mb6">
                        <div class="personal-item-label">{{ $t('person.Birthday') }}：</div>
                        <div class="personal-item-value">{{ personalForm.pugeBirthday }}</div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="24">
                    <el-row>
                      <el-col :xs="24" :sm="16" class="personal-item mb6">
                        <div class="personal-item-label">{{ $t('person.phone') }}：</div>
                        <div class="personal-item-value">{{ personalForm.mobile }}</div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="24" class="mt18">
          <el-card shadow="hover" :header="$t('person.saying')">
            <el-row :gutter="15" class="personal-saying-row mb10">
              <el-col
                v-for="(v, k) in recommendList"
                :key="k"
                :xs="24"
                :sm="12"
                :md="12"
                :lg="6"
                :xl="6"
                class="personal-saying-col"
              >
                <div class="personal-saying" :style="{ 'background-color': v.bg }">
                  <i :class="v.icon" :style="{ color: v.iconColor }" />
                  <div class="personal-saying-auto">
                    <div>{{ $t(`person.${v.name}`) }}</div>
                    <div class="personal-saying-msg">{{ $t(`person.${v.content}`) }}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="24">
          <el-card shadow="hover" class="mt15 personal-edit" :header="$t('person.updateInfo')">
            <div class="personal-edit-title">{{ $t('person.basicInfo') }}</div>
            <el-form
              ref="ruleForm"
              :rules="rules"
              :model="personalForm"
              size="small"
              label-width="40px"
              class="mt35 mb35"
            >
              <el-row :gutter="35">
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="mb20">
                  <el-form-item prop="name" label-width="100px" :label="$t('person.nickName')">
                    <el-input
                      v-model="personalForm.name"
                      :placeholder="$t('person.pleaseUser')"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="mb20">
                  <el-form-item prop="pugeEmail" label-width="100px" :label="$t('person.email')">
                    <el-input
                      v-model="personalForm.pugeEmail"
                      :placeholder="$t('person.pleaseEmail')"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="mb20">
                  <el-form-item prop="mobile" label-width="100px" :label="$t('person.phone')">
                    <el-input
                      v-model="personalForm.mobile"
                      :placeholder="$t('person.pleasePhone')"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="mb20">
                  <el-form-item prop="nubmerInfo" label-width="100px" :label="$t('person.card')">
                    <el-input
                      v-model="personalForm.nubmerInfo"
                      :placeholder="$t('person.pleaseCard')"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="mb20">
                  <el-form-item prop="nativeInfo" label-width="100px" :label="$t('person.address')">
                    <el-input
                      v-model="personalForm.nativeInfo"
                      :placeholder="$t('person.pleaseAddress')"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="mb20">
                  <el-form-item prop="familyMoneyInfo" label-width="100px" :label="$t('person.situation')">
                    <!-- <el-input
													v-model="personalForm.familyMoneyInfo"
													:placeholder="$t('person.pleaseSituation')"
													clearable
												></el-input> -->
                    <el-select v-model="personalForm.familyMoneyInfo" clearable :placeholder="$t('person.pleaseSituation')">
                      <el-option label="一般" value="一般" />
                      <el-option label="良好" value="良好" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="mb20">
                  <el-form-item prop="familyNumber" label-width="100px" :label="$t('person.households')">
                    <!-- <el-input
													:min="1"
													:max="10"
													v-model="personalForm.familyNumber"
													:placeholder="$t('person.pleaseUser')"
													clearable
												></el-input> -->
                    <el-input-number v-model="personalForm.familyNumber" :placeholder="$t('person.pleaseUser')" controls-position="right" :min="1" :max="10" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="mb20">
                  <el-form-item prop="pugeNumber" label-width="100px" :label="$t('person.work')">
                    <el-input
                      v-model="personalForm.pugeNumber"
                      :disabled="true"
                      :placeholder="$t('person.pleaseWork')"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="mb20">
                  <el-form-item prop="yesnoInfo" label-width="100px" :label="$t('person.single')">
                    <el-select
                      v-model="personalForm.yesnoInfo"
                      :placeholder="$t('person.pleaseSingle')"
                      clearable
                      class="w100"
                    >
                      <el-option label="是" value="1" />
                      <el-option label="否" value="2" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="mb20">
                  <el-form-item prop="pugeBirthday" label-width="100px" :label="$t('person.Birthday')">
                    <el-date-picker
                      v-model="personalForm.pugeBirthday"
                      class="w100"
                      type="date"
                      :placeholder="$t('person.pleaseBirthday')"
                    />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" class="mb20">
                  <el-form-item prop="pugeSex" label-width="100px" :label="$t('person.gender')">
                    <el-select
                      v-model="personalForm.pugeSex"
                      :placeholder="$t('person.pleaseGender')"
                      clearable
                      class="w100"
                    >
                      <el-option label="男" value="1" />
                      <el-option label="女" value="2" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <el-form-item>
                    <el-button type="primary" icon="el-icon-position" @click="submitForm('ruleForm')">{{
                      $t('person.updatePersonalInformation')
                    }}</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import Upload from '~/components/Upload'
import { formatData, dateFormat, toTime } from '~/utils/date/date'
import { identity, checkPhone, checkEmail } from '~/utils/validate'
import { personPutInfo, personSearchInfo } from '~/api/personMessage'
import { mapGetters } from 'vuex'

export default {
  components: {
    Upload
  },
  props: {
    // 弹窗变量
    visible: {
      type: Boolean,
      default: false
    },
    remoteClose: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      loading: true,
      recommendList: [
        {
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
        }
      ],
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
        pugeEmail: [{ required: true, message: '请填写正确的邮箱', validator: checkEmail, trigger: 'blur' }],
        mobile: [{ required: true, message: '请填写手机号', validator: checkPhone, trigger: 'blur' }],
        nubmerInfo: [{ required: true, validator: identity, message: '请填写正确的证件号码', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    currentTime() {
      return formatData(new Date())
    },
    currentDate() {
      return dateFormat(new Date())
    }
  },
  mounted() {
    // console.log('personageDialog')
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.userInfo.uid && personSearchInfo(this.userInfo.uid)
        .then((res) => {
          if (res.data.peopleInfo) {
            this.personalForm = res.data.peopleInfo
            this.loading = false
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
          this.$message.error('数据加载失败')
        })
    },
    submitForm() {
      this.personalForm.pugeBirthday = toTime(this.personalForm.pugeBirthday)
      this.updateData()
    },
    updatePhoto(photo) {
      this.personalForm.photo = photo
      this.updateData()
    },
    updateData() {
      this.userInfo.uid && personPutInfo(this.personalForm, this.userInfo.uid)
        .then(() => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.fetchData()
        })
        .catch(() => {
          this.$message({
            message: '保存失败',
            type: 'error'
          })
        })
    },

    handleClose() {
      this.remoteClose()
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/styles/mixins/mixin';
.personal {
	.personal-user {
		display: flex;
		align-items: center;
		.personal-user-left {
			border-radius: 3px;
			.personal-user-left-upload {
				img {
					width: 150px;
					height: 150px;
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
