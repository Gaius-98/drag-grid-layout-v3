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
        @click="onClickItem($event, item)">
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
    <div class="dg-layout-vnode" :style="getVnodeStyle" ref="dgLayoutVnode">
      <div class="drag" @mousedown.stop="onDrag($event)">
        <slot name="drag-handle">
          <svg
            t="1737017923639"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4419"
            width="16"
            height="16">
            <path
              d="M501.0944 1021.824c6.9376 2.8928 14.8224 2.8928 21.8112 0 3.4304-1.4336 6.528-3.4816 9.1136-6.0672 0.0256 0 0.0768-0.0256 0.0768-0.0256l158.9248-158.9248c11.1104-11.1104 11.1104-29.1328 0-40.2176-11.0848-11.0848-29.0816-11.0848-40.1664 0.0256l-110.4384 110.4128 0.0256-335.36c0-15.6928-12.7232-28.416-28.416-28.416s-28.416 12.6976-28.416 28.3904l0 335.3856-110.4128-110.4128c-11.1104-11.0848-29.1072-11.0848-40.1408 0-11.1104 11.1104-11.136 29.1072-0.0512 40.192l158.9504 158.9248c0.8192 0.8192 1.8944 1.1776 2.816 1.8688C496.7168 1019.1872 498.688 1020.8256 501.0944 1021.824z"
              fill="#1296db"
              p-id="4420"></path>
            <path
              d="M522.9056 2.176c-6.9376-2.8928-14.8224-2.8928-21.7856 0C497.6896 3.584 494.592 5.632 491.9808 8.2176c-0.0256 0-0.0768 0.0512-0.0768 0.0512L332.9792 167.168c-11.1104 11.1104-11.1104 29.1328 0 40.2176 11.0848 11.0848 29.0816 11.0848 40.1664-0.0256l110.4384-110.4128-0.0256 335.36c0 15.6928 12.7232 28.416 28.416 28.416 15.6928 0 28.4416-12.6976 28.4416-28.3904L540.416 96.9472l110.4128 110.4128c11.1104 11.0848 29.1072 11.0848 40.1408 0 11.1104-11.1104 11.1616-29.1072 0.0512-40.192l-158.9504-158.8992c-0.8192-0.8448-1.8944-1.2032-2.816-1.8944C527.2832 4.8128 525.312 3.1744 522.9056 2.176z"
              fill="#1296db"
              p-id="4421"></path>
            <path
              d="M1021.824 522.9056c2.8928-6.9376 2.8928-14.8224 0-21.8112-1.408-3.4304-3.456-6.528-6.0416-9.1136 0-0.0256-0.0512-0.0768-0.0512-0.0768l-158.8992-158.9248c-11.1104-11.1104-29.1584-11.1104-40.2432 0-11.0592 11.0848-11.0592 29.0816 0.0512 40.1664l110.3872 110.4384-335.36-0.0256c-15.6928 0-28.3904 12.7232-28.3904 28.416s12.6976 28.416 28.3904 28.416l335.36 0-110.3872 110.4128c-11.1104 11.1104-11.1104 29.1072 0 40.1408 11.1104 11.1104 29.1072 11.136 40.192 0.0512l158.8992-158.9504c0.8448-0.8192 1.2032-1.8944 1.8944-2.816C1019.1872 527.2832 1020.8256 525.312 1021.824 522.9056z"
              fill="#1296db"
              p-id="4422"></path>
            <path
              d="M2.176 501.0944c-2.8928 6.9376-2.8928 14.8224 0 21.7856 1.408 3.456 3.456 6.5536 6.0416 9.1392l0.0512 0.0512 158.8992 158.9504c11.1104 11.1104 29.1584 11.1104 40.2432 0 11.0592-11.1104 11.0592-29.1072-0.0512-40.192l-110.3872-110.4384 335.36 0.0512c15.6928 0 28.3904-12.7488 28.3904-28.416 0-15.6928-12.6976-28.4416-28.3904-28.4416l-335.36 0.0256 110.3872-110.4128c11.1104-11.1104 11.1104-29.1072 0-40.1408-11.1104-11.1104-29.1072-11.1616-40.192-0.0512l-158.8992 158.9504c-0.8448 0.8192-1.2032 1.8944-1.8944 2.816C4.8128 496.7168 3.1744 498.688 2.176 501.0944z"
              fill="#1296db"
              p-id="4423"></path>
          </svg>
        </slot>
      </div>
      <div class="vnode-content" ref="VNodeContent"></div>
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
  let cloneDom;
  const getItemStyle = (item: DgNodeItem) => {
    const { rowSpan, rowStart, colSpan, colStart } = item;
    return {
      gridArea: `${rowStart} / ${colStart} / span ${rowSpan} / span ${colSpan}`,
    };
  };
  const VNodeContent = ref();

  const onClickItem = (e: MouseEvent, rawData: any) => {
    const elPosition = getElePosition(e.target as HTMLElement);
    cloneDom = (e.target as HTMLElement)?.cloneNode(true) as HTMLElement;
    VNodeContent.value.innerHTML = "";
    VNodeContent.value.appendChild(cloneDom);
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
        right: 0;
        top: 0;
        width: 20px;
        height: 10px;
        border-radius: 5px;
        cursor: grab;
      }
    }
  }
</style>
