<template>
  <div id="tags-container" class="tags-container">
    <!-- <scroll-pane> -->
      <router-link
      v-for="(tag, index) in visitedViews"
      :key="index"
      ref="tag"
      class="tags-item"
      :class="isActive(tag)?'active':''"
      :to="tag.path"
    >
      <!-- {{tag}} -->
      {{tag.meta.title}}
      <span class="el-icon-close" />
    </router-link>
    <!-- </scroll-pane> -->
  </div>
</template>

<script>
// import ScrollPane from './ScrollPane';
export default {
  components: {
    // ScrollPane
  },
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
    $route () {
      this.addTags();
      this.moveToCurrentTag();
    }
  },
  methods: {
    isActive (route) {
      return route.path === this.$route.path;
    },
    addTags () {
      this.$store.dispatch('tag/addVisitedView', this.$route);
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
