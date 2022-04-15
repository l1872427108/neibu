<template>
  <div class="box">
    <!-- 搜索和收藏 -->
    <div class="block">
      <!-- 左侧搜索 -->
      <div class="leftsearch">
        <el-input
          size="medium"
          placeholder="请输入文件名"
          v-model="fileName"
          class="input-with-select"
        >
          <el-select
            v-model="select"
            @click="searchlabels(select)"
            slot="prepend"
            placeholder="请选择"
            style="width: 100px"
          >
            <el-option label="全体" value="1"></el-option>
            <el-option label="前端" value="2"></el-option>
            <el-option label="后端" value="3"></el-option>
            <el-option label=" " value="4"></el-option>
          </el-select>
          <el-button
            @click="searchfiles(fileName)"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </div>
      <!--右侧我的收藏 -->
      <div class="rightbutton">
        <el-button @click="switchTo('sharedfile')" type="primary"
          > {{ $t('fileSharing.SharingFile') }} </el-button
        >
      </div>
    </div>
    <!-- 表格 -->
    <el-table :data="resp" style="width: 100%" border>
      <el-table-column type="index" align="center"  :label="$t('fileSharing.Number')" width="80" />
      <el-table-column prop="fileName" align="center" :label="$t('fileSharing.FileName')" />
      <el-table-column prop="label" align="center"    :label="$t('fileSharing.Label')" />
      <el-table-column
        prop="summary"
        align="center"
        :label="$t('fileSharing.FileDescription')"
        width="330"
      />
      <el-table-column prop="gmtModified" align="center" :label="$t('fileSharing.UploadTime')" />
      <el-table-column prop="authorName" align="center" :label="$t('fileSharing.Uploader')" />
      <el-table-column :label="$t('fileSharing.Operation')" align="center">
        <template slot-scope="scope">
          <!-- :disabled="scope.row.status  ===  '0'  ?  true : false " -->
          <el-button
            size="mini"
            type="warning"
            @click="deletecollectfiles(scope.row.id)"
            >取消收藏</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- <div class="paging">
			<el-pagination
				:current-page="current"
				:page-sizes="[10, 15, 20, 25]"
				:page-size="size"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div> -->
  </div>
</template>

<script>
import {
  queryAlCollectionlFiles,
  cancelCollection,
  queryPaging,
} from "~/api/sharedFile";
// 封装的事件处理工具
import "~/utils/util.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // 搜索
      fileName: "",
      select: "",
      resp: [],
      status: "",
      pojo: {
        id: "",
        authorName: "",
        fileName: "",
        summary: "",
        label: "",
        gmtCreate: "",
        gmtModified: "",
        summary: "",
        status: "",
      },
      // 分页相关
      // 每一个页面
      // current: 1,
      // // 每页条数
      // size: 10,
      // // 总数
      // total: 0,
      userId: "",
	  // 过滤器

    };
  },
  created() {
    this.featchData();
  },
  activated() {
    this.featchData();
  },
  // 获取用户id
  computed: {
    ...mapGetters(["userInfo"]),
  },
 // 局部过滤器    
//   filters: {
//     nullfilter:function(pojo) {
//       if(pojo === null) {
// 		  return '';
// 	  }
// 	  value.replace();
//     },
//   },
  methods: {
    // 路由跳转方法
    switchTo() {
      this.$router.go(-1);
    },
    // 查询例会
    featchData() {
      queryAlCollectionlFiles(this.userInfo.uid).then((response) => {
		// this.resp = this.filters
		const file = response.data.files;
        this.resp = file.filter(item => {
			return item
		})
		
      });
    },
    /**
     * 分页组件,当每页条数改变后，调用
     * */
    // handleSizeChange(val) {
    // 	this.size = val;
    // 	// console.log(`每页 ${val} 条`);
    // 	this.featchData();
    // },
    /**
     * 当前页码改变后调用
     */
    // handleCurrentChange(val) {
    // 	this.current = val;
    // 	// console.log(`当前页: ${val}`);
    // 	this.featchData();
    // },
    // 取消收藏文件
    deletecollectfiles(id) {
      this.$confirm("您确认收藏这个文件吗？", "提示", {
        confirmButtonText: "确认",
        concelButtonText: "取消",
        type: "warning",
        center: true,
      }).then(() => {
        cancelCollection({ fileId: id, userId: this.userInfo.uid }).then(
          (response) => {
            // console.log(response);
            this.$message({
              type: "warning",
              message: "取消收藏成功!",
            });
            this.featchData();
          }
        );
      });
    },
    // 根据文件名搜索
    searchfiles(fileName) {
      queryPaging({
        current: this.current,
        size: this.size,
        fileName: this.fileName,
      }).then((response) => {
        console.log(fileName);
        const data = response.data.fileIPage;
        //  总条数
        this.total = data.total;
        this.resp = data.records;
      });
    },
    // 根据label标签搜索
    searchlabels(select) {
      queryPaging({
        current: this.current,
        size: this.size,
        select: this.select,
      }).then((response) => {
        console.log(select);
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