<template>
  <div>
      <el-table
    :data="tableData"
    stripe
    border
    style="width: 100%">
    <el-table-column
      prop="applyName"
      label="报名者信息"
      width="180">
    </el-table-column>
    <el-table-column
      prop="department"
      label="部门"
      width="180">
    </el-table-column>
    <el-table-column
      prop="lastState"
      label="最终状态">
    </el-table-column>
    <el-table-column
      prop="applyNumber"
      label="报名次数">
    </el-table-column>
    <el-table-column
      prop="activity"
      label="活动标识">
    </el-table-column>
    <el-table-column
      prop="学号"
      label="applyStunum">
    </el-table-column>
    <el-table-column
      prop="手机号"
      label="applyPhone">
    </el-table-column>
    <el-table-column
      prop="邮箱"
      label="applyEmail">
    </el-table-column>
    <el-table-column
      prop="applySex"
      label="性别">
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
import {searchInterview, getInterviewStep} from '~/api/interview';
import {mapGetters} from 'vuex';
import InterviewDialog from './interviewDialog.vue';
export default {
  components: {
    InterviewDialog
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
    this.searchData();
  },
  methods: {
    async searchData() {
      const result = await searchInterview(this.userInfo.uid);
      this.tableData = result.data.CList
    },
    async handleInterview(index, row) {
      this.interviewId = row.id;
      console.log(index, row);
      this.visible = true;
    },
    remoteClose () {
      this.visible = false;
    }
  }
};
</script>

<style>

</style>
