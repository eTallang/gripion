<template>
  <div
    class="character"
    :style="{ top: `${top}px`, left: `${left}px` }"
    :class="[direction, squeeze]"
    @animationend="squeeze = null"
  ></div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { state } from "../state";
import { gridToPx } from "../gridToPx";

const props = defineProps<{
  roomWidth: number;
}>();

const direction = computed(() => state.direction);
const squeeze = ref<"horizontal" | "vertical" | null>(null);
const top = computed(() =>
  gridToPx(props.roomWidth, state.gridSize, state.row())
);
const left = computed(() =>
  gridToPx(props.roomWidth, state.gridSize, state.col())
);

watch(
  [top, left],
  () => {
    if (["up", "down"].includes(direction.value)) {
      squeeze.value = "horizontal";
    } else {
      squeeze.value = "vertical";
    }
  },
  {}
);
</script>

<style scoped>
.character {
  --shadow-color: rgb(0 0 0 / 0.7);
  --shadow-width: 3px;
  position: relative;
  border-radius: 16px;
  background-color: #e71d75;
  border: 0px solid var(--shadow-color);
  border-width: var(--shadow-width) 0 0 var(--shadow-width);
  transition: all 150ms cubic-bezier(0.54, 0.03, 0.16, 0.96) 50ms;
  animation: posture 1.7s ease infinite alternate;
}

.character::before,
.character::after {
  content: "";
  top: 30%;
  position: absolute;
  width: 10px;
  height: 16px;
  background-color: var(--shadow-color);
  border-radius: 4px;
  transition: all 200ms ease;
  animation: blink 12s linear infinite;
}

.character {
  &::before {
    right: 60%;
  }

  &::after {
    right: 20%;
  }
}

.character.left {
  &::before {
    right: 70%;
  }

  &::after {
    right: 30%;
  }
}

.character.up {
  &::before {
    top: 20%;
  }

  &::after {
    top: 20%;
  }
}

.character.down {
  &::before {
    top: 40%;
  }

  &::after {
    top: 40%;
  }
}

.horizontal {
  animation: horizontal-squeeze 200ms;
}

.vertical {
  animation: vertical-squeeze 200ms;
}

@keyframes horizontal-squeeze {
  50% {
    scale: 0.8 1.1;
  }

  80% {
    scale: 1.1 0.8;
  }

  100% {
    scale: 1;
  }
}

@keyframes vertical-squeeze {
  50% {
    scale: 1.1 0.8;
  }

  80% {
    scale: 0.8 1.1;
  }

  100% {
    scale: 1;
  }
}

@keyframes posture {
  from {
    scale: 0.92 1.02;
  }

  to {
    scale: 1.02 0.92;
  }
}

@keyframes blink {
  0% {
    scale: 1 1;
  }

  0.3% {
    scale: 1 0;
  }

  0.6% {
    scale: 1 1;
  }
}
</style>
