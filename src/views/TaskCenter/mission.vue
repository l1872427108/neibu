<template>
	<div class="box">
		<div class="block">
			<!-- 日期 -->
			<span class="demonstration">请选择日期:</span>
			<el-date-picker
				class="date"
				v-model="this.time"
				align="right"
				type="date"
				placeholder="选择日期"
				:picker-options="pickerOptions"
				@change="datequery"
			>
			</el-date-picker>
			<!--弹出新增按钮 :visible.sync 为true窗口会被弹出-->
			<el-dialog :title="'任务' + text" :visible.sync="dialogFormVisible" width="600px">
				<el-form
					:model="pojo"
					ref="addForm"
					label-width="80px"
					label-position="right"
					style="width: 550px"
					:rules="rules"
				>
					<el-form-item label="任务标题:" prop="title">
						<el-input v-model="pojo.title" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="起止时间:">
						<template>
							<el-time-select
								prop="pojo.startTime"
								placeholder="起始时间"
								v-model="pojo.startTime"
								class="startime"
								:picker-options="{
									start: '08:00',
									step: '00:15',
									end: '23:59',
								}"
							>
							</el-time-select>
							<el-time-select
								prop="pojo.lastTime"
								placeholder="结束时间"
								v-model="pojo.lastTime"
								:picker-options="{
									start: '08:00',
									step: '00:15',
									end: '23:59',
									minTime: pojo.startTime,
								}"
							>
							</el-time-select>
						</template>
					</el-form-item>
					<el-form-item label="任务内容:" prop="content">
						<el-input v-model="pojo.content" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="完成凭证:" prop="voucher" v-if="seen">
						<img :src="pojo.voucher" alt="" class="imgsize">
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer" >
					<template>
                      <el-button @click="dialogFormVisible = false" >取 消</el-button>
				  	<el-button type="primary" @click="submitdata(pojo.id)"> {{ text }} </el-button>
					</template>
				</div>
			</el-dialog>

			<el-button type="primary" @click="add()" class="addtask">添加任务</el-button>
		</div>
		<!-- 任务列表 -->
		<div class="list">
			<el-table border :data="this.resp" style="width:100%">
				<!-- label显示标题，prop数据字段名 -->
				<el-table-column label="创建时间" align="center" style="width:20%"  prop="gmtCreate"></el-table-column>
					<el-table-column label="任务标题" align="center" style="width:20%" prop="title"> </el-table-column>
				<el-table-column label="任务内容" align="center" style="width:20%" prop="content"> </el-table-column>
				<el-table-column label="任务状态" align="center" style="width:20%" prop="state">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.state == 0" type="warning">进行中</el-tag>
						<el-tag v-if="scope.row.state == 1" type="success">已完成</el-tag>
						<el-tag v-if="scope.row.state == 2" type="danger">未完成</el-tag>
					</template>
				</el-table-column>
				<el-table-column align="center"  width="420" label="操作">
					<template slot-scope="scope" class="font-size">
						<!-- slot-scope="scope"可以获取到row，column，$index和table（内容的状态管理）的数据 -->
						<el-button
					     	size="mini"
							round
							type="success"		
							@click="upload(scope.row.id, scope.row.state)"	
							:disabled="scope.row.state == 1 ? true : false"
						>
							完成</el-button
						>
							<el-button
							size="mini"
							round
							type="primary"
							@click="edit(scope.row.id, scope.row.state)"
							:disabled="scope.row.state == 1 ? false : true"
						>
							查看</el-button
						>
						<!-- 编辑弹框 -->
						<!-- @click="dialogFormVisible = true" -->
						<el-button
							size="mini"
							round
							type="warning"
						  @click="look(scope.row.id,scope.row.state)" 
							:disabled="scope.row.state == 1 ? true : false"
							>修改</el-button
						>
						<el-button size="mini" round type="danger"
						 @click="handleDelete(scope.row.id)" 
						:disabled="scope.row.state == 1 ? true : false"	
							>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- :imageUrl="imageUrl" -->
		<Upload
			:dialogTableVisible="dialogTableVisible"
			:handleClose="handleClose"
			:UploadId="UploadId"
			:voucher="voucher"
		/>
	</div>
</template>

<script>
import { todayTimeSearch, addTask, deleteTask, taskidSearch, amendTask } from '~/api/taskCenter';
import { Cookie, Key } from '~/utils/cache/cookie';
import '~/utils/dateconversion';
import Upload from './upload.vue';
export default {
	components: {
		Upload,
	},
	data() {
		return {
			resp: [],
			time: '',
			seen:false,
			// 控制弹窗
			dialogFormVisible: false,
			btn:'',
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
				content: [{ required: true, message: '任务内容不能为空', trigger: 'blur' }],
			},
			text: '',
			dialogTableVisible: false,
			UploadId: '',
			// imageUrl: '',
			voucher: '',
			disabled: true,
			dialogTableVisible1:false,
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
		async submitdata(id) {
			// 根据id修改
			if (id) {
				await this.handleEdit(id);
				this.$message.success('编辑成功');
				this.dialogFormVisible = false;
			} else {
				await this.addTasks();
				this.$message.success('添加成功');
				this.dialogFormVisible = true;
			}
		},
		colsebtn() {
            	disabled="true"
		},
		// 将时间选择器的数据转化
		datequery(res) {
			var time = new Date(res).format('yyyy-MM-dd');
			this.fetchData(time);
		},
		// 根据时间查询数据
		fetchData(time) {
			console.log(time);
			todayTimeSearch(this.time, this.userId).then((response) => {
				this.resp = response.data.tasks;
				if (this.resp.time) {
					// 删除成功，刷新列表数据
					this.fetchData(this.time);
				}
			});
		},
		// 获取增加api
		// 添加弹出弹框-》写处理函数并处理添加接口
		add() {
			this.dialogFormVisible = true;
			this.text = '添加';
			this.pojo = {};
		},
		addTasks() {
			this.pojo.startTime = this.pojo.startTime.slice(0, 5) + ':00';
			this.pojo.lastTime = this.pojo.lastTime.slice(0, 5) + ':00';
			addTask(this.pojo).then((response) => {
				// this.resp = response.data.tasks;
				this.resp = response.tasks;
				console.log(this.pojo);
				// 新增成功，刷新数据
				this.fetchData(this.time);
				this.dialogFormVisible = false;
			});
		},
		// 添加修改弹框-》写处理函数处理（回显）并处理接口
		edit(id) {
			this.dialogFormVisible = true;
			this.text = '修改';
			this.seen = true,
			// 根据id查询任务信息
			taskidSearch(id).then((response) => {
				// 回显数据,需处理时间
				this.text = '修改';
				this.pojo = response.data.task;
				console.log(this.pojo);
			});
		},
			look(id) {
			this.dialogFormVisible = true;
			this.text = '修改';
			// 根据id查询任务信息
			this.seen = false
			taskidSearch(id).then((response) => {
				// 回显数据,需处理时间
				this.text = '修改';
				this.pojo = response.data.task;
				console.log(this.pojo);
			});
		},
		//修改
		handleEdit() {
			this.pojo.startTime = this.pojo.startTime.slice(0, 5) + ':00';
			this.pojo.lastTime = this.pojo.lastTime.slice(0, 5) + ':00';
			console.log(this.pojo);
			amendTask(this.pojo).then((response) => {
				this.resp = response.data.task;
				this.fetchData(this.time);
			});
		},
		//根据id删除任务
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
		upload(id) {
			this.dialogTableVisible = true;
			this.UploadId = id;
			this.fetchData(this.time);
			//    console.log(this.UploadId);
		},
		// 上面为true，父传子为了关闭false，
		handleClose() {
			this.fetchData(this.time);
			this.dialogTableVisible = false;
		},
	},
};
</script>
<style lang="scss" scoped>
.box {
	background-color: #f2f2f2;
	margin: 20px;
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