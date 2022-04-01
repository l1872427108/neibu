<template>
  <div class="pay">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      border
    >
      <el-table-column prop="name" align="center" :label="$t('pay.user')">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column prop="status" align="center" :label="$t('pay.status')">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | payClass">{{ scope.row.status | payStatus }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="price" align="center" :label="$t('pay.amount')">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column prop="orderNo" align="center" :label="$t('pay.order')">
        <template slot-scope="scope">
          {{ scope.row.orderNo }}
        </template>
      </el-table-column>
      <el-table-column prop="payDes" align="center" :label="$t('pay.describe')">
        <template slot-scope="scope">
          {{ scope.row.payDes }}
        </template>
      </el-table-column>
      <el-table-column min-width="100%" align="center" :label="$t('pay.operation')">
        <template slot-scope="scope">
          <el-button size="mini" :type="scope.row.status | payType" :disabled="scope.row.status === '1'" @click="toPay(scope.row.orderNo)">{{ scope.row.status | payMessage }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { searchUserOrder } from '~/api/contractOrder'
import { payStatus, payClass, payMessage, payType } from '~/filters/filter'
import {
  Cookie,
  Key
} from '~/utils/cache/cookie'
export default {
  filters: {
    payClass,
    payStatus,
    payMessage,
    payType
  },
  data() {
    return {
      tableData: [],
      loading: true
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      searchUserOrder(JSON.parse(Cookie.get(Key.userInfoKey)).uid).then(res => {
        this.tableData = res.data.orderList
        this.loading = false
      }).catch(() => {
        this.tableData = []
        this.$message.error('合同请求失败')
      })
    },
    toPay(orderNo) {
      window.location.href = `${process.env.VUE_APP_PAY_URL}?orderId=${orderNo}`
    }
  }
}
</script>

<style scoped lang="scss">
</style>
