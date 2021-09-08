<template>
  <div id="tags-container" class="tags-container">
      <router-link
      v-for="(tag, index) in visitedViews"
      :key="index"
      ref="tag"
      class="tags-item"
      :class="isActive(tag)?'active':''"
      :to="tag.path"
    >
      {{tag.meta.title}}
      <span @click="closeTag(tag)" class="el-icon-close" />
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    };
  },
  computed: {
    visitedViews () {
      return this.$store.state.tag.visitedViews;
    }
  },
  watch: {
    $route: {
      handler () {
        this.addTags();
        this.moveToCurrentTag();
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    isActive (route) {
      return route.path === this.$route.path;
    },
    addTags () {
      this.$store.dispatch('tag/addVisitedView', this.$route);
    },
    closeTag (view) {
      this.$store.dispatch('tag/delVisitedView', view).then(res => {
        // console.log(res);
      });
    },
    moveToCurrentTag () {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag);
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('tag/updateVisitedView', this.$route);
            }
            break;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tags-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
        margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      background-color: #409EFF;
      color: #fff;
      border-color: #409EFF;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 2px;
      }
    }
  }
}
</style>
