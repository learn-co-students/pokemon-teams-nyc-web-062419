import { getTrainers } from "./api-calls.js";
import { attachAllListeners } from "./event-listeners.js";

window.addEventListener("DOMContentLoaded", e => {
  getTrainers();
  attachAllListeners();
});
