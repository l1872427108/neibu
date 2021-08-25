<template>
  <el-color-picker
    v-model="themeVal"
    size="mini"
    style="padding-top: 18px"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
  />
</template>

<script>
export default {
    name: 'TopColor',
    data () {
        return {
            chalk: ""
        };
    }
};
</script>

<style lang="scss" scoped>
.theme-picker .el-color-picker__trigger {
  vertical-align: middle;
}
.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>