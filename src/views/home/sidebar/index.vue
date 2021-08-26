<template>
  <div class="fillcontain">
    <el-menu
      background-color="#ccc"
      text-color="#000"
      :unique-opened="false"
      :collapse-transition="false"
      mode="vertical"
      class="fillcontain"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './sidebarItem.vue';

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'routes'
    ])
  }
};
</script>
