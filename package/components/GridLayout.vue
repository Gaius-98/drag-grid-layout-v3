<template>
  <div class="dg-layout" ref="dgLayoutRef">
    <div class="dg-layout-content">
      <div
        class="dg-layout-item"
        v-for="item in list"
        :key="item.key"
        :style="getItemStyle(item)"
        :class="`dg-item-${item.id}`"
        @mouseenter="hoverItem($event, item)">
        <slot>
          <div style="width: 100%; height: 100%">
            {{ item.id }}
          </div>
        </slot>
      </div>
      <div
        class="dg-layout-item-shadow"
        :style="getShadowStyle"
        v-show="showShadow"
        ref="shadowRef">
        {{ currentPosition }}
      </div>
    </div>
    <div class="dg-layout-indicator">
      <div v-for="item in columns" :key="item"></div>
    </div>
    <div
      class="dg-layout-vnode"
      :style="getVnodeStyle"
      ref="dgLayoutVnode"
      @mousedown.stop="onDrag($event)">
      <div class="resize right-line" @mousedown.stop="onResize($event)"></div>
      <div class="resize bottom-line" @mousedown.stop="onResize($event)"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, toRefs, ref, computed, StyleValue } from "vue";
  import {
    getElePosition,
    position2Grid,
    compileGridInfo,
    getRelativePosition,
  } from "../utils";
  interface Props {
    list: any[];
    gap?: number;
    columns?: number;
  }
  const props = withDefaults(defineProps<Props>(), {
    list: () => [],
    gap: 8,
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
  const { list, gap, columns } = toRefs(props);
  const getItemStyle = (item) => {
    const { rowSpan, rowStart, colSpan, colStart } = item;
    return {
      gridArea: `${rowStart} / ${colStart} / span ${rowSpan} / span ${colSpan}`,
    };
  };
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
  const hoverItem = (e: MouseEvent, rawData: any) => {
    const elPosition = getElePosition(e.target as HTMLElement);
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
    const up = (ev: MouseEvent) => {
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
        const dom = document.querySelector(
          `.dg-item-${currentPosition.value.id}`
        ) as HTMLElement;
        currentPosition.value = {
          id: currentPosition.value.id,
          ...getElePosition(dom),
        };
      }
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };
  const onResize = (event: MouseEvent) => {
    const startX = event.x;
    const startY = event.y;
    const { left, top, width, height } = currentPosition.value;
    showShadow.value = true;
    const move = (event: MouseEvent) => {
      const diffY = event.y - startY;
      const diffX = event.x - startX;
      const newWidth = parseFloat(width) + diffX;
      const newHeight = parseFloat(height) + diffY;
      currentPosition.value.width = newWidth + "px";
      currentPosition.value.height = newHeight + "px";
    };
    const up = (ev: MouseEvent) => {
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
        const dom = document.querySelector(
          `.dg-item-${currentPosition.value.id}`
        ) as HTMLElement;
        currentPosition.value = {
          id: currentPosition.value.id,
          ...getElePosition(dom),
        };
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
    const rowHeight = gap.value;
    const { left: pLeft, top: pTop } =
      dgLayoutRef.value.getBoundingClientRect();
    const { left, top, width, height } = currentPosition.value;
    return {
      gridArea: position2Grid(
        {
          left: `${parseFloat(left) - pLeft}px`,
          top: `${parseFloat(top) - pTop}px`,
          width,
          height,
        },
        {
          rowHeight,
          colWidth,
        }
      ),
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
      grid-template-rows: repeat(auto-fill, v-bind(gridGap));
      grid-template-columns: repeat(v-bind(columns), 1fr);
      .dg-layout-item-shadow {
        background-color: #ccc;
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
      .resize {
        position: absolute;
        &.right-line {
          top: 0;
          right: 0;
          height: 100%;
          width: 3px;
          background-color: #000;
          cursor: e-resize;
        }
        &.bottom-line {
          bottom: 0;
          left: 0;
          height: 3px;
          width: 100%;
          background-color: #000;
        }
      }
    }
  }
</style>
