<template>
  <div class="container-wrap">
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    border>
        <el-table-column prop="name" align="center" label="名字" min-width="30%">
            <template slot-scope="scope">
            {{ scope.row.contractName }}
            </template>
        </el-table-column>
        <el-table-column prop="status" align="center" label="状态" min-width="30%">
            <template slot-scope="scope">
            {{ scope.row.contractStatus | filterStatus }}
            </template>
        </el-table-column>
        <el-table-column prop="ht" align="center" label="合同" min-width="20%">
            <template slot-scope="scope">
            {{ scope.row.contractComplete }}
            </template>
        </el-table-column>
        <el-table-column prop="bh" align="center" label="编号" min-width="30%" sortable>
            <template slot-scope="scope">
            {{ scope.row.contractId}}
            </template>
        </el-table-column>

        <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.contractStatus !== '4'" :disabled="scope.row.contractStatus === '2'" type="success" size="mini" @click="handleClick(scope.row.contractId, scope.row.id, scope.row.contractComplete, scope.row.contractStatus)">
            {{scope.row.contractStatus | messageStatus}}
          </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">
            {{scope.row.contractStatus | terminateStatus}}
          </el-button>
        </template>
      </el-table-column>
  </el-table>
  <contract-dialog v-if="contractComplete" :image="contractComplete" :remote-close="remoteClose" :visible="visible"></contract-dialog>
  </div>
</template>

<script>
import { search, personalContract } from '~/api/contract';
import { filterStatus, messageStatus, terminateStatus } from '~/filters/filter';
import contractDialog from './contractDialog.vue';
import { mapGetters } from 'vuex';
export default {
    components: {
        contractDialog
    },
    data () {
        return {
            loading: true,
            tableData: [],
            visible: false,
            contractComplete: '',
            terminate: 0,
            id: -1
        };
    },
    filters: {
        filterStatus,
        messageStatus,
        terminateStatus
    },
    mounted () {
        this.fetchData();
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    methods: {
        async fetchData () {
            search(this.userInfo.uid).then(res => {
                this.tableData = res.data.PContract;
            });
        },
        handleClick (contractId, id, contractComplete = '', contractStatus) {
            console.log(contractStatus);
            if (!contractComplete || contractStatus === '5') {
                this.$router.push({ name: 'Pdf', query: { contractId, id } });
            } else {
                this.contractComplete = contractComplete;
                this.visible = true;
            }
            this.fetchData();
        },
        handleDelete (id) {
            this.$confirm('解约', {
                confirmButtonText: '解约',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                personalContract(id).then(res => {
                    this.$message.info('已提交解约申请');
                    this.fetchData();
                }).catch(() => {
                    this.$message.info('解约失败');
                });
            }).catch(() => { this.$message.info('取消解约'); });
            this.fetchData();
        },
        remoteClose () {
            this.visible = false;
            this.fetchData();
        }
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
