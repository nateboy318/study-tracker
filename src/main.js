import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// Import the worker script// Create a new instance of the Worker class with the URL of the Web Worker script
const worker = new Worker(new URL("./components/worker.js", import.meta.url));
createApp(App).mount("#app");
