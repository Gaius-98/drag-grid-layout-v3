<template>
  <div class="dg-layout" ref="dgLayoutRef">
    <div class="dg-layout-content">
      <div
        class="dg-layout-item"
        v-for="item in list"
        :key="item.id"
        :style="getItemStyle(item)"
        :class="[
          `dg-item-${item.id}`,
          currentPosition.id == item.id ? 'upper-levels' : '',
        ]"
        @click.stop="onClickItem($event, item)">
        <slot :item="item" name="layout-item">
          <div style="width: 100%; height: 100%">
            {{ item.id }}
          </div>
        </slot>
      </div>
      <div
        class="dg-layout-item-shadow"
        :style="getShadowStyle"
        v-show="showShadow"
        ref="shadowRef"></div>
    </div>
    <div class="dg-layout-indicator" v-show="showShadow">
      <div v-for="item in columns" :key="item"></div>
    </div>
    <div
      class="dg-layout-vnode"
      :style="getVnodeStyle"
      ref="dgLayoutVnode"
      v-click-outside="onClickOutside"
      v-if="isSelected">
      <div class="drag" @mousedown.stop="onDrag($event)">
        <slot name="drag-handle">
          <div class="drag-handle">
            <svg
              t="1737028889311"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4464"
              width="16"
              height="16">
              <path
                d="M219.428571 585.142857c-36.571429 0-73.142857 36.571429-73.142857 73.142857s36.571429 73.142857 73.142857 73.142857 73.142857-36.571429 73.142858-73.142857-36.571429-73.142857-73.142858-73.142857z m585.142858-146.285714c36.571429 0 73.142857-36.571429 73.142857-73.142857s-36.571429-73.142857-73.142857-73.142857-73.142857 36.571429-73.142858 73.142857 36.571429 73.142857 73.142858 73.142857zM219.428571 292.571429c-36.571429 0-73.142857 36.571429-73.142857 73.142857s36.571429 73.142857 73.142857 73.142857 73.142857-36.571429 73.142858-73.142857-36.571429-73.142857-73.142858-73.142857z m585.142858 292.571428c-36.571429 0-73.142857 36.571429-73.142858 73.142857s36.571429 73.142857 73.142858 73.142857 73.142857-36.571429 73.142857-73.142857-36.571429-73.142857-73.142857-73.142857zM512 292.571429c-36.571429 0-73.142857 36.571429-73.142857 73.142857s36.571429 73.142857 73.142857 73.142857 73.142857-36.571429 73.142857-73.142857-36.571429-73.142857-73.142857-73.142857z m0 292.571428c-36.571429 0-73.142857 36.571429-73.142857 73.142857s36.571429 73.142857 73.142857 73.142857 73.142857-36.571429 73.142857-73.142857-36.571429-73.142857-73.142857-73.142857z"
                p-id="4465"></path>
            </svg>
          </div>
        </slot>
      </div>
      <slot>
        <div class="vnode-content"></div>
      </slot>
      <div
        class="resize left-line"
        @mousedown.stop="onResize($event, 'horizontal', 'left')"></div>
      <div
        class="resize right-line"
        @mousedown.stop="onResize($event, 'horizontal', 'right')"></div>
      <div
        class="resize top-line"
        @mousedown.stop="onResize($event, 'vertical', 'top')"></div>
      <div
        class="resize bottom-line"
        @mousedown.stop="onResize($event, 'vertical', 'bottom')"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { toRefs, ref, computed, nextTick } from "vue";
  import { getElePosition, compileGridInfo, transformGrid } from "../utils";
  import { clickOutside } from "../utils/direatives";
  const vClickOutside = clickOutside;
  interface DgNodeItem {
    id: string | number;
    rowStart: number;
    colStart: number;
    rowSpan: number;
    colSpan: number;
    [key: string]: any;
  }
  interface Props {
    list: DgNodeItem[];
    gap?: number;
    rowHeight?: number;
    columns?: number;
  }
  const props = withDefaults(defineProps<Props>(), {
    list: () => [],
    gap: 8,
    rowHeight: 10,
    columns: 12,
  });
  const currentPosition = ref({
    left: "0",
    top: "0",
    width: "0",
    height: "0",
    id: "",
  });
  const gridGap = computed(() => {
    return `${gap.value}px`;
  });
  const rowHeightPx = computed(() => {
    return `${rowHeight.value}px`;
  });
  const { list, gap, columns, rowHeight } = toRefs(props);
  const getItemStyle = (item: DgNodeItem) => {
    const { rowSpan, rowStart, colSpan, colStart } = item;
    return {
      gridArea: `${rowStart} / ${colStart} / span ${rowSpan} / span ${colSpan}`,
    };
  };
  const isSelected = ref(false);
  const onClickOutside = () => {
    console.log("clickoutside");
    if (isSelected.value) {
      isSelected.value = false;
    }
  };
  const onClickItem = (e: MouseEvent, rawData: any) => {
    const elPosition = getElePosition(e.target as HTMLElement);
    isSelected.value = true;
    console.log("item");
    currentPosition.value = {
      ...elPosition,
      id: rawData.id,
    };
  };
  const dgLayoutRef = ref();
  const dgLayoutVnode = ref();
  const showShadow = ref(false);
  const onDrag = (event: MouseEvent) => {
    const startX = event.x;
    const startY = event.y;
    const { left, top } = currentPosition.value;
    showShadow.value = true;
    const move = (event: MouseEvent) => {
      const diffY = event.y - startY;
      const diffX = event.x - startX;
      const newLeft = parseFloat(left) + diffX;
      const newTop = parseFloat(top) + diffY;
      currentPosition.value.left = newLeft + "px";
      currentPosition.value.top = newTop + "px";
    };
    const up = () => {
      showShadow.value = false;

      if (getShadowStyle.value?.gridArea) {
        const { rowSpan, rowStart, colSpan, colStart } = compileGridInfo(
          getShadowStyle.value?.gridArea
        )!;

        let idx = list.value.findIndex((e) => e.id == currentPosition.value.id);
        if (idx != -1) {
          list.value[idx].rowSpan = rowSpan;
          list.value[idx].rowStart = rowStart;
          list.value[idx].colSpan = colSpan;
          list.value[idx].colStart = colStart;
        }
        nextTick(() => {
          const dom = document.querySelector(
            `.dg-item-${currentPosition.value.id}`
          ) as HTMLElement;
          currentPosition.value = {
            id: currentPosition.value.id,
            ...getElePosition(dom),
          };
        });
      }
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };
  const onResize = (
    event: MouseEvent,
    type: "vertical" | "horizontal",
    dir: "top" | "left" | "bottom" | "right"
  ) => {
    const startX = event.x;
    const startY = event.y;
    const { width, height, left, top } = currentPosition.value;
    showShadow.value = true;
    const move = (event: MouseEvent) => {
      const diffY = event.y - startY;
      const diffX = event.x - startX;
      if (type === "horizontal") {
        if (dir === "left") {
          const newLeft = parseFloat(left) + diffX;
          currentPosition.value.left = newLeft + "px";
          const newWidth = parseFloat(width) - diffX;
          currentPosition.value.width = newWidth + "px";
        } else {
          const newWidth = parseFloat(width) + diffX;
          currentPosition.value.width = newWidth + "px";
        }
      } else if (type === "vertical") {
        if (dir === "top") {
          const newTop = parseFloat(top) + diffY;
          currentPosition.value.top = newTop + "px";
          const newHeight = parseFloat(height) - diffY;
          currentPosition.value.height = newHeight + "px";
        } else {
          const newHeight = parseFloat(height) + diffY;
          currentPosition.value.height = newHeight + "px";
        }
      }
    };
    const up = () => {
      showShadow.value = false;
      if (getShadowStyle.value?.gridArea) {
        const { rowSpan, rowStart, colSpan, colStart } = compileGridInfo(
          getShadowStyle.value?.gridArea
        )!;
        let idx = list.value.findIndex((e) => e.id == currentPosition.value.id);
        if (idx != -1) {
          list.value[idx].rowSpan = rowSpan;
          list.value[idx].rowStart = rowStart;
          list.value[idx].colSpan = colSpan;
          list.value[idx].colStart = colStart;
        }
        nextTick(() => {
          const dom = document.querySelector(
            `.dg-item-${currentPosition.value.id}`
          ) as HTMLElement;
          const { left, top, width, height } = getElePosition(dom);
          currentPosition.value = {
            left,
            top,
            width,
            height,
            id: currentPosition.value.id,
          };
        });
      }
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };
  const shadowRef = ref();
  const getShadowStyle = computed(() => {
    if (!currentPosition.value.id || !dgLayoutRef.value) return;
    const { width: pWidth } = getElePosition(dgLayoutRef.value);
    const colWidth =
      (parseInt(pWidth) - (columns.value - 1) * gap.value) / columns.value;
    const { left: pLeft, top: pTop } =
      dgLayoutRef.value.getBoundingClientRect();
    const { left, top, width, height } = currentPosition.value;
    const { rowSpan, rowStart, colSpan, colStart } = transformGrid(
      {
        left: `${parseFloat(left) - pLeft}px`,
        top: `${parseFloat(top) - pTop}px`,
        width,
        height,
      },
      {
        rowHeight: rowHeight.value,
        colWidth,
      }
    );

    // console.log(list.value, shadowItem);
    // console.log(getFirstCollision(list.value, shadowItem));
    // const firstCollision = getFirstCollision(list.value, shadowItem);
    // if (firstCollision) {
    //   const { rowSpan, rowStart } = shadowItem;
    //   const rawData = list.value.find((e) => e.id == firstCollision.id);
    //   rawData.rowStart = rowSpan + rowStart;
    // }
    return {
      gridArea: ` ${rowStart} / ${colStart} / span ${rowSpan} / span ${colSpan}`,
    };
  });
  const getVnodeStyle = computed(() => {
    const { left, top, width, height } = currentPosition.value;
    if (!dgLayoutRef.value) {
      return;
    }
    const { left: pLeft, top: pTop } = getElePosition(dgLayoutRef.value);
    const realLeft = parseFloat(left) - parseFloat(pLeft);
    const realTop = parseFloat(top) - parseFloat(pTop);
    return {
      width,
      height,
      top: realTop + "px",
      left: realLeft + "px",
    };
  });
</script>
<style scoped lang="scss">
  .dg-layout {
    width: 100%;
    height: 100%;
    position: relative;

    .dg-layout-content {
      display: grid;
      width: 100%;
      height: 100%;
      gap: 0 v-bind(gridGap);
      grid-auto-rows: auto;
      grid-template-rows: repeat(auto-fill, v-bind(rowHeightPx));
      grid-template-columns: repeat(v-bind(columns), 1fr);

      .dg-layout-item-shadow {
        background-color: #ccc;
      }
      .upper-levels {
        z-index: 99;
      }
    }
    .dg-layout-indicator {
      position: absolute;
      top: 0;
      left: 0;
      display: grid;
      width: 100%;
      height: 100%;
      gap: v-bind(gridGap);
      grid-template-columns: repeat(v-bind(columns), 1fr);
      z-index: -1;
      div {
        background-color: rgba(46, 116, 255, 0.02);
        border: 1px solid rgba(46, 116, 255, 0.15);
      }
    }
    .dg-layout-vnode {
      position: absolute;
      background-color: rgba(46, 116, 255, 0.15);
      z-index: 99;
      .vnode-content {
        width: 100%;
        height: 100%;
      }
      .resize {
        position: absolute;
        &::before {
          display: block;
          content: "";
          background-color: #2e74ff;
        }
        &.right-line {
          top: 0;
          right: 0;
          height: 100%;
          width: 3px;
          cursor: e-resize;
          &::before {
            content: "";
            height: 100%;
            width: 1px;
            margin-left: 2px;
          }
        }
        &.left-line {
          top: 0;
          left: 0;
          height: 100%;
          width: 3px;
          cursor: e-resize;
          &::before {
            height: 100%;
            width: 1px;
          }
        }
        &.bottom-line {
          bottom: 0;
          left: 0;
          height: 3px;
          width: 100%;
          cursor: n-resize;
          &::before {
            height: 1px;
            margin-top: 2px;
            width: 100%;
          }
        }
        &.top-line {
          top: 0;
          left: 0;
          height: 3px;
          width: 100%;
          cursor: n-resize;
          &::before {
            height: 1px;
            width: 100%;
          }
        }
      }
      .drag {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-50%, -50%);
        width: 30px;
        height: 15px;
        border-radius: 5px;
        cursor: grab;
        z-index: 99;
        .drag-handle {
          width: 100%;
          height: 100%;
          background-color: #fff;
          border-radius: 5px;
          text-align: center;
        }
      }
    }
  }
</style>
