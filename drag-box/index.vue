<template>
  <div
    class="drag-box"
    ref="drag-box"
    :style="{
      height: maxHeight * darg_box_width_unit + 'px',
    }"
  >
    <div
      class="drag-item"
      v-for="item in data"
      :key="item.id"
      :style="{
        width: item.w * darg_box_width_unit + 'px',
        height: item.h * darg_box_width_unit + 'px',
        left: item.x * darg_box_width_unit + 'px',
        top: item.y * darg_box_width_unit + 'px',
      }"
      @mousedown="mousedown($event, item)"
    >
      <span
        class="right-bottom"
        @mousedown="mousedownBtn($event, item, 'zoomRB')"
      ></span>
    </div>
  </div>
</template>

<script>
var elementResizeDetectorMaker = require("element-resize-detector");
export default {
  props: {
    static: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      maxHeight: 0,
      darg_box_width_unit: 0, // 内容宽度百分之一的px值
      data: [],
      timeId: null,
      mouseDownInfo: { x: 0, y: 0 }, // 鼠标按下的位置信息
      selectItem: {}, // 选中的模块
      operate: "move", // 移动move，缩放zoom
    };
  },
  mounted() {
    for (var i = 0; i < 10; i++) {
      this.data.push({
        id: i,
        x: i * 10,
        y: 0,
        w: 10,
        h: 10,
      });
    }
    this.init();
    document.onmouseup = () => {
      document.onmousemove = null;
      this.mouseDownInfo = null;
    };
  },
  methods: {
    listenMove() {
      var oldX = this.selectItem.x;
      var oldY = this.selectItem.y;
      var oldW = this.selectItem.w;
      var oldH = this.selectItem.h;
      document.onmousemove = (event) => {
        if (this.operate === "move") {
          // 相对鼠标落下x,y的变化 并换算成在拖拽组件中的单位 darg_box_width_unit
          var newX =
            (event.x - this.mouseDownInfo.x) / this.darg_box_width_unit + oldX;
          var newY =
            (event.y - this.mouseDownInfo.y) / this.darg_box_width_unit + oldY;
          if (newX < 0) {
            newX = 0;
          }
          if (newY < 0) {
            newY = 0;
          }
          if (newX + oldW > 100) {
            newX = 100 - oldW;
          }
          if (newY + oldH > this.maxHeight) {
            newY = this.maxHeight - oldH;
          }
          this.selectItem.x = newX;
          this.selectItem.y = newY;
        } else if (this.operate === "zoomRB") {
          var newW =
            (event.x - this.mouseDownInfo.x) / this.darg_box_width_unit + oldW;
          var newH =
            (event.y - this.mouseDownInfo.y) / this.darg_box_width_unit + oldH;
          if (newW < 1) {
            newW = 1;
          }
          if (newH < 1) {
            newH = 1;
          }
          if (newW + oldX > 100) {
            newW = 100 - oldX;
          }
          if (newH + oldY > this.maxHeight) {
            this.maxHeight = newH + oldY;
          }
          this.selectItem.w = newW;
          this.selectItem.h = newH;
        }
      };
    },
    init() {
      this.getMaxHeight();
      let content = this.$refs["drag-box"];
      if (content) {
        this.darg_box_width_unit = content.offsetWidth / 100;
        var erd = elementResizeDetectorMaker();
        erd.listenTo(content, () => {
          window.clearTimeout(this.timeId);
          this.timeId = setTimeout(() => {
            this.darg_box_width_unit = content.offsetWidth / 100;
            console.log("新darg_box_width_unit值", this.darg_box_width_unit);
          }, 300);
        });
      }
    },
    getMaxHeight() {
      let maxH = 56.25;
      this.data.forEach((v) => {
        if (v.y + v.h > maxH) {
          maxH = v.y + v.h;
        }
      });
      this.maxHeight = maxH;
    },
    mousedown(event, item) {
      this.mouseDown = true;
      this.operate = "move";
      this.selectItem = item;
      this.mouseDownInfo = { x: event.x, y: event.y };
      this.listenMove();
    },
    mousedownBtn(event, item, operate) {
      event.stopPropagation();
      this.mouseDown = true;
      this.operate = operate;
      this.selectItem = item;
      this.mouseDownInfo = { x: event.x, y: event.y };
      this.listenMove();
    },
  },
};
</script>
<style lang="less" scoped>
.drag-box {
  width: 100%;
  position: relative;
  outline: 1px solid pink;
  // box-sizing: border-box;
  .drag-item {
    position: absolute;
    border: 1px solid aqua;
    box-sizing: border-box;
    .right-bottom {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 4px;
      height: 4px;
      border: 1px solid gold;
    }
  }
}
</style>