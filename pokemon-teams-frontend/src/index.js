const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
//////////////////////////////////////////////////////////
///////////DOM Content Loaded
document.addEventListener("DOMContentLoaded", function() {

//////////////////
///invoke GET fetch
fetchTrainers();


////////////////////////////////////////////
//////GET fetch for trainers w/their pokemon
function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(data => {
        data.forEach(renderTrainers);
    });
}


//////////////////////////////////////////
///////////Render trainers & their pokemon
function renderTrainers(trainer) {
    const trainerContainer = document.getElementById("main-container");
    trainerContainer.insertAdjacentHTML("beforeend",
    `
        <div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
        <button class="new" data-id=${trainer.id}>Add Pokemon</button>
        <ul id="trainer-${trainer.id}">
        
        </ul>
        </div>
    `
    );
    const pokemonContainer = document.getElementById(`trainer-${trainer.id}`);
    trainer.pokemons.forEach(pokemon => {pokemonContainer.insertAdjacentHTML("beforeend",
    `
        <li>${pokemon.nickname} (${pokemon.species}) 
        <button class="release" data-id=${pokemon.id}>
        Release</button></li>
    `
    );
    });
}


let mainContainer = document.querySelector("#main-container")

mainContainer.addEventListener("click", function(e){
    if (e.target.className === "release") {
        e.target.parentNode.remove()
        let id = e.target.dataset.id
        fetch(`http://localhost:3000/pokemons/${id}`, {
        method: 'DELETE'
        })   
    }
})

mainContainer.addEventListener("click", function(e){
    if (e.target.className === "new"){
        console.log(e.target.dataset.id)
        let id = e.target.dataset.id
        fetch("http://localhost:3000/pokemons", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            trainer_id: parseInt(id)
        })
        })
        .then(response => response.json())
        .then(data =>{
        const pokemonContainer = document.getElementById(`trainer-${id}`);
        pokemonContainer.insertAdjacentHTML("beforeend",
        `
        <li>${data.nickname} (${data.species}) 
        <button class="release" data-id=${data.id}>
        Release</button></li>
        `
        )}
        );
    } 
})






//////////////////////////////////
///////// close DOM Content Loaded
});
