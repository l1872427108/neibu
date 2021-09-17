<template>
  <div v-if="logsList.length > 0">
    <el-badge @click.native="visible=true" :is-dot="true" style="">
        <span class="basic-icon basic-icon-cuowurizhi"></span>
    </el-badge>

    <el-dialog :visible.sync="visible" width="80%" append-to-body>
      <div slot="title">
        <span style="padding-right: 10px;">{{$t('err.title')}}</span>
        <el-button size="mini" type="primary" icon="el-icon-delete" @click="clearAll">Clear All</el-button>
      </div>
      <el-table :data="logsList" border>
        <el-table-column align="center" :label="$t('err.message')">
          <template slot-scope="{row}">
            <div class="item">
              <el-tag type="danger">
                {{row.message}}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('err.stack')">
          <template slot-scope="{row}">
            <div class="item">
              <el-tag type="danger">
                {{row.stack}}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('err.info')">
          <template slot-scope="{row}">
            <div class="item">
              <el-tag type="danger">
                {{row.info}}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('err.time')">
          <template slot-scope="{row}">
            <div class="item">
              <el-tag type="danger">
                {{row.time}}
              </el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      visible: false
    };
  },
  computed: {
    ...mapGetters(['logsList'])
  },
  methods: {
    clearAll () {
      this.dialogTableVisible = false;
      this.$store.dispatch('logs/clearErrorLog');
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  overflow: scroll
}
</style>
