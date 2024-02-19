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
let worker;

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
    worker.postMessage("start");
  }
}

function stopStopwatch() {
  isRunning.value = false;
  worker.postMessage("stop");
}

function resetStopwatch() {
  time.value = 0;
  isRunning.value = false;
}

// Create a new Web Worker
worker = new Worker(new URL("./worker.js", import.meta.url));

// Listen for messages from the Web Worker
worker.onmessage = function (event) {
  time.value = event.data;
};
</script>
