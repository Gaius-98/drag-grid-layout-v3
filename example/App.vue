<template>
  <div style="width: 100%; height: 800px">
    <grid-layout :list="list"> </grid-layout>
  </div>
</template>

<script lang="ts" setup>
  import { GridLayout, GridItem } from "../package/index";
  import { reactive, toRefs, ref } from "vue";
  const list = ref([
    {
      key: 1,
      id: 1,
      rowStart: 1,
      colStart: 1,
      rowSpan: 20,
      colSpan: 3,
    },
    {
      key: 1,
      id: 2,
      rowStart: 2,
      colStart: 4,
      rowSpan: 40,
      colSpan: 2,
    },
    {
      key: 1,
      id: 3,
      rowStart: 4,
      colStart: 6,
      rowSpan: 10,
      colSpan: 5,
    },
    {
      key: 1,
      id: 4,
      rowStart: 5,
      colStart: 1,
      rowSpan: 30,
      colSpan: 6,
    },
  ]);
</script>
<style scoped></style>
