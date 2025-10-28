import axios from "axios";

export async function catchPokemons() {
  const res = await axios.get("https://pokeapi.co/api/v2/pokemon/");
  return res.data;
}

export async function getPokemonByName(wichPokemon) {
  const res = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${wichPokemon}`
  );
  return res.data;
}
