<template>
  <div class="dg-layout" ref="dgLayoutRef">
    <div class="dg-layout-content">
      <div
        class="dg-layout-item"
        v-for="item in list"
        :key="item.key"
        :style="getItemStyle(item)"
        @mouseover="hoverItem($event, item)">
        <slot>
          <div style="width: 100%; height: 100%">
            {{ item }}
          </div>
        </slot>
      </div>
      <div
        class="dg-layout-item-shadow"
        v-show="showShadow"
        :style="getShadowStyle"></div>
    </div>
    <div class="dg-layout-indicator">
      <div v-for="item in columns" :key="item"></div>
    </div>
    <div
      class="dg-layout-vnode"
      :style="getVnodeStyle"
      ref="dgLayoutVnode"
      @mousedown="onDrag($event)"></div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, toRefs, ref, computed, StyleValue } from "vue";
  import { getElePosition, position2Grid, compileGridInfo } from "../utils";
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
    return `0 ${gap.value}px`;
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
    return {
      width,
      height,
      top,
      left,
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
  const showShadow = ref(true);
  const onDrag = (event: MouseEvent) => {
    const startX = event.x;
    const startY = event.y;
    const { top, left, width, height } =
      dgLayoutVnode.value.getBoundingClientRect();
    let newLeft = left;
    let newTop = top;
    showShadow.value = true;
    const move = (event: MouseEvent) => {
      const diffY = event.y - startY;
      const diffX = event.x - startX;
      newLeft = left + diffX;
      newTop = top + diffY;

      currentPosition.value.left = newLeft + "px";
      currentPosition.value.top = newTop + "px";
    };
    const up = () => {
      showShadow.value = false;
      if (getShadowStyle.value?.gridArea) {
        const { rowSpan, rowStart, colSpan, colStart } = compileGridInfo(
          getShadowStyle.value?.gridArea
        );
        let idx = list.value.findIndex((e) => e.id == currentPosition.value.id);
        if (idx != -1) {
          list.value[idx].rowSpan = rowSpan;
          list.value[idx].rowStart = rowStart;
          list.value[idx].colSpan = colSpan;
          list.value[idx].colStart = colStart;
        }
      }
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  const getShadowStyle = computed(() => {
    if (!dgLayoutRef.value) return;
    const { width: pWidth } = getElePosition(dgLayoutRef.value);
    const colWidth = parseInt(pWidth) / columns.value;
    const rowHeight = gap.value;
    return {
      gridArea: position2Grid(currentPosition.value, {
        rowHeight,
        colWidth,
      }),
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
      gap: v-bind(gridGap);
      grid-template-rows: repeat(auto-fill, v-bind(gap) + "px");
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
    }
  }
</style>
