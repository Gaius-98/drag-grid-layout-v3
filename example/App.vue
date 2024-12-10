<template>
  <div style="width: 100%; height: 800px">
    <grid-layout :list="list">
      <template #layout-item="{ item }">
        <div
          :style="{
            backgroundColor: item.extra.color,
            width: '100%',
            height: '100%',
          }">
          {{ item }}
        </div>
      </template>
    </grid-layout>
  </div>
  <div class="text">
    {{ list }}
  </div>
</template>

<script lang="ts" setup>
  import { GridLayout } from "../package/index";

  import { ref } from "vue";
  const list = ref([
    {
      key: 1,
      id: 1,
      rowStart: 1,
      colStart: 1,
      rowSpan: 20,
      colSpan: 3,
      extra: {
        color: "red",
      },
    },
    {
      key: 1,
      id: 2,
      rowStart: 2,
      colStart: 4,
      rowSpan: 40,
      colSpan: 2,
      extra: {
        color: "blue",
      },
    },
    {
      key: 1,
      id: 3,
      rowStart: 4,
      colStart: 6,
      rowSpan: 10,
      colSpan: 5,
      extra: {
        color: "pink",
      },
    },
    {
      key: 1,
      id: 4,
      rowStart: 5,
      colStart: 1,
      rowSpan: 30,
      colSpan: 6,
      extra: {
        color: "green",
      },
    },
  ]);
</script>
<style scoped></style>
