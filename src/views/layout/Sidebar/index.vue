<template>
  <el-aside class="layout-aside" :class="setCollapseWidth" v-if="clientWidth > 1000">
    <el-scrollbar
      class="flex-auto"
    >
      <Vertical :menuList="menuList" :class="setCollapseWidth"></Vertical>
    </el-scrollbar>
  </el-aside>
  <el-drawer v-else :visible.sync="themeConfig.isCollapse" :with-header="false" direction="ltr" size="220px">
    <el-aside class="layout-aside w100 h100">
			<el-scrollbar class="flex-auto">
				<Vertical :menuList="menuList"></Vertical>
			</el-scrollbar>
		</el-aside>
  </el-drawer>
</template>

<script>
import { mapGetters } from 'vuex';
import Vertical from './mode/vertical.vue';

export default {
  components: { Vertical },
  data () {
    return {
      clientWidth: 0
    };
  },
  computed: {
    ...mapGetters([
      'isCollapse',
      'menuList',
      'themeConfig'
    ]),
    // 设置左侧菜单的具体宽度
    setCollapseWidth () {
      let { layout, isCollapse } = this.themeConfig;
      let asideBrColor = '';
      layout = 'classic' || layout === 'columns' ? (asideBrColor = 'layout-el-aside-br-color') : '';
      if (layout === 'columns') {
        if (isCollapse) {
          return ['layout-aside-width1', asideBrColor];
        }
          return ['layout-aside-width-default', asideBrColor];
      }
        if (isCollapse) {
          return ['layout-aside-width64', asideBrColor];
        }
          return ['layout-aside-width-default', asideBrColor];
    }
  },
  created () {
    this.initMenuFixed(document.body.clientWidth);
    this.$bus.$on('layoutMobileResize', (res) => {
      this.initMenuFixed(res.clientWidth);
    });
  },
  methods: {
    initMenuFixed (clientWidth) {
      this.clientWidth = clientWidth;
    }
  }
};
</script>
