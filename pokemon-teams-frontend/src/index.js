const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const whereTheStuffGoes = document.getElementById("whereTheStuffGoes")
let fetchArr;

fetch(TRAINERS_URL)
.then(resp => resp.json())
.then(function(response) {
    fetchArr = response
    response.forEach(addNewTrainer);
  });

function addNewTrainer(trainer){
    const pokemonArr = trainer.pokemons
    const singleInstanceOfPokemon = pokemonArr.map(addPokemon).join("")
    whereTheStuffGoes.insertAdjacentHTML("beforeend", `
    <div class="card" data-id="${trainer.id}">
    <p>${trainer.name}</p>
        <button class="addButton" data-trainer-id="${trainer.id}">Add Pokemon</button>
        <ul>
            ${singleInstanceOfPokemon}
        </ul>
    </div>`)
}
function addPokemon(pokemon) {
    return `<li>${pokemon.species} (${pokemon.nickname}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
}

whereTheStuffGoes.addEventListener('click', function(e){
    if (e.target.className === "release"){
        removePokemon(e.target)
    } else if (e.target.className === "addButton") {
        if (e.target.parentNode.querySelector("ul").children.length < 6) {
            createNewPokemon(e.target)
        } else {
            alert("You cannot train more than 6 Pokemon at a time, please release a Pokemon to train a new one")
        }
    }
})

function removePokemon(pokemon){
    fetch(`${POKEMONS_URL}/${pokemon.dataset.pokemonId}`, {method: 'DELETE'})      
    .then(response => response.json())                                
    .then(response => {                                
    console.log('Deleted:', pokemon.dataset.pokemonId)
    pokemon.parentNode.remove()
    return response                                
    })                                
    .catch(err => console.error(err))                                
}


function createNewPokemon(pokemon) {
    fetch(POKEMONS_URL, 
    {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "trainer_id": `${pokemon.dataset.trainerId}`
        })
    })
        .then(response => response.json())  
        .then(response => {let returnValue = addPokemon(response)
        pokemon.parentNode.querySelector("ul").insertAdjacentHTML("beforeend", returnValue)
        })
}
    
    
    
    
    
console.log("pokemon")