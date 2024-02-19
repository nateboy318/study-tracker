// worker.js

let time = 0;
let isRunning = false;
let interval;

self.onmessage = function (event) {
  if (event.data === "start") {
    startTimer();
  } else if (event.data === "stop") {
    stopTimer();
  }
};

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    interval = setInterval(() => {
      time++;
      postMessage(time);
    }, 10);
  }
}

function stopTimer() {
  clearInterval(interval);
  isRunning = false;
}
