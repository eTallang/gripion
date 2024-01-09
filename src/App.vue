<template>
  <div class="centerer">
    <room />
  </div>

  <div style="position: absolute; top: 0; left: 0">
    <div class="mono" v-for="row in grid">
      <span v-for="cell in row">"{{ cell.padEnd(2, "&nbsp; ") }}"</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import Room from "./components/Room.vue";
import { state } from "./state";

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    state.move("down");
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    state.move("up");
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    state.move("left");
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    state.move("right");
  } else if (event.key.toLowerCase() === 'r') {
    state.reset();
  }
};
const grid = computed(() => state.grid);

onMounted(() => {
  document.addEventListener("keydown", onKeyDown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", onKeyDown);
});
</script>

<style scoped>
.centerer {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mono {
  font-family: monospace;
}
</style>
