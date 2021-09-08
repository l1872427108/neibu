<template>
  <div class="basic-table">
    <el-table
        ref="table"
        border
        :data="data"
        :max-height="maxHeight"
        v-bind="$attrs"
        v-on="$listeners"
        v-loading="listLoading"
        element-loading-text="拼命加载中"
        :row-class-name="rowClassName"
        @row-click="setActiveRow"
    >
        <template slot="empty">
            <img class="image" :src="emptyImg" alt="">
            <p>暂无数据</p>
        </template>
        <slot />
    </el-table>
  </div>
</template>

<script>
import { addResizeListener, removeResizeListener } from '~/utils/addEventListener';
import commonSite from '~/config/common';
export default {
    props: {
        data: {
            type: Array,
            default: () => {
                return [];
            },
            required: true
        },
        listLoading: {
            type: Boolean,
            default: true,
            required: true
        },
        paddingBottom: {
            type: Number,
            default: 0,
            required: true
        },
        showRowClass: {
            type: Boolean,
            default: true,
            required: false
        }
    },
    data () {
        return {
            maxHeight: 0,
            headerHeight: 65,
            emptyImg: commonSite.emptyImg,
            clickRowIndex: -1
        };
    },

    mounted () {
        addResizeListener(this.$el, this.updateTableHeight);
        this.$nextTick(() => {
            this.updateTableHeight();
        });
    },

    methods: {
        updateTableHeight () {
            this.maxHeight = window.innerHeight - (20 + this.paddingBottom + this.headerHeight);
        },

        rowClassName ({ row, rowIndex }) {
            row.index = rowIndex;
            if (row.index === this.clickRowIndex && this.showRowClass) {
                return 'success-row';
            }
            this.$emit('activeIndex', this.clickRowIndex);
        },

        setActiveRow (row) {
            this.clickRowIndex = row.index;
        }
    },

    beforeDestroy () {
        removeResizeListener(this.$el, this.updateTableHeight);
    },

    watch: {
        data: {
            handler () {
                this.updateTableHeight();
            },
            deep: true
        }
    }
};
</script>

<style lang="scss" scoped>
.image {
    margin-top: 20px;
}

::v-deep .el-table .success-row {
    background: #f5f7fa;
}
</style>
