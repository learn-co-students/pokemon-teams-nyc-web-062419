const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const trainerContainer = document.querySelector("main")

function getTrainers() {
  fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(function(json) {
      renderAllTrainers(json)
    })
}

function addPokemon(trainerId) {
  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      trainer_id: trainerId
    })
  })
    .then(resp => resp.json())
    .then(function(pokemon) {
      placePokemon(pokemon)
    })
}

function deletePokemon(pokeId, button) {
  fetch(`${POKEMONS_URL}/${pokeId}`, {
    method: "DELETE"
  })
    //prettier-ignore
    .then(resp => resp)
    .then(resp => releasePokemon(button))
}

function renderAllTrainers(trainers) {
  trainers.forEach(trainer => {
    renderTrainer(trainer)
  })
}

function renderTrainer(trainer) {
  const container = document.querySelector("main")
  let trainerCard = document.createElement("div")
  trainerCard.className = "card"
  trainerCard.dataset.trainerId = trainer.id
  trainerCard.innerHTML = `
  <p>${trainer.name}</p>
  <button class='add' data-trainer-id='${trainer.id}'>Add Pokemon</button>
  <ul>
  ${getTrainersPokemon(trainer)}
  </ul>
  `
  container.append(trainerCard)
}

function getTrainersPokemon(trainer) {
  let lis = ``
  trainer.pokemons.forEach(pokemon => {
    const pokemonLi = makePokemonLi(pokemon)
    lis += pokemonLi
  })

  return lis
}

function makePokemonLi(pokemon) {
  //prettier-ignore
  return `<li id='pokemon-id-${pokemon.id}'>${pokemon.nickname} (${pokemon.species}) <button class='release' data-pokemon-id='${pokemon.id}'>Fainted</button></li>\n`
}

function buttonClicked(button) {
  if (button.className === "add") {
    const trainerId = button.dataset.trainerId
    addPokemon(trainerId)
  }
  if (button.className === "release") {
    const pokeId = button.dataset.pokemonId
    deletePokemon(pokeId, button)
  }
}

function releasePokemon(button) {
  button.parentElement.remove()
}

function placePokemon(pokemon) {
  if (pokemon.error == "Party is Full!") {
    alert(
      "Sorry. Your party is full.\nPlease release a Pokemon before trying to add a new one."
    )
  } else {
    const allTrainerCards = document.querySelectorAll("div.card")
    let correctTrainer
    allTrainerCards.forEach(trainer => {
      if (trainer.dataset.trainerId == pokemon.trainer_id) {
        correctTrainer = trainer
      }
    })
    correctTrainer.children[2].innerHTML += makePokemonLi(pokemon)
  }
}

getTrainers()
trainerContainer.addEventListener("click", function(e) {
  buttonClicked(e.target)
})
