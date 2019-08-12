import { deletePokemon, postPokemon } from "./api-calls.js";
import { postConfig } from "./fetchConfigs.js";

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
      const postObj = { trainer_id: trainerID };
      const config = postConfig(postObj);
      postPokemon(config);
    }
  });
