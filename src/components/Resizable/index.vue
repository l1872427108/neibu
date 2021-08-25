<template>
  <div>
    <div
      ref="resizable"
      class="resizable"
    >
      <slot />
    </div>

    <div
      id="line"
      ref="moveDom"
      class="drag-line"
      @mousedown="handleMouseDown"
    />
  </div>
</template>

<script>
export default {
    props: {
        minHeight: {
            type: Number,
            default: 500
        },
        maxHeight: {
            type: Number,
            default: 1000
        }
    },

    data () {
        return {
            isMove: false,
            triggerLeftOffset: 0,
            basicSlot: null
        };
    },

    mounted () {
        this.$nextTick(() => {
            this.basicSlot = this.$refs.basicSlot;
            this.basicSlot.style.height = this.minHeight + 'px';
        });
    },

    methods: {
        handleMouseDown (e) {
            this.isMove = true;
            document.addEventListener('mousemove', this.handleMouseMove);
            document.addEventListener('mouseup', this.handleMouseUp);
            this.triggerLeftOffset = e.clientY - e.srcElement.getBoundingClientRect().top;
        },

        handleMouseMove (e) {
            if (this.isMove) {
            setTimeout(() => {
                    this.moveHandle(e.clientY, this.basicSlot);
                }, 0);
            }
            return false;
        },

        handleMouseUp () {
            if (!this.isMove) return false;
            this.isMove = false;
            document.removeEventListener('mousemove', this.handleMouseMove);
            document.removeEventListener('mouseup', this.handleMouseUp);
            return false;
        },

        moveHandle (nowClient, topDom) {
             const clientHeight = 60 + this.triggerLeftOffset + 48;
            let changeHeight = nowClient - clientHeight;
            changeHeight = this.getOffsetY(changeHeight, this.minHeight, this.maxHeight);
            topDom.style.height = changeHeight + 'px';
        },

        getOffsetY (offset, min, max) {
            if (offset < min) {
                offset = min;
            } else if (offset > max) {
                offset = max;
            }
            return offset;
        }
    }
};
</script>

<style lang="scss" scoped>
.drag-line {
  height: 10px;
  width: 100%;
    background: #f1f5fb;
    cursor: row-resize;
    user-select: none;
    transform: translateZ(0);
}
.wrap {
   overflow: hidden;
}
</style>