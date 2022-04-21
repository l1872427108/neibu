<template>
  <div>
    <transition name="bounce">
      <el-dialog
        :title="`面试进度`"
        :visible.sync="dialogVisible"
        width="70%"
        center
        :before-close="close"
      >
        <el-steps :active="activeNum" finish-status="success">
          <el-step v-for="(item, index) in titleList" ref="step" :key="index" :title="item.title" @click.native="stepChange(index+1)" />
        </el-steps>

        <el-table
          stripe
          border
          :data="stepList[active - 1]"
          style="width: 100%"
        >
          <el-table-column
            prop="interviewerName"
            label="面试官名"
            align="center"
          />
          <el-table-column
            prop="interviewTime"
            label="面试时间"
            align="center"
          />
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.nowStatue == 1" size="medium" effect="dark" type="primary">已通过</el-tag>
              <el-tag v-if="scope.row.nowStatue == 2" size="medium" effect="dark" type="danger">未通过</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <el-card class="box-card">
          <div v-if="stepListValue">
            <div v-if="stepListValue[0].nowStatue != 0">
              {{ stepListValue[0].applyValue }}
            </div>
            <div v-else>
              <el-input
                v-model="textarea"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输评价内容"
              />
              <div v-show="flag" class="submit-evaluate"><el-button size="mini" round type="primary" @click="submitEvaluate">提交评价</el-button></div>
            </div>
          </div>
        </el-card>
        <div v-if="stepListValue && stepListValue[0].nowStatue === 0" class="step-list-btn">
          <el-button
            v-show="flag"
            size="mini"
            type="success"
            :disabled="isBtn"
            @click="passInterview"
          >通过</el-button>
          <el-button
            v-show="flag"
            size="mini"
            type="danger"
            :disabled="isBtn"
            @click="noPassInterview"
          >未通过</el-button>
        </div>
        <span slot="footer" class="dialog-footer" />
      </el-dialog>
    </transition>
  </div>
</template>

<script>
import { getInterviewStep, updateState, setEvaluate } from '~/api/interview'
import {mapGetters} from 'vuex';
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    remoteClose: {
      type: Function,
      default: () => {}
    },
    interviewId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      active: 1,
      stepList: [],
      activeNum: 0,
      titleList: [
        {
          title: 'HR面（价值观面）'
        }, {
          title: '业务评估'
        }, {
          title: '导师面'
        }, {
          title: '部门面'
        },
        {
          title: '部门交叉面'
        },
        {
          title: '转正答辩'
        }
      ],
      textarea: '',
      flag: true,
      isBtn: true
    }
  },
  computed: {
    stepListValue() {
      return this.stepList[this.active - 1]
    },
    disabled() {
      // console.log(this.active > this.stepList.length)
      return this.active > this.stepList.length
    },
    ...mapGetters(['common'])
  },
  created() {
    // this.throttledClick = this.throttle(index => {
    // this.stepChange(index);
    // }, 500);
    // this.throttledClickEvaluate = this.throttle(this.submitEvaluate);
  },
  mounted() {
    this.fetchData()
    console.log('common', this.common);
  },
  methods: {
    // 获取数据
    async fetchData() {
      const result = await getInterviewStep(this.interviewId)
      result.data.stepList.sort(function(a, b) {
        return a.passApply - b.passApply
      })
      this.stepList = this.chunk(result.data.stepList)
      this.active = this.stepList.length
      this.activeNum = this.stepList.length
      this.textarea = this.stepList[this.activeNum - 1][0].applyValue ?? ''
      if (this.textarea) {
        this.isBtn = false
      }
      this.updateStatus(this.activeNum) // 2
      this.textarea = this.common;
    },
    // 点击改变步骤条
    stepChange(current) {
      if (current <= this.stepList.length) {
        const m = this.$refs.step[current - 1].$el.querySelector('.el-step__icon')
        m.style.background = '#409EFF'
        setTimeout(() => {
          m.style.background = '#fff'
        }, 700)
        this.active = current
      }
    },
    // 未通过
    noPassInterview() {
      updateState(this.stepListValue[0].id, this.stepListValue[0].applyId, 2)
      this.flag = false
      this.fetchData()
      this.$message.success('未通过, 一秒后退出')
      setTimeout(() => {
        this.close()
      }, 500)
    },
    // 通过
    passInterview() {
      updateState(this.stepListValue[0].id, this.stepListValue[0].applyId, 1)
      this.flag = false
      this.fetchData()
      this.$message.success('通过,  一秒后退出')
      setTimeout(() => {
        this.close()
      }, 500)
    },
    // 更新状态
    updateStatus(activeNum) {
      // activeNum  1 一条的话。  2
      if (activeNum >= 2) { // 走这儿   2 - 2  0
        const step = this.$refs.step[activeNum - 2].$el
        if (step.classList.contains('is-danger')) {
          step.classList.remove('is-danger')
        } else if (step.classList.contains('is-info')) {
          step.classList.remove('is-info')
        }
      }
      // 清除第一个
      // 走到第二个   activeNum 它的  1 条.
      // 展示。 最新的一个判断条件  0  == 0  - >  蓝色
      if (this.stepList[activeNum - 1][0].nowStatue == 2) {
        this.$refs.step[activeNum - 1].$el.classList.add('is-danger')
      } else if (this.stepList[activeNum - 1][0].nowStatue == 0) {
        this.$refs.step[activeNum - 1].$el.classList.add('is-info')
      }
    },
    // 提交评价
    async submitEvaluate() {
      await setEvaluate({ id: this.stepListValue[0].id, applyValue: this.textarea })
      this.$message.success('评价成功')
      this.isBtn = false
    },
    close() {
      this.$store.commit('common/SET_COMMON', this.textarea)
      this.remoteClose()
    },
    // 数组分块
    chunk(arr, size = 1) {
      if (arr.length == 0) {
        return []
      }
      const result = []
      let tmp = []
      arr.forEach(item => {
        if (tmp.length == 0) {
          result.push(tmp)
        }
        tmp.push(item)
        if (tmp.length == size) {
          tmp = []
        }
      })
      return result
    }
  }
}
</script>

<style scoped lang="scss">
.el-table {
  margin-top: 30px;
}
.box-card {
  margin-top: 20px;
  .card-hua {
    text-align: center;
    font: 15px;
    color: #409EFF;
  }
}

.submit-evaluate {
  display: flex;
  flex-direction: row-reverse;
  margin-top: 20px;
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}

@keyframes bounce-in {
}

::v-deep .is-danger {
  .el-step__head.is-success {
    color: #F56C6C;
    border-color: #F56C6C;
    .el-icon-check:before {
      content: "\e6db";
    }
  }
  .el-step__title.is-success {
    color: #F56C6C;
  }
}

::v-deep .is-info {
  .el-step__head.is-success {
    color: #409EFF;
    border-color: #409EFF;
    .el-icon-check:before {
      content: "\e6d8";
    }
  }
  .el-step__title.is-success {
    color: #409EFF;
  }
}

.step-list-btn {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>

