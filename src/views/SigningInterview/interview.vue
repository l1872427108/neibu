<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="100"
        :label="$t('interview.num')"
        align="center"
      />
      <el-table-column
        prop="applyName"
        :label="$t('interview.Applicants')"
        width="180"
        align="center"
      />
      <el-table-column
        prop="department"
        :label="$t('interview.department')"
        width="180"
        align="center"
      />
      <el-table-column prop="name" align="center" :label="$t('interview.Gender')">
        <template slot-scope="scope">
          {{ scope.row.applySex | sex }}
        </template>
      </el-table-column>
      <el-table-column
        prop="applyStunum"
        :label="$t('interview.studentNumber')"
        align="center"
      />
      <el-table-column
        prop="applyPhone"
        :label="$t('interview.phone')"
        align="center"
      />
      <el-table-column
        prop="applyEmail"
        :label="$t('interview.email')"
        align="center"
      />
      <el-table-column label="操作" fixed="right" width="90" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleInterview(scope.$index, scope.row)"
          >面试</el-button>
        </template>
      </el-table-column>
    </el-table>
    <interview-dialog v-if="visible" :interview-id="interviewId" :remote-close="remoteClose" :dialog-visible="visible" />
  </div>
</template>

<script>
import { searchInterview } from '~/api/interview'
import { mapGetters } from 'vuex'
import InterviewDialog from './interviewDialog.vue'
import { sex } from '~/filters/filter'
export default {
  components: {
    InterviewDialog
  },
  filters: {
    sex
  },
  data() {
    return {
      tableData: [],
      visible: false,
      interviewId: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    this.searchData()
  },
  methods: {
    async searchData() {
      const result = await searchInterview(this.userInfo.uid)
      this.tableData = result.data.CList
    },
    async handleInterview(index, row) {
      this.interviewId = row.id
      // console.log(index, row)
      this.visible = true
    },
    remoteClose() {
      this.visible = false
      this.searchData()
    }
  }
}
</script>

<style>

</style>
