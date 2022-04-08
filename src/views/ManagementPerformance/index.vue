<!--  -->
<template>
  <div class="">
    <div class="declare-left declare-btn-flex">
      <div>
        <el-badge v-for="item in approveStatus" :key="item.id" class="item" :max="99">
          <el-button
            class="declare-btn-shadow"
            :type="approvalState === item.state ? 'primary' : ''"
            size="small"
            @click="selected(item.state)"
          >{{ item.name }}</el-button>
        </el-badge>
      </div>
      <div class="declare-btn-flex">
        <el-badge class="item">
          <span class="item-score">总分:</span>
          <el-tag
            class="declare-btn-shadow score-tag"
          >{{ newScore }}</el-tag>
        </el-badge>
        <el-badge class="item" :max="99">
          <el-button
            size="small"
            class="declare-btn-shadow"
            @click="handlePerformance()"
          >申报绩效<i class="el-icon-upload el-icon--right" /></el-button>
        </el-badge>
      </div>
    </div>
    <el-timeline v-if="declareList.length">
      <el-timeline-item
        v-for="item in declareList"
        :key="item.id"
        size="large"
        icon="el-icon-more"
        :timestamp="item.gmtCreate+'  --------  '+item.gmtModified"
        placement="top"
        color="#009dd9"
      >
        <el-card class="declare-card">
          <div class="declare-btn-flex">
            <div class="declare-content declare-btn-flex">
              绩效项：<p> {{ item.performanceName }} </p>
              分值：<p>{{ item.performanceScore }}</p>
              审批人：<p>{{ item.approverName }}</p>
            </div>
            <el-tag v-if="item.approvalState === '0'" class="declare-tag">未审批</el-tag>
            <el-tag v-if="item.approvalState === '1'" class="declare-tag" type="success">已审批</el-tag>
            <el-tag v-if="item.approvalState === '2'" class="declare-tag" type="danger">审批失败</el-tag>
            <el-button v-show="item.approvalState === '2'" type="danger" icon="el-icon-delete" circle @click="deleteDeclares(item.id)" />
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <div v-else><p class="nodata">暂无数据</p><img src="../../assets/image/nodata.png" alt="" width="100%"></div>
    <performance-dialog
      v-if="dialogFormVisible"
      :visible="dialogFormVisible"
      :remote-close="remoteClose"
    />
  </div>
</template>

<script>
import PerformanceDialog from './components/performanceDialog.vue'
import { allPerformance, deleteDeclare, getMonthScore } from '~/api/performance'
import { mapGetters } from 'vuex'
export default {
  components: { PerformanceDialog },
  data() {
    return {
      approveStatus: [
        { id: '1', state: '0', name: '未审批' },
        { id: '2', state: '1', name: '已审批' },
        { id: '3', state: '2', name: '审批失败' }
      ],
      approvalState: '0',
      dialogFormVisible: false,
      newScore: '',
      declareList: [],
      num: 0
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.__init()
  },
  methods: {
    /**
     * 初始化页面函数
     */
    __init() {
      this.getAllPerformanceList('0')
      this.getScore()
    },
    deleteDeclares(id) {
      this.$confirm('确认删除这条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发送删除请求
        deleteDeclare(id).then(response => {
          // 处理响应结果提示
          this.$message({
            type: response.code === 20000 ? 'success' : 'error',
            message: response.message
          })
          // 刷新列表数据
          this.getAllPerformanceList('2')
        })
      }).catch(() => {
        // 取消删除，不用理会
      })
    },
    getScore() {
      getMonthScore(this.userInfo.uid).then(res => {
        this.newScore = res.data.newScore
      })
    },
    selected(tag) {
      this.getAllPerformanceList(tag)
      this.approvalState = tag
    },
    /**
     * 获取所有申请的绩效项
     */
    getAllPerformanceList(tag) {
      // console.log('tag', tag)
      allPerformance(tag, this.userInfo.uid).then(res => {
        this.declareList = res.data.declareList
        // console.log(this.declareList)
      })
    },
    remoteClose() {
      this.getAllPerformanceList('0')
      this.dialogFormVisible = false
    //   this.fetchData()
    },
    handlePerformance() {
      this.dialogFormVisible = true
    }
  }
}
</script>
<style lang='scss' scoped>
.declare-left {
  margin-bottom: 20px;
  .item {
    margin-right: 10px;
    .item-score{
      font-size: 18px;
      margin-right: 10px;
    }
  }
}
.declare-card{
   background-color: #fafafa;
}
.declare-btn-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.declare-score {
  margin-right: 20px;
  height: 100%;
}
.declare-content {
  p{
    margin-right: 20px;
    color: #369af1;
    font-weight:700;
  }
}
.declare-tag {
  width: 100px;
  text-align: center;
}
.declare-btn-shadow {
  box-shadow: -5px 0 5px -5px #ccc;
}
.score-tag{
  height: 42.5px;
  line-height: 42.5px;
  font-size: 18px;
  font-weight: 700;
}
::v-deep .el-timeline-item__timestamp.is-top{
   margin-bottom: 0;
    padding-top: 4px;
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    background-color: #eceef1;
    color: black;
}
.nodata{
  position: absolute;
  left:50%;
  top: 50%;
  transform: translate(-50%,-50%);
  font-size: 30px;
  font-weight: 700;
  background-image: linear-gradient(red, blue);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
</style>
