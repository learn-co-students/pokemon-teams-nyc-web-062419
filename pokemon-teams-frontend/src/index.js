const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainBody = document.body.querySelector("main")


fetch (TRAINERS_URL)
.then (function (response) { return response.json();})
.then (function (json) {
    json.forEach(function (trainer){
        const node = document.createElement("div")
        const pokemons = []
        trainer.pokemons.forEach(function (pokemon){
            pokemons.push(`<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`)})
        const html = `<p>${trainer.name}</p>
        <button type="submit" data-trainer-id="${trainer.id}">Add Pokemon</button>
        <ul>
            ${pokemons.join("")}
        </ul>`
        node.innerHTML = html
        node.setAttribute('class', 'card')
        node.setAttribute('id', `${trainer.id}`) 
        mainBody.appendChild(node)
    })
})

mainBody.addEventListener("click", function (e) {
    if (e.target.innerHTML === "Add Pokemon"){
        data = {trainer_id: e.target.dataset.trainerId}
        fetch (POKEMONS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) { 
        const node = document.createElement("LI")
        const pokemon = data
        node.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button`
        e.target.parentElement.lastChild.appendChild(node)})
    }
    

} )

function drawCards () {
    mainBody.innerHTML = ''
    fetch (TRAINERS_URL)
    .then (function (response) { return response.json();})
    .then (function (json) {
            json.forEach(function (trainer){
            const node = document.createElement("div")
            const pokemons = []
            trainer.pokemons.forEach(function (pokemon){
                pokemons.push(`<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`)})
            const html = `<p>${trainer.name}</p>
            <button type="submit" data-trainer-id="${trainer.id}">Add Pokemon</button>
            <ul>
                ${pokemons.join("")}
            </ul>`
            node.innerHTML = html
            node.setAttribute('class', 'card')
            node.setAttribute('id', `${trainer.id}`) 
            mainBody.appendChild(node)
        })
    })
}

mainBody.addEventListener("click", function (e) {
    if (e.target.className === "release") {
        fetch (`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, {
            method: 'DELETE'
        })
        .then(function(response) {
            return response.json();
        })
        .then(data => console.log(JSON.stringify(data)))
        console.log(e.target.parentElement)
        e.target.parentElement.remove()
    }

} )