<template>
  <i
    :class="classes"
    :style="styles"
  />
</template>

<script>
const prefixClass = 'basic-icon';
export default {
  props: {
    type: {
      type: String,
      default: () => ''
    },
    size: {
      type: [Number, String],
      default: () => {
        return [] || '';
      }
    },
    color: {
      type: String,
      default: () => ''
    },
    fontStyle: {
      type: String,
      default: () => 'normal'
    }
  },
  computed: {
    classes: {
      get () {
        return `${prefixClass} ${prefixClass}-${this.type}`;
      }
    },
    styles: {
      get () {
        const style = {};
        style['font-style'] = 'normal';
        if (this.size) {
          style['font-size'] = `${this.size}rem`;
        }
        if (this.fontStyle) {
          style['font-style'] = this.fontStyle;
        }
        if (this.color) {
          style.color = this.color;
        }
        return style;
      }
    }
  }
};
</script>

<style scoped>
  @import "../../assets/iconfont/iconfont.css";
</style>
