<template>
  <div style="width: 1200px; height: 600px">
    <grid-layout :list="list"> </grid-layout>
  </div>
</template>

<script lang="ts" setup>
  import { GridLayout, GridItem } from "../package/index";
  import { reactive, toRefs, ref } from "vue";
  const list = ref([
    {
      key: 1,
      id: 12,
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
  ]);
</script>
<style scoped></style>
