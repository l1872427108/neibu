<template>
  <div v-if="!item.hidden">
    <el-submenu
      v-if="'children' in item && item.meta"
      ref="subMenu"
      :index="resolvePath(item.path)"
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
        :index="resolvePath(item.redirect)"
      >
      <template slot="title">
         <i
          class="basic-icon item-icon"
          :class="item.children[0].meta && item.children[0].meta.icon"
        />
        <span>{{ item.children[0].meta && item.children[0].meta.title }}</span>
      </template>
    </el-menu-item>
  </div>
</template>

<script>
import path from 'path';
import { isExternal } from '@/utils/validate';
export default {
    name: 'SidebarItem',
    components: {
    },
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
          if (isExternal(routePath)) {
            return routePath;
          }
          if (isExternal(this.basePath)) {
            return this.basePath;
          }
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
