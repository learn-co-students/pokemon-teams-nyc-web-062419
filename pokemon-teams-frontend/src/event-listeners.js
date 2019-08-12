import { deletePokemon } from "./api-calls.js";

export const attachAllListeners = () => {
  attachClickListener();
};

const attachClickListener = () =>
  document.querySelector("main").addEventListener("click", e => {
    if (e.target.className === "release") {
      const pokeId = e.target.dataset.pokemonId;
      deletePokemon(pokeId);
      e.target.parentNode.remove();
    } else if (e.target.className === "add") {
      const trainerID = e.target.dataset.trainerId;
    }
  });
