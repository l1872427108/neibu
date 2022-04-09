<template>
  <div>
    <!-- 查询选项 -->
    <el-row type="flex" class="row-bg" justify="space-around" :gutter="5">
      <!-- 按部门查询 -->
      <el-col :span="5.5">
        <span class="department">请选择部门: </span>
        <el-select v-model="label" clearable placeholder="部门">
          <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.label" /> </el-select></el-col>
      <!-- 按发布人查询 -->
      <el-col :span="5"> <el-input v-model="publisher" placeholder="发布人" clearable /></el-col>
      <!-- 按关键字关键字 -->
      <el-col :span="5"> <el-input v-model="department" placeholder="关键字" clearable /></el-col>
      <!-- 查询 -->
      <el-col :span="2">
        <el-button
          type="primary"
          :plain="true"
          size="medium"
          @click="
            getNotice();
          "
        >查询</el-button>
      </el-col>
    </el-row>

    <!-- 公告列表 -->
    <el-table :data="noticeList" border stripe style="width: 100%; top: 20px; margin-bottom: 40px">
      <!-- 部门 -->
      <el-table-column align="center" prop="department" :label="$t('notice.department')" width="250">
        <template slot-scope="scope">
          <div>
            {{ scope.row.department }}
          </div>
        </template>
      </el-table-column>
      <!-- 发布人 -->
      <el-table-column align="center" prop="publisher" :label="$t('notice.publisher')" width="150" />
      <!-- 标题 -->
      <el-table-column align="center" prop="title" :label="$t('notice.title')" width="350">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.title" placement="top">
            <div class="table-title">{{ scope.row.title }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <!-- 公告内容 -->
      <el-table-column align="center" prop="content" :label="$t('notice.content')">
        <template slot-scope="scope">
          <div class="table-content" v-html="scope.row.content">{{ scope.row.content }}</div>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="checkNotice(scope.row.id, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 查看公告弹窗 -->
    <el-dialog :visible.sync="dialogFormVisible" :title="dialogFormContent" width="50%">
      <!-- 弹窗 -->
      <el-form :model="noticeForm">
        <!-- 公告标题 -->
        <h1 class="notice-title">
          {{ noticeForm.title }}
        </h1>
        <!-- 公告内容 -->
        <p class="notice-content" v-html="noticeForm.content">
          {{ noticeForm.content }}
        </p>
        <!-- 发布人 -->
        <div style="padding-top: 50px; padding-left: 70%">
          <el-form-item label="发布人: " prop="publisher" label-width="80px" style="margin-bottom: 0px">
            {{ noticeForm.publisher }}
          </el-form-item>
          <!-- 发布部门 -->
          <el-form-item label="发布部门: " prop="department" abel-width="80px">
            {{ noticeForm.department }}
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
// 公告详情
import { getLookAllBulletin } from '@/api/noticeList'
// 中文枚举
import { DepartmentCname } from '@/constants/departmentName'
export default {
  data() {
    return {
      // 公告列表
      noticeList: [],
      // 按发布人查询
      publisher: '',
      // 按发布部门查询
      department: '',
      options: [
        {
          value: 0,
          label: '助理办'
        },
        {
          value: 1,
          label: '行政人事部'
        },
        {
          value: 2,
          label: '效率服务部'
        },
        {
          value: 3,
          label: '宣传部'
        },
        {
          value: 4,
          label: '资产管理部'
        }
      ],
      label: '',
      dialogFormVisible: false,
      dialogFormContent: '公告详情',
      noticeForm: {
        title: '',
        content: ''
      },
      // 当前页
      currentPage: 1,
      // 设置每页展示的条数
      pageSizes: [10, 20, 30, 40],
      // 展示条数
      pageSize: 10,
      // 总数
      total: 0,

      // 中文枚举
      DepartmentCname
    }
  },

  mounted() {},
  created() {
    this.getNotice()
  },

  methods: {
    /*
		 * 公告详情
		 */
    getNotice() {
      getLookAllBulletin({
        current: this.currentPage,
        size: this.pageSize,
        department: this.label,
        publisher: this.publisher,
        content: this.content
      }).then((res) => {
        this.noticeList = res.data.bulletinIPage.records
        this.total = res.data.bulletinIPage.total
        if (this.noticeList.length === 0) {
          this.$message({
            message: '警告哦,没有这条消息!!!!!',
            type: 'warning'
          })
        }
      })
    },
    /*
		 * 分页
		 */
    handleSizeChange(size, current) {
      this.pageSize = size
      this.currentPage = current
      this.getNotice()
    },
    /**
		 * 改变当前页出发的回调函数
		 */
    handleCurrentChange(current) {
      this.currentPage = current
      this.getNotice()
    },

    /*
		 * 弹窗
		 */
    checkNotice(id, data) {
      this.dialogFormVisible = true
      console.log(data)
      console.log(id)
      if (id) {
        this.noticeForm = { ...data }
      } else {
        this.noticeForm = {}
      }
    }
  }
}
</script>
<style lang="scss" scoped>
// 选择部门
.department {
	white-space: nowrap;
}
.el-button {
	width: 100%;
}
.table-content,
.table-title {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

::v-deep .el-dialog {
	margin-top: 30px;
}
.notice-title {
	font-size: 22px;
	text-align: center;
	color: #8b8f97;
}
.notice-content {
	font-size: 16px;
	color: #8b8f97;
}

.el-dialog__wrapper {
	height: 80%;
	overflow: auto;
}
// 分页
.el-pagination {
	margin-left: 30%;
}
</style>
