document.addEventListener("DOMContentLoaded", function () {
  const BASE_URL = "http://localhost:3000";
  const TRAINERS_URL = `${BASE_URL}/trainers`;
  const POKEMONS_URL = `${BASE_URL}/pokemons`;

  const mainContainer = document.querySelector("main")

  getTrainers()


  function getTrainers() {
    fetch(`${TRAINERS_URL}`)
      .then(resp => resp.json())
      .then(trainers => {
        console.log(trainers)
        renderTrainer(trainers)

      })
  }

  function renderTrainer(trainers) {
    trainers.forEach(trainer => {
      mainContainer.insertAdjacentHTML("beforeend", `
      <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
      <button data-trainer-id="${trainer.id}" class="addButton">Add Pokemon</button>
      <ul id=trainer-${trainer.id}>
      </ul>
      </div>
      `)
      const pokemonList = document.getElementById(`trainer-${trainer.id}`);
      trainer.pokemons.forEach(pokemon => {
        pokemonList.insertAdjacentHTML("beforeend", `
        <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>
        `)
      })
    });
  }

  mainContainer.addEventListener("click", function (event) {
    if (event.target.className === "addButton") {
      console.log(event.target.parentNode.querySelector('ul'))
      const listLength = event.target.parentNode.querySelectorAll('ul li').length
      const listTag = event.target.parentNode.querySelector('ul')
      const trainerIdNumber = parseInt(event.target.dataset.trainerId);
      if (listLength < 6) {
        fetch(`${POKEMONS_URL}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              trainer_id: trainerIdNumber
            })
          })
          .then(resp => resp.json())
          .then(newPokemon => {
            console.log(newPokemon)
            listTag.insertAdjacentHTML("beforeend", `
            <li>${newPokemon.nickname} (${newPokemon.species}) <button class="release" data-pokemon-id="${newPokemon.id}">Release</button></li>
            `)
          })
      } else {
        alert('Too many cooks!')
      }
    } else if (event.target.className === "release") {
      console.log("bye bye")
      console.log(event.target.dataset.pokemonId)
      let pokemonId = event.target.dataset.pokemonId
      console.log(event.target.parentNode)
      event.target.parentNode.remove()
      fetch(`${POKEMONS_URL}/${pokemonId}`, {
        method: "DELETE"
      })
    }
  })
});