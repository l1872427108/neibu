<template>
  <div v-if="!item.hidden">
    <el-submenu
      ref="subMenu"
      :index="item.name"
      popper-append-to-body
    >
      <template slot="title">
        <p>{{ item.name }}</p>
      </template>
      <el-menu-item
        v-for="items in item.children"
        :key="items.path"
        :index="'/'+items.path"
        @click="saveNacState(items.name)"
      >
        <template slot="title">
          <i class="el-icon-menu" />
          <span>{{ items.name }}</span>
        </template>
      </el-menu-item>
    </el-submenu>
  </div>
</template>

<script>
export default {
    name: 'SidebarItem',
    props: {
         item: {
            type: Object,
            required: true
        },
    },
    methods: {
        saveNacState (path) {
            this.$router.push({name:path});
        }
    }
};
</script>

<style>

</style>