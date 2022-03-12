<template>
  <div>
      <el-table
    :data="tableData"
    stripe
    border
    style="width: 100%">
    <el-table-column
      prop="applyName"
      :label="$t('interview.Applicants')"
      width="180">
    </el-table-column>
    <el-table-column
      prop="department"
      :label="$t('interview.department')"
      width="180">
    </el-table-column>
    <el-table-column
      prop="lastState"
      :label="$t('interview.status')">
    </el-table-column>
    <el-table-column
      prop="applyNumber"
      :label="$t('interview.frequency')">
    </el-table-column>
    <el-table-column
      prop="activity"
      :label="$t('interview.identification')">
    </el-table-column>
    <el-table-column
      prop="applyStunum"
      :label="$t('interview.studentNumber')">
    </el-table-column>
    <el-table-column
      prop="手机号"
      :label="$t('interview.phone')">
    </el-table-column>
    <el-table-column
      prop="applyEmail"
      :label="$t('interview.email')">
    </el-table-column>
    <el-table-column
      prop="applySex"
      :label="$t('interview.Gender')">
    </el-table-column>
    <el-table-column label="操作" fixed="right" width="90">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleInterview(scope.$index, scope.row)">面试</el-button>
      </template>
    </el-table-column>
  </el-table>
  <interview-dialog :interviewId="interviewId" v-if="visible" :remote-close="remoteClose" :dialog-visible="visible"></interview-dialog>
  </div>
</template>

<script>
import { searchInterview, getInterviewStep } from '~/api/interview';
import { mapGetters } from 'vuex';
import InterviewDialog from './interviewDialog.vue';
export default {
  components: {
    InterviewDialog
  },
  data () {
    return {
      tableData: [],
      visible: false,
      interviewId: ''
    };
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted () {
    this.searchData();
  },
  methods: {
    async searchData () {
      const result = await searchInterview(this.userInfo.uid);
      this.tableData = result.data.CList;
    },
    async handleInterview (index, row) {
      this.interviewId = row.id;
      console.log(index, row);
      this.visible = true;
    },
    remoteClose () {
      this.visible = false;
      this.searchData();
    }
  }
};
</script>

<style>

</style>
