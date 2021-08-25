<template>
  <el-table-column
    width="50"  
  >
    <template #header>
      <el-checkbox
        v-model="checkCurrentAll"
        :indeterminate="checkAllIndeterminate"
        @change="onCheckCurrentAllChange"
      />
    </template>
    <template
      v-if="bindData[$index]"
      slot-scope="{ $index }"
    >
      <el-checkbox
        v-model="bindData[$index].select"
        @change="onCheckChange($index, $event)"
      />
    </template>
  </el-table-column>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => {
                return [];
            },
            required: true
        },

        rowKey: {
            type: String,
            required: false,
            default: 'id'
        },

        checkAllId: {
            type: Array,
            default: () => {
                return [];
            },
            required: true
        }
    },

    data () {
        return {
            selected: [],
            checkCurrentAll: false,
            checkAllIndeterminate: false
        };
    },

    computed: {
        bindData: {
            get () {
                return this.data;
            }
        }
    },
    watch: {
        data () {
            this.checkPageStatus();
        }
    },

    methods: {
        setCheckAll () {
            if (this.checkAll) {
                this.selected = this.allDataId;
                this.checkCurrentAll = true;
                this.$nextTick(() => {
                    this.bindData.forEach(row => {
                        row.select = true;
                    });
                });
            } else {
                this.$nextTick(() => {
                    this.selected = [];
                    this.checkCurrentAll = false;
                    this.bindData.forEach(row => {
                        row.select = false;
                    });
                });
            }
        },

        onCheckCurrentAllChange (val) {
            this.bindData.forEach((row, index) => {
                this.onCheckChange(index, val);
            });
        },

        onCheckChange (index, val) {
            const row = this.bindData[index];
            const key = this.getRowKeyValue(row);
            const keyIndex = this.selected.indexOf(key);
            if (val && keyIndex < 0) {
            this.selected.push(key);
            }
            if (!val && keyIndex > -1) {
            this.selected.splice(keyIndex, 1);
            }
            this.$set(this.bindData[index], 'select', val);
            this.setCurrentAllStatus();
            this.$emit('select', this.selected);
        },

        setCurrentAllStatus () {
            this.checkCurrentAll = this.bindData.every(item => item.select);
            this.checkAllIndeterminate = this.checkCurrentAll ? false : this.bindData.some(item => item.select);
        },

        checkPageStatus () {
            this.bindData.forEach(row => {
                row.select = this.selected.findIndex(item => item === row[this.rowKey]) >= 0;
            });
            this.setCurrentAllStatus();
        },

        getRowKeyValue (row) {
            return row[this.rowKey];
        }
    }
};
</script>