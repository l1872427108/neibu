<template>
  <div v-if="!item.hidden">
    <el-submenu
      ref="subMenu"
      :index="item.name"
      popper-append-to-body
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
        :index="resolvePath(item.path)"
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
  </div>
</template>

<script>
import {isExternal} from '~/utils/util';
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
          console.log(routePath);
          if (isExternal(routePath)) {
            return routePath;
          }
          if (isExternal(this.basePath)) {
            return this.basePath;
          }
          return path.resolve(this.basePath, routePath);
        },

    }
};
</script>

<style lang="scss">
.item-icon, .items-icon {
  margin-right: 20px;
}
</style>