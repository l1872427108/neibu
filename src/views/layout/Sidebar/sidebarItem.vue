<template>
  <div v-if="!item.hidden">
    <el-submenu
      v-if="'children' in item"
      ref="subMenu"
      :index="item.path"
    >
      <template slot="title">
        <i
          class="basic-icon item-icon"
          :class="item.meta && item.meta.icon"
        />
        <span>{{ item.meta && item.meta.title }}</span>
      </template>
      <el-menu-item
        v-for="items in item.children"
        :key="items.path"
        :index="resolvePath(items.path)"
      >
        <template slot="title">
          <i
            class="basic-icon items-icon"
            :class="items.meta && items.meta.icon"
          />
          <span>{{ items.meta && items.meta.title }}</span>
        </template>
      </el-menu-item>
    </el-submenu>
     <el-menu-item
        v-else
        :index="'/' + item.name"
      >
      <template slot="title">
         <i
          class="basic-icon item-icon"
          :class="item.meta && item.meta.icon"
        />
        <span>{{ item.meta && item.meta.title }}</span>
      </template>
    </el-menu-item>
  </div>
</template>

<script>
import path from 'path';
export default {
    name: 'SidebarItem',
    props: {
         item: {
            type: Object,
            required: true
        },
        basePath: {
          type: String,
          default: ''
        }
    },

    methods: {
        resolvePath (routePath) {
          return path.resolve(this.basePath, routePath);
        }

    }
};
</script>

<style lang="scss">
.item-icon, .items-icon {
  margin-right: 20px;
}
</style>
