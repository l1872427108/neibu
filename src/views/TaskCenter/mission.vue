<template>
  <div class="box">
    <div class="block">
      <!-- 日期 -->
      <span class="demonstration">请选择日期:</span>
      <el-date-picker
        v-model="time"
        class="date"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions"
        @change="datequery"
      />
      <!--弹出新增窗口:visible.sync 为true窗口会被弹出-->
      <el-dialog :title="'任务' + text" :visible.sync="dialogFormVisible" width="600px">
        <el-form
          ref="addForm"
          :model="pojo"
          label-width="80px"
          label-position="right"
          style="width: 550px"
          :rules="rules"
          :disabled="pojo.state === '1' ? true : false"
        >
          <el-form-item label="任务标题:" prop="title">
            <el-input v-model="pojo.title" autocomplete="off" />
          </el-form-item>
          <el-form-item label="起止时间:">
            <el-time-select
              v-model="pojo.startTime"
              prop="pojo.startTime"
              placeholder="起始时间"
              class="startime"
              :picker-options="{
                start: '08:00',
                step: '00:15',
                end: '23:59',
              }"
            />
            <el-time-select
              v-model="pojo.lastTime"
              prop="pojo.lastTime"
              placeholder="结束时间"
              :picker-options="{
                start: '08:00',
                step: '00:15',
                end: '23:59',
                minTime: pojo.startTime,
              }"
            />
          </el-form-item>
          <el-form-item label="任务内容:" prop="content">
            <el-input v-model="pojo.content" autocomplete="off" />
          </el-form-item>
          <el-form-item v-if="pojo.state === '1' ? true : false" label="完成凭证:" prop="voucher">
            <el-image
              :src="pojo.voucher"
              class="imgsize"
              :preview-src-list="[pojo.voucher]"
              @click="vbs(pojo.voucher)"
            />
          </el-form-item>
        </el-form>
        <div v-if="pojo.state === '1' ? false : true" slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitdata(pojo.id)"> {{ text }} </el-button>
        </div>
      </el-dialog>
      <el-button type="primary" class="addtask" @click="add()">添加任务</el-button>
    </div>
    <!-- 任务列表 -->
    <div class="list">
      <el-table border :data="resp" style="width: 100%">
        <!-- label显示标题，prop数据字段名 -->
        <el-table-column label="创建时间" align="center" style="width: 20%" prop="gmtCreate" />
        <el-table-column label="任务标题" align="center" style="width: 20%" prop="title" />
        <el-table-column label="任务内容" align="center" style="width: 20%" prop="content" />
        <el-table-column label="任务状态" align="center" style="width: 20%" prop="state">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.state === '1'" type="success">已完成</el-tag>
            <el-tag v-if="scope.row.state === '0'" type="info">未完成</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" width="420" label="操作">
          <!-- 完成,查看,修改,删除按钮 -->
          <template slot-scope="scope" class="font-size">
            <el-button
              v-show="scope.row.state === '0'"
              size="mini"
              round
              type="success"
              :disabled="scope.row.state === '1' ? true : false"
              @click="upload(scope.row.id, scope.row.state)"
            >
              完成</el-button>
            <el-button
              size="mini"
              round
              type="primary"
              :disabled="scope.row.state === '1' ? false : true"
              @click="edit(scope.row.id, scope.row.state)"
            >
              查看</el-button>
            <!-- 编辑弹框 -->
            <!-- @click="dialogFormVisible = true" -->
            <el-button
              v-show="scope.row.state === '0'"
              size="mini"
              round
              type="warning"
              :disabled="scope.row.state === '1' ? true : false"
              @click="look(scope.row.id, scope.row.state)"
            >修改</el-button>
            <el-button
              v-show="scope.row.state === '0'"
              size="mini"
              round
              type="danger"
              :disabled="scope.row.state === '1' ? true : false"
              @click="handleDelete(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 用于完成弹窗的子组件 -->
    <Upload
      :dialog-table-visible="dialogTableVisible"
      :handle-close="handleClose"
      :upload-id="UploadId"
      :voucher="voucher"
    />
  </div>
</template>

<script>
// 接口
import { todayTimeSearch, addTask, deleteTask, taskidSearch, amendTask } from '~/api/taskCenter'
import { Cookie, Key } from '~/utils/cache/cookie'
// 封装的事件处理工具
import '~/utils/dateconversion'
// 引入子组件
import Upload from './upload.vue'
export default {
  components: {
    Upload
  },
  data() {
    return {
      resp: [],
      time: '',
      // 控制弹窗
      dialogFormVisible: false,
      btn: '',
      readonly: true,
      srcList: [],
      //  srcList: [],
      // 提交表单
      pojo: {
        id: null,
        state: '',
        title: '',
        content: '',
        startTime: '',
        lastTime: '',
        gmtCreate: '',
        voucher: ''
      },
      startTime: '',
      lastTime: '',
      // 时间选择器
      pickerOptions: {},
      value1: '',
      value2: '',
      // 校验规则
      rules: {
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
        startTime: [{ required: true, message: '初始时间不能为空', trigger: 'blur' }],
        lastTime: [{ required: true, message: '截止不能为空', trigger: 'blur' }],
        content: [{ required: true, message: '任务内容不能为空', trigger: 'blur' }]
      },
      text: '',
      dialogTableVisible: false,
      UploadId: '',
      // imageUrl: '',
      voucher: '',
      // 禁用
      disabled: true,
      // 隐藏
      display: 'none',
      dialogTableVisible1: false
    }
  },
  computed: {
    userId() {
      return JSON.parse(Cookie.get(Key.userInfoKey)).uid
    }
  },
  // 钩子函数获取数据
  created() {
    this.time = new Date().format('yyyy-MM-dd')
    this.fetchData(this.time)
  },
  methods: {
    /**
		 * 使用异步,切换编辑还是添加
		 */
    async submitdata(id) {
      /**
			 * 根据id修改
			 */
      if (id) {
        await this.handleEdit(id)
        this.$message.success('编辑成功')
        this.dialogFormVisible = false
      } else {
        await this.addTasks()
        this.$message.success('添加成功')
        this.dialogFormVisible = true
      }
    },
    colsebtn() {
      this.disabled = 'true'
    },
    /**
		 * 将时间选择器的数据转化
		 */
    datequery(res) {
      const time = new Date(res).format('yyyy-MM-dd')
      // console.log(time);
      this.fetchData(time)
    },
    /**
		 * 根据时间查询数据
		 */
    fetchData(time) {
      todayTimeSearch(time, this.userId).then((response) => {
        this.resp = response.data.tasks
        if (this.resp.time) {
          // 刷新列表数据
          this.fetchData(this.time)
        }
      })
    },
    /**
		 * 获取增加api
		 * 添加弹出弹框-》写处理函数并处理添加接口
		 */
    add() {
      this.dialogFormVisible = true
      this.text = '添加'
      this.pojo = {}
    },
    addTasks() {
      this.pojo.startTime = this.pojo.startTime.slice(0, 5) + ':00'
      this.pojo.lastTime = this.pojo.lastTime.slice(0, 5) + ':00'
      addTask(this.pojo).then((response) => {
        // this.resp = response.data.tasks;
        this.resp = response.tasks
        // console.log(this.pojo);
        // 新增成功，刷新数据
        this.fetchData(this.time)
        this.dialogFormVisible = false
      })
    },
    /**
		 * 添加修改弹框-》写处理函数处理（回显）并处理接口
		 */
    edit(id) {
      this.dialogFormVisible = true
      this.text = '查看'

      // 根据id查询任务信息
      taskidSearch(id).then((response) => {
        // 回显数据,需处理时间
        // this.text = '查看';
        this.pojo = response.data.task
        // console.log(this.pojo);
      })
    },
    look(id) {
      this.dialogFormVisible = true
      this.text = '修改'
      // 根据id查询任务信息
      taskidSearch(id).then((response) => {
        // 回显数据,需处理时间
        // this.text = '修改';
        this.pojo = response.data.task
        // console.log(this.pojo);
      })
    },
    /**
		 * 修改
		 */
    handleEdit() {
      this.pojo.startTime = this.pojo.startTime.slice(0, 5) + ':00'
      this.pojo.lastTime = this.pojo.lastTime.slice(0, 5) + ':00'
      // console.log(this.pojo);
      amendTask(this.pojo).then((response) => {
        this.resp = response.data.task
        this.fetchData(this.time)
      })
    },
    /**
		 * 根据id删除任务
		 */
    handleDelete(id) {
      this.$confirm('确认删除这条记录吗？', '提示', {
        confirmButtonText: '确认',
        concelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          // 确认
          // console.log('确认');
          deleteTask(id).then((response) => {
            this.resp = response.tasks
            this.fetchData(this.time)
            this.dialogFormVisible = false
            // 删除后，给提示
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch(() => {
          // 取消
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 查看按钮,清空图片缓存
    vbs(val) {
      this.srcList = []
      this.srcList.push(val)
    },
    upload(id) {
      this.dialogTableVisible = true
      this.UploadId = id
      this.fetchData(this.time)
    },
    // 上面为true，父传子为了关闭false，
    handleClose() {
      this.dialogTableVisible = false
      this.fetchData(this.time)
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
	border-radius: 10px;
}
.block {
	/* display: flex;
    justify-content:space-between;2.设置主轴对齐方式：两端对齐 */
	margin-top: 10px;
}
.demonstration {
	margin: 12px 0 0 20px;
	float: left;
}
.date {
	margin: 8px 0 0 15px;
	float: left;
}
.addtask {
	float: right;
	margin-right: 100px;
}
.list {
	margin-top: 80px;
}
.startime {
	margin: 0 8px 0 5px;
}
.imgsize {
	width: 280px;
	height: 200px;
}
</style>
