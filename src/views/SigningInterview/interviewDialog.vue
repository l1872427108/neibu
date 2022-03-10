<template>
    <div>
    <transition name="bounce">
      <el-dialog
      :title="`面试进度`"
      :visible.sync="dialogVisible"
      width="70%"
      center
      :before-close="close">
    <el-steps :active="activeNum" finish-status="success">
      <el-step :title="item.title" ref="step"  @click.native="throttledClick(index+1)" v-for="(item, index) in titleList" :key="index"></el-step>
    </el-steps>

    <el-table
      stripe
      border
      :data="stepList[active - 1]"
      style="width: 100%">
      <el-table-column
        prop="interviewerName"
        label="面试官名"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="interviewTime"
        label="面试时间"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
            <el-tag size="medium" effect="dark" type="primary" v-if="scope.row.nowStatue == 1">已通过</el-tag>
          <el-tag size="medium" effect="dark" type="danger" v-if="scope.row.nowStatue == 2">未通过</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-card class="box-card">
      <div v-if="stepListValue">
        <div v-if="stepListValue[0].nowStatue != 0">
          {{stepListValue[0].applyValue}}
        </div>
        <div v-else>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输评价内容"
            v-model="textarea">
          </el-input>
          <div class="submit-evaluate"><el-button size="mini" @click="throttledClickEvaluate" round type="primary">提交评价</el-button></div>
        </div>
      </div>
    </el-card>
    <div class="step-list-btn" v-if="stepListValue && stepListValue[0].nowStatue == 0">
      <el-button
        size="mini"
        type="success"
        :disabled="!textarea"
        @click="passInterview">通过</el-button>
      <el-button
        size="mini"
        type="danger"
        :disabled="!textarea"
        @click="noPassInterview">未通过</el-button>
    </div>
    <span slot="footer" class="dialog-footer">
    </span>
    </el-dialog>
    </transition>
    </div>
</template>

<script>
import {getInterviewStep, updateState, setEvaluate} from '~/api/interview';
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    remoteClose: Function,
    interviewId: {
      type: String,
      default: ''
    }
  },
  computed: {
    stepListValue() {
      return this.stepList[this.active - 1];
    },
    disabled() {
      console.log(this.active > this.stepList.length);
      return this.active > this.stepList.length;
    }
  },
  data() {
    return {
      active: 1,
      stepList: [],
      activeNum: 0,
      titleList: [
        {
            title:'HR面（价值观面）',
        },{
            title:'业务评估',
        },{
            title:'导师面',
        },{
            title:'部门面',
        },
        {
            title:'部门交叉面',
        },
        {
            title:'转正答辩',
        },
      ],
      textarea: '',
    };
  },
  created() {
    this.throttledClick = this.throttle(index => {
      this.stepChange(index);
		}, 500);
    this.throttledClickEvaluate = this.throttle(this.submitEvaluate);
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    // 获取数据
    async fetchData() {
      const result = await getInterviewStep(this.interviewId);
      result.data.stepList.unshift(result.data.stepList.pop());
      this.stepList = this.chunk(result.data.stepList);
      this.active = this.stepList.length;
      this.activeNum = this.stepList.length;
      this.updateStatus();
    },
    // 修改状态
    async updateData(id, applyId, status) {
      const result = await updateState(id, applyId, status);
      this.fetchData();
    },
    // 点击改变步骤条
    stepChange(current) {
      if (current <= this.stepList.length) {
        const m = this.$refs.step[current - 1].$el.querySelector('.el-step__icon');
        m.style.background = '#409EFF'
        setTimeout(() => {
          m.style.background = '#fff'
        }, 700);
        this.active = current;
      }
    },
    // 未通过
    noPassInterview() {
      this.updateData(this.stepListValue[0].id, this.stepListValue[0].applyId, 2);
      this.updateStatus();
      this.$message.success('未通过');
    },
    // 通过
    passInterview() {
      this.updateData(this.stepListValue[0].id, this.stepListValue[0].applyId, 1);
      this.$message.success('通过');
    },
    // 更新状态
    updateStatus() {
      if (this.stepList[this.active - 1][0].nowStatue == 2) {
        this.$refs.step[this.active - 1].$el.classList.add('is-danger');
      }
    },
    // 提交评价
    async submitEvaluate() {
      const result = await setEvaluate({applyId: this.interviewId, applyValue: this.textarea});
      this.$message.success('评价成功');
    },
    close() {
      this.remoteClose();
    },
    // 数组分块
    chunk(arr, size = 1) {
      if (arr.length === 0) {
          return [];
      }
      let result = [];
      let tmp = [];
      arr.forEach(item => {
        if (tmp.length === 0) {
            result.push(tmp);
        }
        tmp.push(item);

        if (tmp.length === size) {
            tmp = [];
        }
      })
      return result;
    },
    // 防抖
    throttle(fn, delay) {
      var timer = null;
      return function () {
        var context = this;
        var args = arguments;
        if (!timer) {
          setTimeout(() => {
            fn.apply(context, args);
            timer = null;
          }, delay);
        }
      }
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


// .step-anim {
//     animation: rubberBand 1000ms both
// }

@keyframes rubberBand {
    from {
        transform: scale3d(1, 1, 1);
    }

    30% {
        transform: scale3d(1.25, 0.75, 1);
    }

    40% {
        transform: scale3d(0.75, 1.25, 1);
    }

    50% {
        transform: scale3d(1.15, 0.85, 1);
    }

    65% {
        transform: scale3d(0.95, 1.05, 1);
    }

    75% {
        transform: scale3d(1.05, 0.95, 1);
    }

    to {
        transform: scale3d(1, 1, 1);
    }
}
.step-list-btn {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>

