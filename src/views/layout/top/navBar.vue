<template>
  <div class="layout-navbars-container">
    <NavBarItem></NavBarItem>
    <TagView></TagView>
  </div>
</template>

<script>
// import { mapGetters, mapState } from 'vuex';
// import Breadcrumb from '~/components/Breadcrumb';
// import topLogs from './topLogs.vue';
// import { fullscreenToggel, listenerfullscreen } from '~/utils/util';
// import topLang from './topLang.vue';
import TagView from '../TagsView/index';
import NavBarItem from './navBarItem.vue';
export default {
    components: {
        // topLogs,
        // Breadcrumb,
        TagView,
        NavBarItem
        // topLang
    }
};
</script>

<style scoped lang="scss">
.layout-navbars-container {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
}
</style>
