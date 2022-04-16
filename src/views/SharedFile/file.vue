<template>
	<div class="box">
		<!-- 搜索和收藏 -->
		<div class="block">
			<!-- 左侧搜索 -->
			<div class="leftsearch">
				<el-input size="medium" placeholder="请输入文件名" v-model="fileName" class="input-with-select">
					<el-select
						v-model="label"
						@click="searchfiles(label)"
						slot="prepend"
						placeholder="请选择"
						style="width: 100px"
					>
						<el-option label="全体" value="全体"></el-option>
						<el-option label="前端" value="前端"></el-option>
						<el-option label="后端" value="后端"></el-option>
						<el-option label="实习生" value="实习生"></el-option>
						<el-option label=""   value=""></el-option>
					</el-select>
					<el-button  @click="searchfiles(fileName)" slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</div>
			<!--右侧我的收藏 -->
			<div class="rightbutton">
				<el-button @click="switchTo" type="primary"> {{ $t('fileSharing.MyCollection') }}</el-button>
			</div>
		</div>
		<!-- 表格 -->
		<el-table :data="resp"   border>
			<el-table-column type="index" align="center" :label="$t('fileSharing.Number')"  width="100" />
			<el-table-column prop="fileName" align="center" :label="$t('fileSharing.FileName')"  />
			<el-table-column prop="label" align="center" :label="$t('fileSharing.Label')" />
			<el-table-column prop="summary" align="center"  :label="$t('fileSharing.FileDescription')"  width="330" />
			<el-table-column prop="gmtModified" align="center"  :label="$t('fileSharing.UploadTime')" />
			<el-table-column prop="authorName" align="center" :label="$t('fileSharing.Uploader')"  />
			<el-table-column :label="$t('fileSharing.Operation')" align="center">
				<template slot-scope="scope">
					<el-button size="mini" type="success" @click="downloadthisfile(scope.row.id)">下 载</el-button>
					<el-button size="mini" type="primary" 
					@click="collectfiles(scope.row)">收 藏</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<div class="paging">
			<el-pagination
				:current-page="current"
				:page-sizes="[10, 15, 20, 25]"
				:page-size="size"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>
	</div>
</template>

<script>
import { addCollection, cancelCollection, downloadFile, queryPaging } from '~/api/sharedFile';
// 引入下载处理工具
import {download} from  '~/utils/download.js';
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			// 搜索
			fileName: '',
			select: '',
			resp: [],
			label:'',
			pojo: {
				id: '',
				authorName: '',
				fileName: '',
				summary: '',
				label: '',
				gmtCreate: '',
				gmtModified: '',
				summary: '',
			},
			// 分页相关
			// 每一个页面
			current: 1,
			// 每页条数
			size: 10,
			// 总数
			total: 0,
			userId: '',
		};
	},
	created() {
		this.featchData();
	},
	// 获取用户id
	computed: {
		...mapGetters(['userInfo']),
	},
	methods: {
		// 路由跳转方法
	    switchTo(){
			this.$router.push('/collection')
			this.featchData();
		 },
		// 分页查询例会
		featchData() {
			queryPaging({ current: this.current, size: this.size }).then((response) => {
				const data = response.data.fileIPage;
				//  总条数
				this.total = data.total;
				this.resp = data.records;
			});
		},
		/**
		 * 分页组件,当每页条数改变后，调用
		 * */
		handleSizeChange(val) {
			this.size = val;
			// console.log(`每页 ${val} 条`);
			this.featchData();
		},
		/**
		 * 当前页码改变后调用
		 */
		handleCurrentChange(val) {
			this.current = val;
			// console.log(`当前页: ${val}`);
			this.featchData();
		},
		// 收藏文件
		collectfiles(data) {
			this.$confirm('您确认收藏这个文件吗？', '提示', {
				confirmButtonText: '确认',
				concelButtonText: '取消',
				type: 'warning',
				center: true,
			}).then(() => {
				console.log(data);
				addCollection({ fileId: data.id, userId: this.userInfo.uid }).then((response) => {
					this.data = response.data;
					console.log(this.data);
					console.log(response.data.status);
					this.$message({
						type: 'success',
						message: '收藏成功!',
					});
				});
				this.featchData();
			});
		},
		// 下载文件
		downloadthisfile(id) {
			this.$confirm('您确认下载这个文件吗？', '提示', {
				confirmButtonText: '确认',
				concelButtonText: '取消',
				type: 'warning',
				center: true,
			})
				.then(() => {
					downloadFile(id).then((response) => {
						download(response.data.url)
						// console.log(response.data.url);
						// this.data = response.data.url;
					});
					this.$message({
						type: 'success',
						message: '正在下载!',
					});
				})
				.catch(() => {
					// 取消
					this.$message({
						type: 'info',
						message: '已取消下载',
					});
				});
			this.featchData();
		},
		// 根据文件名和label标签搜索
		searchfiles(fileName,label) {
			queryPaging({ current: this.current, size: this.size,fileName:this.fileName,label:this.label}).then((response) => {
				console.log(fileName,label);
				const data = response.data.fileIPage;
				//  总条数
				this.total = data.total;
				this.resp = data.records;
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.box {
	position: relative;
	.paging {
		position: absolute;
		left: 50%;
		margin-left: -15%;
		.el-pagination {
			margin: 50px 0;
		}
	}
}
.block {
	display: flex;
	justify-content: space-between;
	margin: 20px 30px;
	.leftsearch {
		margin-left: 50px;
	}
	.rightbutton {
		margin-right: 50px;
	}
}
</style>