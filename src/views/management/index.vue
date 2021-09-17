<template>
  <div class="container-wrap">
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark">
        <el-table-column prop="name" align="center" label="名字" min-width="20%">
            <template slot-scope="scope">
            {{ scope.row.name }}
            </template>
        </el-table-column>
        <el-table-column prop="status" align="center" label="状态" min-width="20%">
            <template slot-scope="scope">
            {{ scope.row.status }}
            </template>
        </el-table-column>
        <el-table-column prop="ht" align="center" label="合同" min-width="20%">
            <template slot-scope="scope">
            {{ scope.row.ht }}
            </template>
        </el-table-column>
        <el-table-column prop="bh" align="center" label="编号" min-width="20%" sortable>
            <template slot-scope="scope">
            {{ scope.row.bh }}
            </template>
        </el-table-column>
        <el-table-column
        label="操作"
        min-width="20%"
        align="center"
        >
            <template slot-scope="{row}">
                <div v-if="false">{{row}}</div>
                <el-tooltip class="item" content="编辑" placement="top">
                    <span class="el-icon-edit"></span>
                </el-tooltip>
                <el-tooltip class="item" content="添加" placement="top">
                    <span class="el-icon-delete"></span>
                </el-tooltip>
            </template>
        </el-table-column>
  </el-table>
  </div>
</template>

<script>
import BasicTable from '~/components/Table/BasicTable.vue';
export default {
    components: {
        // BasicTable
    },
    data () {
        return {
            loading: true,
            tableData: [{
                status: '有效',
                name: '王小虎',
                ht: '123',
                bh: '1234333'
             }, {
                status: '有效',
                name: '王小虎',
                ht: '123',
                bh: '1234333'
             }, {
                status: '有效',
                name: '王小虎',
                bh: '1234333',
                ht: '123'
             }, {
                status: '有效',
                name: '王小虎',
                bh: '1234333',
                ht: '123'

             }, {
                status: '有效',
                name: '王小虎',
                bh: '1234333',
                ht: '123'

             }],
            clickIndex: -1
        };
    },
    mounted () {
        // setTimeout(() => {
        //    this.loading = false;
        // }, 2000);
        // api.searchInfo();
        // searchInfo().then(res => {
        //     console.log(res);
        this.fetchData();
        // });
        // window.addEventListener('keydown', this.handleKeyupEvent);
    },
    // beforeDestroy () {
        // window.removeEventListener('keydown', this.handleKeyupEvent);
    // },
    methods: {
        async fetchData () {
            // api.searchInfo();
        }
        // activeIndex (activeIndexNumber) {
        //     this.clickIndex = activeIndexNumber;
        // },

        // handleKeyupEvent (event) {
        //     // event.preventDefault();
        //     if (this.tableData.length === 0) {
        //         return;
        //     }
        //     if (event.keyCode === 38) {
        //         if (this.clickIndex !== 0) {
        //             this.toggleOffset(-1);
        //         }
        //     } else if (event.keyCode === 40) {
        //         if (this.clickIndex !== this.tableData.length - 1) {
        //             this.toggleOffset(1);
        //         }
        //     }
        // },

        // toggleOffset (offset) {
        //     this.clickIndex = this.clickIndex + offset;
        //     this.$refs.multipleTable.setActiveRow(this.tableData[this.clickIndex]);
        // }
    }
};
</script>

<style lang="scss" scoped>
.container-wrap {
    padding: 20px;
    .item {
        margin-right: 10px;
    }
}
</style>
