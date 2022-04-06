<template>
  <div class="home-main-right">
    <!-- 任务 -->
    <div class="home-main-right-task">
      <!-- 任务进度条 -->
      <el-progress :color="taskProgressColor" :text-inside="true" :stroke-width="20" :percentage="cases" />
      <!-- 任务标题 -->
      <div class="task-title">
        <p>标题</p>
        <p>状态</p>
      </div>
      <!-- 任务列表 -->
      <ul class="task-list">
        <el-divider />
        <el-empty v-if="!taskList.length" />
        <!-- 列表项 -->
        <li v-else v-for="item in taskList" :key="item.id" class="task-list-items" @click="toTaskView">
          <el-tooltip effect="light" class="item" :content="`截止日期 ${item.lastTime}`" placement="top">
            <div class="task-list-item">
              <div>{{ item.title }}</div>
              <el-button size="mini" :type="taskBtnType(item.state)" :icon="taskBtnIcon(item.state)" circle />
            </div>
          </el-tooltip>
          <el-divider />
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
import { searchTask } from '~/api/home'

export default {
  name: 'HomeTask',
  props: {
    userId: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      // 任务列表
      taskList: [],
      // 进度条百分比
      cases: 0,
      // 进度条颜色
      taskProgressColor: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ]
    }
  },
  created() {
    this.fetchTaskData()
  },

  methods: {
    // 过滤按钮图标
    taskBtnIcon(status) {
      if (status === '0') {
        return 'el-icon-loading'
      } else if (status === '1') {
        return 'el-icon-check'
      } else if (status === '2') {
        return 'el-icon-close'
      }
    },
    // 过滤按钮类型
    taskBtnType(status) {
      if (status === '0') {
        return 'primary'
      } else if (status === '1') {
        return 'success'
      } else if (status === '2') {
        return 'danger'
      }
    },
    // // 获取任务列表
    async fetchTaskData() {
      const result = await searchTask(this.userId)
      console.log('result', result);
      this.taskList = result.data.task
      this.cases = parseInt(result.data.cases)
    },
    // 跳转任务页
    toTaskView() {
      this.$router.push('/task')
    }
  }
}
</script>

<style scope lang="scss">
.home-main-right-task {
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  height: 280px;
  padding: 20px;
  overflow: hidden;
  .task-title {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .task-list {
    overflow: auto;
    height: 100%;
    &::-webkit-scrollbar { width: 0 !important }
  }
  .task-list-items {
    margin: 20px 0;
    .task-list-item {
      display: flex;
      justify-content: space-between;
    }
    .el-result {
      width: 20px;
      height: 20px;
    }
  }
  .task-title {
    margin-top: 20px;
    font-size: 20px;
  }
}
.el-empty {
  width: 100%;
  height: 100%;
}
</style>
