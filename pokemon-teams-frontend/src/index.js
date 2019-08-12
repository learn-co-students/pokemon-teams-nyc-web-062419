const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
const trainerCards = document.querySelector("main");

document.addEventListener("DOMContentLoaded", event => {
  fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(data => {
      data.forEach(trainerCardTemplate);
    });
});

function trainerCardTemplate(trainer) {
  trainerCards.insertAdjacentHTML(
    "beforeend",
    `
  <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
  <button data-trainer-id="${trainer.id}">Add Pokemon</button>
  <ul>
    ${renderPokemon(trainer)}
  </ul>
  `
  );
}

function renderPokemon(trainer) {
  return trainer.pokemons.map(pokemonTemplate).join("");
}

trainerCards.addEventListener("click", e => {
  if (e.target.nodeName === "BUTTON" && e.target.innerText === "Add Pokemon") {
    console.log("clicked");
    addPokemon(e.target);
  } else if (
    e.target.nodeName === "BUTTON" &&
    e.target.innerText === "Release"
  ) {
    debugger;
    removePokemon(e.target, e.target);
  }
});

function addPokemon(trainer) {
  fetch(POKEMONS_URL, {
    method: "POST",
    body: JSON.stringify({ trainer_id: `${trainer.dataset.trainerId}` }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(resp => resp.json())
    .then(data => {
      addNewPokemon(findPokemonList(data), data);
    });
}

function pokemonTemplate(pokemon) {
  return `<li>${pokemon.nickname} (${
    pokemon.species
  }) <button class="release" data-pokemon-id="${
    pokemon.id
  }">Release</button></li>`;
}

function findPokemonList(pokemon) {
  return trainerCards
    .querySelector(`[data-id="${pokemon.trainer_id}"]`)
    .querySelector("ul");
}

function addNewPokemon(trainer, pokemon) {
  trainer.insertAdjacentHTML("beforeend", pokemonTemplate(pokemon));
}

function removePokemon(pokemon) {
  fetch(`http://localhost:3000/pokemons/${pokemon.dataset.pokemonId}`, {
    method: "DELETE",
    body: JSON.stringify(),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(resp => resp.json())
    .then(data => {
      renderRemovedPokemon(findPokemonList(data), data);
    });
}

function renderRemovedPokemon(pokemonList, pokemon) {
  pokemonList
    .querySelector(`[data-pokemon-id="${pokemon.id}"]`)
    .parentElement.remove();
}
