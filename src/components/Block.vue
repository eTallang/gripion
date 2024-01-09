<template>
  <div class="block" :style="{ top: `${top}px`, left: `${left}px` }"></div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { gridToPx } from "../gridToPx";
import { state } from "../state";

const props = defineProps<{
  roomWidth: number;
  row: number;
  col: number;
}>();

const top = computed(() =>
  gridToPx(props.roomWidth, state.gridSize, props.row)
);
const left = computed(() =>
  gridToPx(props.roomWidth, state.gridSize, props.col)
);
</script>

<style scoped>
.block {
  --color: #6747b1;
  position: relative;
  background-color: var(--color);
  border: 8px solid color-mix(in oklab, var(--color), white 40%);
  border-radius: 16px;
  transition: all 150ms cubic-bezier(0.54, 0.03, 0.16, 0.96) 50ms;
}
</style>
