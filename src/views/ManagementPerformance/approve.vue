<!--  -->
<template>
  <div class="">
    <!-- 绩效审批按钮 -->
    <div class="declare-left">
      <el-badge v-for="item in statusOptions" :key="item.id" class="item" :max="99">
        <el-button
          class="declare-btn-shadow"
          :type="approvalState === item.state ? 'primary' : ''"
          size="small"
          @click="selected(item.state)"
        >{{ item.name }}</el-button>
      </el-badge>
      <el-input v-model="declareName" placeholder="请输入申请人姓名" class="search-declare">
        <el-button slot="append" icon="el-icon-search" @click="searchDeclare" />
      </el-input>
    </div>
    <el-table
      :data="declareList"
      stripe
      border
      height="calc(100vh - 65.25px)"
      style="width: 100%"
    >
      <el-table-column align="center" type="index" label="序号" width="60" />
      <el-table-column align="center" prop="declareName" label="绩效申请人" />
      <el-table-column align="center" prop="performanceName" label="绩效项" />
      <el-table-column align="center" prop="performanceScore" label="绩效分值" />
      <el-table-column align="center" prop="gmtCreate" label="申请时间" />
      <el-table-column align="center" prop="approvalState" label="审批状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.approvalState === '0'">未审批</el-tag>
          <el-tag v-if="scope.row.approvalState === '1'" type="success">已审批</el-tag>
          <el-tag v-if="scope.row.approvalState === '2'" type="danger">审批失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleView(scope.row.id)">查看</el-button>
          <el-button v-show="scope.row.approvalState === '0'" type="success" size="mini" @click="handleCheck(scope.row.id,'1','通过')">通过</el-button>
          <el-button v-show="scope.row.approvalState === '0'" type="danger" size="mini" @click="handleCheck(scope.row.id,'2','驳回')">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <approve-dialog :visible="visible" :search-list="searchList" :remote-close="remoteClose" />
  </div>
</template>

<script>
import ApproveDialog from './components/appoveDialog.vue'
import { selectDeclare, updateApprovalState, selectPerformance, getQueryDeclare } from '~/api/performance'
import { mapGetters } from 'vuex'
const statusOptions = [
  { state: '0', name: '未审批' },
  { state: '1', name: '已审批' }
]
export default {
  components: { ApproveDialog },
  data() {
    return {
      approvalState: '0',
      searchList: null,
      statusOptions,
      declareList: [],
      visible: false,
      list: {},
      declareName: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  activated: function() {
    this.__init()
  },
  methods: {
    /**
     * 初始化页面函数
     */
    __init() {
      this.getApproverList()
    },
    getApproverList() {
      selectDeclare(this.userInfo.uid).then(res => {
        // console.log(res)
        const list = res.data.declareList
        // console.log(this.declareList)
        this.filterList(list)
      })
    },
    filterList(res) {
      this.list.one = res.filter(item => item.approvalState === '0')
      this.list.two = res.filter(item => item.approvalState !== '0')
      if (this.approvalState === '0') {
        this.declareList = this.list.one
      } else {
        this.declareList = this.list.two
      }
    },
    handleView(id) {
      selectPerformance(id).then(res => {
        this.searchList = res.data.declare
      })
      this.visible = true
    },
    remoteClose() {
      this.visible = false
    },
    selected(tag) {
      this.approvalState = tag
      if (tag === '0') {
        this.declareList = this.list.one
      } else {
        this.declareList = this.list.two
      }
    },
    handleCheck(id, status, name) {
      this.$confirm('确定要' + name + '该绩效项目吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发送删除请求
        updateApprovalState(id, status).then(response => {
          // 处理响应结果提示
          this.$message({
            type: response.code === 20000 ? 'success' : 'error',
            message: response.message
          })
          // 刷新列表数据
          this.getApproverList()
        })
      }).catch(() => {
        // 取消删除，不用理会
      })
    },
    searchDeclare() {
      // console.log(this.declareName);
      getQueryDeclare({ declareName: this.declareName }).then(res => {
        this.declareList = res.data.declareList
        this.filterList(this.declareList)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.declare-left {
  margin-bottom: 20px;
  .item {
    margin-right: 10px;
  }
  .search-declare{
  width: 300px;
  margin-left: 20px;
}
}
.declare-btn-shadow {
  box-shadow: -5px 0 5px -5px #ccc;
}
</style>
