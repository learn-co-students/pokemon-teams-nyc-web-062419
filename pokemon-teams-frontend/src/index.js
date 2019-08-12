const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


function loadTrainers() {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(data => data.forEach(printTrainer))
}

function printTrainer(trainer) {
    const mainDiv = document.getElementById('main')

    mainDiv.insertAdjacentHTML('beforeend', `
        <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
            <button class="add" data-trainer-id="${trainer.id}">Add Pokemon</button>
                <ul id="trainer-list-${trainer.id}"></ul>
        </div>
    `)

    trainer.pokemons.forEach( pokemon => printPokemon(pokemon, trainer.id))
}

function printPokemon (pokemon, trainerId) {
    const trainerList = document.getElementById(`trainer-list-${trainerId}`)

    trainerList.insertAdjacentHTML('beforeend', 
    `<li data-pokemon-id="${pokemon.id}">${pokemon.nickname} (${pokemon.species}) <button class="release" data-trainer-id="${trainerId}" data-pokemon-id="${pokemon.id}">Release</button></li>`)
}

function unprintPokemon(pokemonId, trainerId) {
    const trainerList = document.getElementById(`trainer-list-${trainerId}`)

    for (let i=0; i< trainerList.children.length; i++) {
        if (parseInt(trainerList.children[i].dataset.pokemonId) === pokemonId) {
            trainerList.children[i].remove()
        }
    }   
}

function addPokemonToTrainer (trainerId) {
    const numberOfPokemon = document.getElementById(`trainer-list-${trainerId}`).children.length
    
    if (numberOfPokemon < 6) {
        const config = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({"trainer_id": trainerId})
        }
        fetch(POKEMONS_URL, config)
        .then( response => response.json())
        .then( data => {
            if (data.error) {
                console.log(data.error)
            } else {
                printPokemon (data, data.trainer_id)
            }
        })
    }
}

function releasePokemon (pokemonId) {
    fetch(`${POKEMONS_URL}/${pokemonId}`, {method: "DELETE"})
    .then( response => response.json())
    .then( data => {
        if (data.error) {
            console.log(data.error)
        } else {
            unprintPokemon(data.id, data.trainer_id)
        }
    })
}

document.addEventListener("DOMContentLoaded", ()=>{
    loadTrainers()

    document.addEventListener("click", (event) => {
        if (event.target.className === "add") {
            addPokemonToTrainer(event.target.dataset.trainerId)
        } else if (event.target.className === "release") {
            releasePokemon (event.target.dataset.pokemonId)
        }
    })
})