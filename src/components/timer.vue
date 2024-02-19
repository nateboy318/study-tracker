<template>
  <div class="timer">
    <h1 class="time">{{ formattedTime }}</h1>
    <div class="container">
      <button class="alt-btn" @click="stopStopwatch"><span>Stop</span></button>
      <button class="primary-btn" @click="startStopwatch">
        <span>Start</span>
      </button>
      <button class="alt-btn" @click="resetStopwatch">
        <span>Restart</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const time = ref(0);
const isRunning = ref(false);
let interval;

const formattedTime = computed(() => {
  const hours = Math.floor(time.value / 3600);
  const minutes = Math.floor((time.value % 3600) / 60);
  const seconds = time.value % 60;
  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
});

function padZero(num) {
  return num.toString().padStart(2, "0");
}

function startStopwatch() {
  if (!isRunning.value) {
    isRunning.value = true;
    interval = setInterval(() => {
      time.value++;
    }, 10);
  }
}

function stopStopwatch() {
  clearInterval(interval);
  isRunning.value = false;
}

function resetStopwatch() {
  clearInterval(interval);
  time.value = 0;
  isRunning.value = false;
}
</script>
