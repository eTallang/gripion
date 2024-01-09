<template>
  <div class="border">
    <div
      class="room"
      ref="roomElement"
      :style="{
        'grid-template-rows': `repeat(${gridSize}, 1fr)`,
        'grid-template-columns': `repeat(${gridSize}, 1fr)`,
      }"
    >
      <transition-group name="blocks">
        <block
          v-for="block in blocks"
          :key="block[0]"
          :room-width="roomWidth"
          :row="block[1]"
          :col="block[2]"
        />
      </transition-group>
      <character :room-width="roomWidth" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { state } from "../state";
import Character from "./Character.vue";
import Block from "./Block.vue";

const roomElement = ref<HTMLDivElement>();
const gridSize = computed(() => state.gridSize);
const roomWidth = computed(() => roomElement.value?.clientWidth ?? 0);
const blocks = computed(() => {
  const blockCoords: [string, number, number][] = [];

  state.grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell.startsWith("B")) {
        blockCoords.push([cell, rowIndex, colIndex]);
      }
    });
  });
  return blockCoords.sort((blockA, blockB) =>
    blockA[0].localeCompare(blockB[0])
  );
});
</script>

<style scoped>
.border {
  border: 80px solid #febe2c;
  border-radius: 72px;
  box-shadow: 0 0 20px rgb(0 0 0 / 0.5);
}

.room {
  position: relative;
  display: grid;
  border-radius: 16px;
  aspect-ratio: 1 / 1;
  max-width: 700px;
  min-width: 600px;
  background-color: #9d621e;
  box-shadow: inset 0 0 40px rgb(0 0 0 / 0.2), inset 0 0 10px rgb(0 0 0 / 0.2);
}

.room > * {
  grid-row: 1;
  grid-column: 1;
}

.room::before,
.room::after {
  position: absolute;
  content: "";
  inset: -16px;
  border-radius: 32px;
  border: 16px solid transparent;
}

.room::before {
  --color: #ffe23c;
  border-color: transparent transparent var(--color) var(--color);
}

.room::after {
  --color: #e6980c;
  border-color: var(--color) var(--color) transparent transparent;
}

.blocks-enter-active,
.blocks-leave-active {
  transition: all 0.5s ease;
}
.blocks-enter-from,
.blocks-leave-to {
  opacity: 0;
  scale: 0.3;
}
</style>
