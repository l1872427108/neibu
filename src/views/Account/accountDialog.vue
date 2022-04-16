<template>
  <el-dialog width="75%" :close-on-click-modal="false" :before-close="handleClose" :show-close="true" :title="$t('account.modifyAccount')" :visible.sync="visible">
    <el-form ref="ruleForm" :rules="rules" :model="accountInfo" size="small" label-width="40px" class="mt35 mb35">
      <el-row :gutter="35">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
          <Upload class="h100 account-upload" @updatePhoto="updatePhoto">
            <img
              :src="
                accountInfo.pugeAvater || 'https://project-resources.puge.net/WechatIMG111.jpeg'
              "
              onerror="onerror=null;src='https://project-resources.puge.net/WechatIMG111.jpeg'"
            >
          </Upload>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mb20">
          <el-form-item prop="name" label-width="100px" :label="$t('account.nickName')">
            <el-input v-model="accountInfo.nickName" :placeholder="$t('account.pleaseUser')" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mb20">
          <el-form-item label-width="100px" :label="$t('account.pugeName')">
            <el-input
              v-model="accountInfo.pugeName"
              :placeholder="$t('account.pleasePugeName')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mb20">
          <el-form-item label-width="100px" :label="$t('account.pugeSignature')">
            <el-input v-model="accountInfo.pugeSignature" :placeholder="$t('account.pleasePugeSignature')" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mb20">
          <el-form-item label-width="100px" :label="$t('account.pugeSex')">
            <el-input v-model="accountInfo.pugeSex" :placeholder="$t('account.pleasePugeSex')" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mb20">
          <el-form-item label-width="100px" :label="$t('account.pugeBirthday')">
            <el-date-picker
              v-model="accountInfo.pugeBirthday"
              class="w100"
              type="date"
              :placeholder="$t('account.pleasePugeBirthday')"
              @change="change"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mb20">
          <el-form-item prop="pugeEmail" label-width="100px" :label="$t('account.pugeEmail')">
            <el-input v-model="accountInfo.pugeEmail" :placeholder="$t('account.pleasePugeEmail')" clearable />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" class="mb20">
          <el-form-item prop="mobile" label-width="100px" :label="$t('account.phone')">
            <el-input v-model="accountInfo.mobile" :placeholder="$t('account.pleasePhone')" clearable />
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
              <el-option label="大一" value="4" />
              <el-option label="大二" value="3" />
              <el-option label="大三" value="2" />
              <el-option label="大四" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-form-item>
            <el-button type="primary" icon="el-icon-position" @click="updateAccount">{{
              $t('account.updateAccountInformation')
            }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import Upload from '~/components/Upload'
import { checkPhone, checkPgEmail } from '~/utils/validate'
import { mapGetters } from 'vuex'
import { accountGetInfo, accountPutInfo } from '~/api/personMessage'
import { toTime } from '~/utils/date/date'
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
      rules: {
        pugeEmail: [{ required: true, message: '请填写正确的邮箱', validator: checkPgEmail, trigger: 'blur' }],
        mobile: [{ required: true, message: '请填写手机号', validator: checkPhone, trigger: 'blur' }]
      },
      accountInfo: {}
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    this.loading = false
    this.fetchData()
  },
  methods: {
    change(time) {
      this.accountInfo.pugeBirthday = toTime(time)
    },
    fetchData() {
      this.userInfo.uid && accountGetInfo(this.userInfo.uid)
        .then((res) => {
          if (res.data.user) {
            this.accountInfo = res.data.user
            this.loading = false
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleClose() {
      this.remoteClose()
    },
    updatePhoto(photo) {
      this.accountInfo.pugeAvater = photo
      this.userInfo.uid && accountPutInfo(this.accountInfo)
        .then(() => {
          this.$bus.$emit('accountChange', true)
          this.fetchData()
        })
        .catch(() => {
          this.$message({
            message: '保存失败',
            type: 'error'
          })
        })
    },
    updateAccount() {
      this.userInfo.uid && accountPutInfo(this.accountInfo)
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
    }
  }
}
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
