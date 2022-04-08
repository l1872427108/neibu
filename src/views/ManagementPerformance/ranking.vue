<!--  -->
<template>
  <div>
    <el-date-picker
      v-model="date"
      class="month-select"
      clearable
      type="month"
      format="yyyy-MM"
      placeholder="请选择月份"
      @change="selectMonth"
    />
    <el-table
      :data="declareList"
      stripe
      border
      height="calc(100vh - 65.25px)"
      style="width: 100%"
    >
      <el-table-column align="center" type="index" label="名次" width="100px" />
      <el-table-column align="center" prop="declareName" label="姓名" />
      <el-table-column align="center" prop="monthScore" label="分值" />
      <!-- <el-table-column align="center" prop="approveName" label="审批人" /> -->
    </el-table>
  </div>
</template>

<script>
import { getMonthPerformance } from '~/api/performance'
import { mapGetters } from 'vuex'
export default {
  components: {},
  data() {
    return {
      declareList: [],
      nowDate: '',
      nowMonth: '',
      approveName: '',
      date: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.__init()
  },
  methods: {
    __init() {
      this.addDate()
      this.getMonthData(this.nowMonth)
      this.approveName = this.userInfo.nickName
    },
    getMonthData(month) {
      getMonthPerformance(month).then(res => {
        this.declareList = res.data.declareList
      })
    },
    selectMonth(e) {
      const date = new Date(e)
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      const time = y + '-' + m
      this.date = time
      this.getMonthData(this.date)
    },
    addDate() {
      this.nowDate = new Date()
      const date = {
        year: this.nowDate.getFullYear(),
        month: this.nowDate.getMonth() + 1
      }
      const systemDate = date.year + '-' + 0 + date.month
      this.nowMonth = systemDate
    }
  }
}
</script>
<style scoped>
.month-select{
  margin-bottom: 20px;
}
</style>
