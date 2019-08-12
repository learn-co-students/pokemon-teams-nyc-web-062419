import { trainerCard, pokeLine } from "./templates.js";
import { deleteConfig } from "./fetchConfigs.js";

const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

export const getTrainers = () =>
  fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => renderTrainers(json));

const renderTrainers = json =>
  json.forEach(trainer => {
    const card = trainerCard(trainer);
    document.querySelector("main").innerHTML += card;
  });

export const deletePokemon = id =>
  fetch(`${BASE_URL}/pokemons/${id}`, deleteConfig());

export const postPokemon = config =>
  fetch(POKEMONS_URL, config)
    .then(resp => resp.json())
    .then(
      json =>
        (document.getElementById(`t${json.trainer_id}`).innerHTML += pokeLine(
          json
        ))
    );
