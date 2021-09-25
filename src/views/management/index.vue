<template>
  <div class="container-wrap">
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    border>
        <el-table-column prop="name" align="center" label="合同名">
            <template slot-scope="scope">
            {{ scope.row.contractName }}
            </template>
        </el-table-column>
        <el-table-column prop="status" align="center" label="状态">
            <template slot-scope="scope">
            <el-tag :type="scope.row.contractStatus | classStatus">{{ scope.row.contractStatus | filterStatus }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="ht" align="center" label="合同地址">
            <template slot-scope="scope">
            {{ scope.row.contractComplete }}
            </template>
        </el-table-column>
        <el-table-column prop="bh" align="center" label="合同编号" sortable>
            <template slot-scope="scope">
            {{ scope.row.contractId}}
            </template>
        </el-table-column>

        <el-table-column min-width="130%" align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.contractStatus !== '4'" :disabled="scope.row.contractStatus === '2' || scope.row.contractStatus === '3' || scope.row.contractStatus === '4'" type="success" size="mini" @click="handleClick(scope.row.contractId, scope.row.id, scope.row.contractComplete, scope.row.contractStatus, scope.row.contractName)">
            {{scope.row.contractStatus | messageStatus}}
          </el-button>
          <el-button :disabled="scope.row.contractStatus === '4' || scope.row.contractStatus === '0' || scope.row.contractStatus === '5' || scope.row.contractStatus === '3' || scope.row.contractStatus === '2'" type="danger" size="mini" @click="handleDelete(scope.row.id)">
            {{scope.row.contractStatus | terminateStatus}}
          </el-button>
          <el-button :disabled="scope.row.contractStatus !== '1'" type="primary" size="mini" @click="handlePay()" v-if="scope.row.contractStatus !== '4' || !scope.row.contractPrice">
            查看订单
          </el-button>
        </template>
      </el-table-column>
  </el-table>
  <contract-dialog :title="contract.title" v-if="contractComplete" :image="contractComplete" :remote-close="remoteClose" :visible="contract.visible"></contract-dialog>
  </div>
</template>

<script>
import { search, personalContract } from '~/api/contract';
import { filterStatus, messageStatus, terminateStatus, classStatus } from '~/filters/filter';
import contractDialog from './contractDialog.vue';
import { mapGetters } from 'vuex';
import {
  Cookie,
  Key
} from '~/utils/cookie';
export default {
    components: {
        contractDialog
    },
    data () {
        return {
            tableData: [],
            contractComplete: '',
            contract: {
                visible: false,
                title: ''
            }
        };
    },
    filters: {
        filterStatus,
        messageStatus,
        terminateStatus,
        classStatus
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
            }).catch(() => {
                this.tableData = [];
                this.$message.error('合同请求失败');
            });
        },
        handleClick (contractId, id, contractComplete = '', contractStatus, contractName) {
            if (!contractComplete || contractStatus === '5') {
                this.$router.push({ name: 'Contract', query: { contractId, id } });
            } else {
                this.contract.visible = true;
                this.contract.title = contractName;
                this.contractComplete = contractComplete;
            }
            this.fetchData();
        },
        handlePay () {
            this.$router.push('/pay/center');
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
            this.contract.visible = false;
            this.fetchData();
        }
    }
};
</script>

<style lang="scss" scoped>
.container-wrap {
    padding: 20px;
}
</style>
