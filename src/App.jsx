import { useState } from "react";
import { getPokemonByName } from "./pokeServices";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [wichPokemon, setWichPokemon] = useState("");
  const [foundPokemon, setFoundPokemon] = useState(null);

  const handleSearch = () => {
    console.log("Buscando por:", wichPokemon);

    getPokemonByName(wichPokemon)
      .then((data) => {
        console.log("Pokemon encontrado:", data);
        setFoundPokemon(data);
      })
      .catch((err) => {
        console.error("Erro ao buscar:", err);
        setFoundPokemon(null);
      });
  };

  return (
    <>
      <Header />
      <SearchBar
        setWichPokemon={setWichPokemon}
        handleSearch={handleSearch}
        wichPokemon={wichPokemon}
      />
      <PokemonCard foundPokemon={foundPokemon} />
    </>
  );
}

export default App;
