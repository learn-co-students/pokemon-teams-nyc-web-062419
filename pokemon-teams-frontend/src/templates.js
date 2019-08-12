export const trainerCard = trainerObj => {
  let list = ``;
  trainerObj.pokemons.forEach(
    p =>
      (list += `<li>${p.nickname} (${
        p.species
      })<button class="release" data-pokemon-id=${p.id}>Release</button></li>`)
  );

  return `<div class="card">
    <p>${trainerObj.name}</p>
    <button class="add" data-trainer-id=${trainerObj.id}>Add Pokemon</button>
    <ul id="t${trainerObj.id}">
    ${list}
    </ul>
    </div>`;
};

export const pokeLine = p =>
  `<li>${p.nickname} (${p.species})<button class="release" data-pokemon-id=${
    p.id
  }>Release</button></li> `;
