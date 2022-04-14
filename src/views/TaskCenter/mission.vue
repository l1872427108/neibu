<template>
	<div class="box">
		<div class="block">
			<div class="response">
				<!-- 日期 -->
				<div>
					<!-- <span class="demonstration">{{ $t('task.PleaseSelectTheTime') }}</span> -->
					<el-date-picker
						class="date"
						align="right"
						type="date"
						v-model="time"
						:picker-options="pickerOptions"
						@change="datequery"
						style="width: 180px"
					>
					</el-date-picker>
				</div>
				<!-- 添加任务按钮 -->
				<el-button type="primary" class="addtask" @click="add()">{{ $t('task.addtask') }}</el-button>
			</div>

			<!--弹出新增窗口:visible.sync 为true窗口会被弹出-->
			<el-dialog :title="'任务' + text" :visible.sync="dialogFormVisible" :before-close="missionClose" width="620px">
				<el-form
					:model="pojo"
					ref="pojo"
					:rules="rules"
					label-width="80px"
					label-position="right"
					style="width: 550px"
					:disabled="this.pojo.state === '1' ? true : false  || this.pojo.state === '2' ? true : false "
				>
					<el-form-item label="任务标题:" prop="title">
						<el-input v-model="pojo.title" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="起止时间:">
						<el-col :span="10">
							<el-form-item prop="startTime">
								<el-time-select
									placeholder="起始时间"
									v-model="pojo.startTime"
									class="startime"
									:picker-options="{
										start: '08:00',
										step: '00:30',
										end: '23:59',
									}"
								>
								</el-time-select>
							</el-form-item>
						</el-col>
						<el-col class="line" :span="2">-</el-col>
						<el-col :span="10">
							<el-form-item prop="lastTime">
								<el-time-select
									placeholder="结束时间"
									v-model="pojo.lastTime"
									:picker-options="{
										start: '08:00',
										step: '0:30',
										end: '23:59',
										minTime: pojo.startTime,
									}"
								>
								</el-time-select>
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-form-item label="任务内容:" prop="content" class="content">
						<el-input v-model="pojo.content" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="完成凭证:" prop="voucher" v-if="pojo.state === '1' ? true : false">
						<el-image
							:src="pojo.voucher"
							class="imgsize"
							:preview-src-list="[pojo.voucher]"
							@click="vbs(pojo.voucher)"
						/>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer" v-if="pojo.state === '1' ? false : true  && pojo.state !== '2' ?  true: false ">
					<el-button @click="missionClose">取 消</el-button>
					<el-button type="primary" @click="submitdata(pojo.id)"> {{ text }} </el-button>
				</div>
			</el-dialog>
		</div>
		<!-- 任务列表 -->
		<div class="list">
			<el-table border :data="this.resp" style="width: 100%">
				<!-- label显示标题，prop数据字段名 -->
				<el-table-column
					:label="$t('task.CreationTime')"
					align="center"
					style="width: 20%"
					prop="gmtCreate"
				></el-table-column>
				<el-table-column :label="$t('task.JobTitle')" align="center" style="width: 20%" prop="title"> </el-table-column>
				<el-table-column :label="$t('task.ContentOfTheTask')" align="center" style="width: 20%" prop="content" class="taskcontent">
				</el-table-column>
				<el-table-column :label="$t('task.TaskStatus')" align="center" style="width: 20%" prop="state">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.state === '0'" type="warning">未完成</el-tag>
						<el-tag v-if="scope.row.state === '1'" type="success">已完成</el-tag>
						<el-tag v-if="scope.row.state === '2'" type="info">已逾期</el-tag>
					</template>
				</el-table-column>
				<el-table-column align="center" width="420" :label="$t('task.operation')">
					<!-- 完成,查看,修改,删除按钮 -->
					<template slot-scope="scope" class="font-size">
						<el-button
							size="mini"
							round
							type="success"
							@click="upload(scope.row.id, scope.row.state)"
							v-if="scope.row.state !== '1' || scope.row.state === '2'"
							v-show="scope.row.state === '0'"
						>
							完成</el-button
						>
						<el-button
							size="mini"
							round
							type="primary"
							@click="edit(scope.row.id, scope.row.state)"
							:disabled="scope.row.state === '1'  ?  false : true && scope.row.state !== '2' ?  true: false " 
						>
							查看</el-button
						>
						<!-- 编辑弹框 -->
						<!-- @click="dialogFormVisible = true" -->
						<el-button
							size="mini"
							round
							type="warning"
							@click="look(scope.row.id, scope.row.state)"
							:disabled="scope.row.state === '1' ? true : false"
							v-show="scope.row.state === '0'"
							>修改</el-button
						>
						<el-button
							size="mini"
							round
							type="danger"
							@click="handleDelete(scope.row.id)"
							:disabled="scope.row.state === '1' ? true : false"
							v-show="scope.row.state === '0'"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 用于完成弹窗的子组件 -->
		<Upload
			:dialogTableVisible="dialogTableVisible"
			:handleClose="handleClose"
			:UploadId="UploadId"
			:voucher="voucher"
		/>
	</div>
</template>

<script>
// 接口
import { todayTimeSearch, addTask, deleteTask, taskidSearch, amendTask} from '~/api/taskCenter';
import { Cookie, Key } from '~/utils/cache/cookie';
// 封装的事件处理工具
import '~/utils/dateconversion';
// 引入时间处理函数
import '~/utils/date/date.js';
// 引入子组件
import Upload from './upload.vue'
export default {
	components: {
		Upload,
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
				voucher: '',
			},
			gmtCreate: '',
			startTime: '',
			lastTime: '',
			// 时间选择器
			pickerOptions: {},
			value1: '',
			value2: '',
			// 校验规则
			rules: {
				title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
				startTime: [{ required: true, message: '起始时间不能为空', change: 'blur' }],
				lastTime: [{ required: true, message: '结束时间不能为空', change: 'blur' }],
				content: [{ required: true, message: '任务内容不能为空', trigger: 'blur' }],
				voucher: [{ required: true, message: '完成凭证不能为空', trigger: 'blur' }],
			},
			text: '',
			dialogTableVisible: false,
			UploadId: '',
			// imageUrl: '',
			voucher: '',
			// 禁用
			disabled: true,
			// 隐藏
			dialogTableVisible1: false,
		};
	},
	// 钩子函数获取数据
	created() {
		this.time = new Date().format('yyyy-MM-dd');
		this.fetchData(this.time);
	},
	computed: {
		userId() {
			return JSON.parse(Cookie.get(Key.userInfoKey)).uid;
		},
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
				await this.handleEdit(id);
			} else {
				await this.addTasks();
        	this.fetchData(time);
			}
		},
		colsebtn() {
			this.disabled = 'true';
		},
		/**
		 * 将时间选择器的数据转化
		 */
		datequery(res) {
			const time = new Date(res).format('yyyy-MM-dd');
			// console.log(time);
			this.fetchData(time);
		},
		/**
		 * 根据时间查询数据
		 */
		async fetchData(time) {
			const response = await todayTimeSearch(time, this.userId)
			this.resp = response.data.tasks;
			if (this.resp.time) {
				// 刷新列表数据
				this.fetchData(this.time);
			}
		},
		/**
		 * 获取增加api
		 * 添加弹出弹框-》写处理函数并处理添加接口
		 */
		add() {
			this.dialogFormVisible = true;
			this.text = '添加';
		},
		addTasks() {
			this.$refs['pojo'].validate(async (validate) => {
				if (validate) {
					await this.TimeEdit();
					addTask(this.pojo).then((response) => {
						this.resp = response.tasks;
						if (response.code === 20000) {
							this.$message({
								message: '提交成功',
								type: 'success',
							});
							this.fetchData(this.time);
							this.missionClose();
						} else {
							this.$message({
								message: '提交失败',
								type: 'error',
							});
						}
					});
				}
			});
		},
		// 接口参数修改
		TimeEdit() {
			if (this.pojo.startTime !== '' || this.pojo.lastTime !== '') {
				this.pojo.startTime = this.pojo.startTime.slice(0, 5) + ':00';
				this.pojo.lastTime = this.pojo.lastTime.slice(0, 5) + ':00';
			}
		},
		/**
		 * 添加修改弹框-》写处理函数处理（回显）并处理接口
		 */
		edit(id) {
			this.dialogFormVisible = true;
			this.text = '查看';
			// 根据id查询任务信息
			taskidSearch(id).then((response) => {
				// 回显数据,需处理时间
				this.pojo = response.data.task;
			});
		},
		look(id) {
			this.dialogFormVisible = true;
			this.text = '修改';
			// 根据id查询任务信息
			taskidSearch(id).then((response) => {
				// 回显数据,需处理时间
				// this.text = '修改';
				this.pojo = response.data.task;
				this.pojo.startTime = this.pojo.startTime.slice(0, 5);
				this.pojo.lastTime = this.pojo.lastTime.slice(0, 5);
			});
		},
		/**
		 * 修改
		 */
		// handleEdit
		handleEdit() {
			this.pojo.startTime = this.pojo.startTime.slice(0, 5) + ':00';
			this.pojo.lastTime = this.pojo.lastTime.slice(0, 5) + ':00';
			this.$refs['pojo'].validate((validate) => {
				if (validate) {
					amendTask(this.pojo).then((response) => {
						this.resp = response.data.task;
						if (response.code === 20000) {
							this.$message({
								message: '提交成功',
								type: 'success',
							});
							this.fetchData(this.time);
							this.missionClose();
						} else {
							this.$message({
								message: '提交失败',
								type: 'error',
							});
						}
					});
				}
			});
		},
		/**
		 * 根据id删除任务
		 */
		handleDelete(id) {
			this.$confirm('确认删除这条记录吗？', '提示', {
				confirmButtonText: '确认',
				concelButtonText: '取消',
				type: 'warning',
				center: true,
			})
				.then(() => {
					// 确认
					// console.log('确认');
					deleteTask(id).then((response) => {
						this.resp = response.tasks;
						this.fetchData(this.time);
						this.dialogFormVisible = false;
						// 删除后，给提示
						this.$message({
							type: 'success',
							message: '删除成功!',
						});
					});
				})
				.catch(() => {
					// 取消
					this.$message({
						type: 'info',
						message: '已取消删除',
					});
				});
		},
		// 查看按钮,清空图片缓存
		vbs(val) {
			this.srcList = [];
			this.srcList.push(val);
		},
		upload(id) {
			this.dialogTableVisible = true;
			this.UploadId = id;
			this.fetchData(this.time);
		},
		// 上面为true，父传子为了关闭false，
		handleClose() {
			this.dialogTableVisible = false;
			this.fetchData(this.time);
		},
		// 清除校验
		missionClose() {
			this.$refs['pojo'].resetFields();
			this.dialogFormVisible = false;
			this.pojo = {};
		},
	},
};
</script>
<style lang="scss" scoped>
.box {
	border-radius: 10px;
}
.response {
	display: flex;
	justify-content: space-between;
}
.addtask {
	margin: 0 3px;
}
.demonstration {
	margin: 12px 0 0 20px;
	float: left;
}
.date {
	margin: 8px 0 0 2px;
}
.list {
	margin-top: 60px;
}
.startime {
	margin: 0 8px -10px 8px;
}
.imgsize {
	width: 260px;
	height: 200px;
}
.content {
	margin: -8px 0 25px 0;

}
.taskcontent {
	overflow: hidden;        /*内容会被修剪，并且其余内容是不可见的*/
    text-overflow:ellipsis;  /*显示省略符号来代表被修剪的文本。*/

}
</style>
