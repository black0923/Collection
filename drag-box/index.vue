<template>
  <div
    class="drag"
    ref="drag"
    @contextmenu.prevent.stop="() => false"
    @mousedown.prevent="dragMousedown"
  >
    <div
      class="drag-box"
      ref="drag-box"
      @mousedown.stop="dragMousedown($event, scale)"
      :style="{
        width: 1920,
        height: maxHeight * darg_box_width_unit  * scale + 'px',
        transform: `scale(${scale})`,
      }"
    >
      <div
        class="drag-item"
        v-for="(item, index) in layout"
        :key="item.id"
        :style="{
          width: item.w * darg_box_width_unit + 'px',
          height: item.h * darg_box_width_unit + 'px',
          left: item.x * darg_box_width_unit + 'px',
          top: item.y * darg_box_width_unit + 'px',
          borderColor: isStatic
            ? '#0000'
            : index === currentIndex
            ? '#00e7ff'
            : '',
          zIndex: getZIndex(item),
          backgroundColor:
            ((operate === 'merge' || operate === 'merge-move')&&mergeList.findIndex((v) => v.id === item.id) > -1)
              ? '#87ceeb88'
              : isStatic
              ? '#0000'
              : index === currentIndex
              ? '#00e7ff22'
              : '',
        }"
        @mousedown.stop="mousedown($event, item)"
      >
        <div class="item">
          <div class="element">
            <!-- icon按钮 -->
            <div
              class="del-icon icon"
              :style="{ left: 0, top: 0, display: isStatic ? 'none' : '' }"
              @click.stop="delElement(item, index)"
            >
              <svg-icon icon-class="del" />
            </div>
            <div
              class="update-icon icon"
              :style="{ right: 0, top: 0, display: isStatic ? 'none' : '' }"
              @click.stop="updateElement(item, index)"
            >
              <svg-icon icon-class="icon_编辑" />
            </div>
            <elementItem :elementData="item" :option="item.optionJson" />
          </div>
        </div>
        <span
          v-if="!isStatic"
          class="right-bottom"
          @mousedown="mousedownBtn($event, item, 'zoomRB')"
        ></span>
      </div>
      <div
        class="merge-box"
        v-if="operate === 'merge' || operate === 'merge-move'"
        @mousedown.stop="mergeMousedown"
        :style="{
          width:
            Math.abs(mergeInfo.start_x - mergeInfo.end_x) *
              darg_box_width_unit +
            'px',
          height:
            Math.abs(mergeInfo.start_y - mergeInfo.end_y) *
              darg_box_width_unit +
            'px',
          left:
            (mergeInfo.start_x < mergeInfo.end_x
              ? mergeInfo.start_x
              : mergeInfo.end_x) *
              darg_box_width_unit +
            'px',
          top:
            (mergeInfo.start_y < mergeInfo.end_y
              ? mergeInfo.start_y
              : mergeInfo.end_y) *
              darg_box_width_unit +
            'px',
        }"
      ></div>
    </div>
  </div>
</template>

<script>
var elementResizeDetectorMaker = require("element-resize-detector");
import elementItem from "../pageList/element";
export default {
  components: { elementItem },
  props: {
    isStatic: {
      type: Boolean,
      default: true,
    },
    layout: {
      type: Array,
      default: () => [],
    },
    pageRatio: {
      type: Number,
      default: 0.5,
    },
  },
  watch: {
    "$store.state.setup.currentElement"(val) {
      if (!val) {
        this.currentIndex = -1;
      }
    },
    "$store.state.setup.currentModule": {
      handler(val) {
        this.currentIndex = -1;
        this.$store.commit("SET_currentElement", null);
      },
    },
    layout(val) {
      if (val && val.length) {
      } else {
        this.$store.commit("SET_currentElement", null);
      }
    },
    pageRatio(val) {
      this.getMaxHeight();
      if (this.maxHeight < (1920 * val) / this.darg_box_width_unit) {
        this.maxHeight = (1920 * val) / this.darg_box_width_unit;
      }
    },
    mergeInfo: {
      handler(val) {
        if (!this.toMerge) return;
        window.clearTimeout(this.merge_time_id);
        this.merge_time_id = setTimeout(() => {
          this.mergeList = [];
          for (let i = 0; i < this.layout.length; i++) {
            if (this.isContain(this.layout[i], val)) {
              this.mergeList.push(this.layout[i]);
            }
          }
        }, 300);
      },
      deep: true,
    },
  },
  data() {
    return {
      maxHeight: 0,
      darg_box_width_unit: 19.2, // 内容宽度百分之一的px值
      data: [],
      timeId: null,
      merge_time_id: null,

      mouseDownInfo: { x: 0, y: 0 }, // 鼠标按下的位置信息
      selectItem: {}, // 选中的模块
      mergeList: [], // 选中的模块s
      mergeInfo: {
        start_x: 0,
        start_y: 0,
        end_x: 0,
        end_y: 0,
      },
      mergeOverInfo: {
        start_x: 0,
        start_y: 0,
        end_x: 0,
        end_y: 0,
      },
      // 合并组合的边缘值
      mergeMinMax: {
        minX: Infinity,
        minY: Infinity,
        maxX: 0,
        maxY: 0
      },
      toMerge: false, // 开启组合item
      operate: "move", // 移动move，缩放zoom，合并移动merge merge-move
      currentIndex: -1,
      scale: 1,
    };
  },
  mounted() {
    this.init();
    if (!this.isStatic) {
      document.onmouseup = () => {
        document.onmousemove = null;
        this.mouseDownInfo = null;
        this.mergeOverInfo = JSON.parse(JSON.stringify(this.mergeInfo));
        this.toMerge = false;
        // this.selectItem={}
      };
      // document.onmouseout = () => {
      //   document.onmousemove = null;
      //   this.mouseDownInfo = null;
      // };
    }
  },
  methods: {
    // 判断是否包含
    isContain(item, mergeInfo) {
      // 计算item左上角，右下角坐标
      let Xa1 = item.x;
      let Ya1 = item.y;
      let Xa2 = item.x + item.w;
      let Ya2 = item.y + item.h;
      // 判断merge盒子的左上角，右下角坐标
      let Xb1;
      let Yb1;
      let Xb2;
      let Yb2;
      if (mergeInfo.start_x < mergeInfo.end_x) {
        Xb1 = mergeInfo.start_x;
        Xb2 = mergeInfo.end_x;
      } else {
        Xb1 = mergeInfo.end_x;
        Xb2 = mergeInfo.start_x;
      }
      if (mergeInfo.start_y < mergeInfo.end_y) {
        Yb1 = mergeInfo.start_y;
        Yb2 = mergeInfo.end_y;
      } else {
        Yb1 = mergeInfo.end_y;
        Yb2 = mergeInfo.start_y;
      }

      // | Xb2+Xb1-Xa2-Xa1 | <= Xa2-Xa1 + Xb2-Xb1
      // | Yb2+Yb1-Ya2-Ya1 | <=Y a2-Ya1 + Yb2-Yb1
      return (
        Math.abs(Xb2 + Xb1 - Xa2 - Xa1) <= Xa2 - Xa1 + Xb2 - Xb1 &&
        Math.abs(Yb2 + Yb1 - Ya2 - Ya1) <= Ya2 - Ya1 + Yb2 - Yb1
      );
    },
    getZIndex(item) {
      if (this.selectItem && this.selectItem.id === item.id) {
        return 1000;
      }
      if (item.optionJson && item.optionJson.extJson) {
        try {
          let extJson = JSON.parse(item.optionJson.extJson);
          return extJson.zIndex || (item.elemType === 9 ? 20 : 50);
        } catch (error) {
          return item.elemType === 9 ? 20 : 50;
        }
      } else {
        return item.elemType === 9 ? 20 : 50;
      }
    },
    addElement({ optionJson, elemType, id }) {
      let scrollTop =
        document.getElementsByClassName("currentPage")[0].scrollTop;
      console.log(scrollTop);
      let newY = 0 + scrollTop / this.darg_box_width_unit;
      this.layout.push({
        x: 30,
        y: newY,
        w: 40,
        h: 40,
        optionJson: optionJson,
        elemType: elemType,
        moduleId: this.$store.state.setup.currentModule.id,
        pageId: this.$store.state.setup.currentModule.pageId,
        id,
      });
    },
    // 删除配置
    delElement(item, index) {
      if (item.id) {
        this.$confirm("确认删除该元素?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$message.success("已删除");
          this.layout.splice(index, 1);
          if (index === this.currentIndex) {
            this.currentIndex = -1;
            this.$store.commit("SET_currentElement", null);
          }
        });
      }
    },
    // 更新新的配置
    setNewOption({ optionJson, elemType, id }) {
      console.log(this.layout[this.currentIndex]);
      if (this.layout[this.currentIndex]) {
        this.layout[this.currentIndex].optionJson = optionJson;
        this.layout[this.currentIndex].elemType = elemType;
        console.log(
          this.layout[this.currentIndex],
          "该元素改变了配置",
          this.layout,
          this.currentIndex
        );
        this.currentIndex = -1;
        this.$store.commit("SET_currentElement", null);
        // this.$emit('changeElementOption',{optionJson,elemType,elementIndex:this.currentIndex,moduleId:this.moduleId})
      } else {
        this.addElement({ optionJson, elemType, id });
      }
    },
    // 导出元素列表
    exportElemenet() {
      console.log("导出模块的元素列表", this.layout);
      return JSON.parse(JSON.stringify(this.layout));
    },
    updateElement(item, index) {
      if (
        index === this.currentIndex ||
        this.$store.state.setup.loading.module
      ) {
        return;
      }
      this.currentIndex = index;
      this.currentElement = item;
      this.$store.commit(
        "SET_currentElement",
        JSON.parse(JSON.stringify(item))
      );
    },
    listenMove() {
      if (this.isStatic) {
        return;
      }
      var oldX = this.selectItem.x;
      var oldY = this.selectItem.y;
      var oldW = this.selectItem.w;
      var oldH = this.selectItem.h;
      document.onmousemove = (event) => {
        if (this.operate === "move") {
          // 相对鼠标落下x,y的变化 并换算成在拖拽组件中的单位 darg_box_width_unit
          var newX =
            (event.x - this.mouseDownInfo.x) /
              this.scale /
              this.darg_box_width_unit +
            oldX;
          var newY =
            (event.y - this.mouseDownInfo.y) /
              this.scale /
              this.darg_box_width_unit +
            oldY;
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
            (event.x - this.mouseDownInfo.x) /
              this.scale /
              this.darg_box_width_unit +
            oldW;
          var newH =
            (event.y - this.mouseDownInfo.y) /
              this.scale /
              this.darg_box_width_unit +
            oldH;
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
        } else if (this.operate === "merge") {
          var new_end_X =
            (event.x - this.mouseDownInfo.x) /
              this.scale /
              this.darg_box_width_unit +
            this.mergeInfo.start_x;
          var new_end_Y =
            (event.y - this.mouseDownInfo.y) /
              this.scale /
              this.darg_box_width_unit +
            this.mergeInfo.start_y;
          if (new_end_X < 1) {
            new_end_X = 1;
          }
          if (new_end_Y < 1) {
            new_end_Y = 1;
          }
          if (new_end_X > 100) {
            new_end_X = 100;
          }
          if (new_end_Y > this.maxHeight) {
            new_end_Y = this.maxHeight;
          }
          this.mergeInfo.end_x = new_end_X;
          this.mergeInfo.end_y = new_end_Y;
        } else if (this.operate === "merge-move") {
          var change_X =
            (event.x - this.mouseDownInfo.x) /
            this.scale /
            this.darg_box_width_unit;
          var change_Y =
            (event.y - this.mouseDownInfo.y) /
            this.scale /
            this.darg_box_width_unit;

          if (this.mergeMinMax.minX + change_X < 0) {
            change_X = -this.mergeMinMax.minX;
          }
          if (this.mergeMinMax.minY + change_Y < 0) {
            change_Y = -this.mergeMinMax.minY;
          }
          if (this.mergeMinMax.maxX + change_X > 100) {
            change_X = 100 - this.mergeMinMax.maxX;
          }
          if (this.mergeMinMax.maxY + change_Y > this.maxHeight) {
            change_Y = this.maxHeight - this.mergeMinMax.maxY;
          }
          this.mergeInfo.start_x = this.mergeOverInfo.start_x + change_X;
          this.mergeInfo.end_x = this.mergeOverInfo.end_x + change_X;
          this.mergeInfo.start_y = this.mergeOverInfo.start_y + change_Y;
          this.mergeInfo.end_y = this.mergeOverInfo.end_y + change_Y;
          for (let index = 0; index < this.mergeList.length; index++) {
            const element = this.mergeList[index];
            element.x = element.oldX + change_X;
            element.y = element.oldY + change_Y;
          }
        }
      };
    },
    init() {
      this.getMaxHeight();
      let box = this.$refs["drag"];
      let content = this.$refs["drag-box"];
      if (box && content) {
        // content.style.transform = "scale(" + box.offsetWidth / 1920 + ")";
        this.scale = box.offsetWidth / 1920;
        var erd = elementResizeDetectorMaker();
        erd.listenTo(content, () => {
          window.clearTimeout(this.timeId);
          this.timeId = setTimeout(() => {
            // content.style.transform = "scale(" + box.offsetWidth / 1920 + ")";
            this.scale = box.offsetWidth / 1920;
          }, 300);
        });
      }
    },
    getMaxHeight() {
      let maxH = (1920 * this.pageRatio) / this.darg_box_width_unit;
      this.layout.forEach((v) => {
        if (v.y + v.h > maxH) {
          maxH = v.y + v.h;
        }
      });
      this.maxHeight = maxH;
    },
    /**
     * @scale Number 当前相对的target是否被缩放，值为缩放比例
     */
    dragMousedown(event, scale = 1) {
      this.selectItem = {};
      this.mergeList = [];
      this.operate = "";
      if (event.button === 2) {
        let unit = event.target.clientWidth / 100;
        this.mergeInfo.start_x = (event.offsetX / unit) * scale;
        this.mergeInfo.start_y = (event.offsetY / unit) * scale;
        this.mergeInfo.end_x = (event.offsetX / unit) * scale;
        this.mergeInfo.end_y = (event.offsetY / unit) * scale;
        this.mouseDown = true;
        this.toMerge = true;
        this.operate = "merge";
        this.mouseDownInfo = { x: event.x, y: event.y };
        this.listenMove();
      }
    },
    mousedown(event, item) {
      if (event.button === 0) {
        event.stopPropagation(); // 阻止冒泡
        if((this.operate === 'merge' || this.operate === 'merge-move')&&this.mergeList.findIndex((v) => v.id === item.id) > -1){
          this.mergeMousedown(event)
          return
        }
        this.mouseDown = true;
        this.operate = "move";
        this.selectItem = item;
        this.mouseDownInfo = { x: event.x, y: event.y };
        this.listenMove();
      }
    },
    mergeMousedown(event) {
      if (event.button === 0) {
        event.stopPropagation(); // 阻止冒泡
        this.mouseDown = true;
        this.operate = "merge-move";
        this.mouseDownInfo = { x: event.x, y: event.y };
        this.mergeMinMax.minX = Infinity;
        this.mergeMinMax.minY = Infinity;
        this.mergeMinMax.maxX = 0;
        this.mergeMinMax.maxY = 0;
        for (let index = 0; index < this.mergeList.length; index++) {
          const item = this.mergeList[index];
          item.oldX = item.x;
          item.oldY = item.y;
          if (item.x < this.mergeMinMax.minX) {
            this.mergeMinMax.minX = item.x;
          }
          if ((item.x+item.w) > this.mergeMinMax.maxX) {
            this.mergeMinMax.maxX = item.x+item.w;
          }
          if (item.y < this.mergeMinMax.minY) {
            this.mergeMinMax.minY = item.y;
          }
          if (item.y+item.h > this.mergeMinMax.maxY) {
            this.mergeMinMax.maxY = item.y+item.h;
          }
        }
        console.log(this.mergeMinMax);
        this.listenMove();
      }
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
.item {
  height: 100%;
  box-sizing: border-box;
  // padding: 4px;
  &.current {
    box-shadow: 0 0 6px 6px red;
  }
  .element {
    height: 100%;
    //  background-color: pink;
    // border: 1px double #ffffff32;
    position: relative;
    .icon {
      position: absolute;
      display: none;
      font-size: 12px;
      z-index: 99;
      cursor: pointer;
      padding: 4px;
    }
    &:hover {
      .icon {
        display: block;
      }
    }
  }
}
.drag-box {
  // width: 100%;
  position: relative;
  transform-origin: 0 0;
  // outline: 1px solid pink;
  // box-sizing: border-box;
  .drag-item {
    position: absolute;
    border: 1px solid #0000;
    &:hover {
      border-color: #cdcfd988;
    }
    box-sizing: border-box;
    background-color: #00000008;
    .right-bottom {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 6px;
      height: 6px;
      border-right: 2px solid gold;
      border-bottom: 2px solid gold;
      z-index: 2000;
      cursor: se-resize;
    }
  }
  .merge-box {
    background-color: #7aacd722;
    border: 2px dashed #7aacd7;
    position: absolute;
    width: 0;
    height: 0;
    z-index: 1001;
  }
}
</style>
