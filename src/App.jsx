import { useState } from "react";
import { getPokemonByName } from "./pokeServices";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import PokemonCard from "./components/PokemonCard";
import EvolutionCard from "./components/EvolutionCard";
import AbilitiesCard from "./components/AbilitiesCard";
import RegionCard from "./components/RegionCard";

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
      <div className="grid grid-cols-4 gap-4">
        <SearchBar
          className="col-span-4"
          setWichPokemon={setWichPokemon}
          handleSearch={handleSearch}
          wichPokemon={wichPokemon}
        />
        <PokemonCard
          className="col-span-2 row-span-2"
          foundPokemon={foundPokemon}
        />
        <div className="col-span-1 bg-red-900 h-48">Placeholder 1</div>
        <div className="col-span-1 bg-green-900 h-48">Placeholder 2</div>
        <div className="col-span-1 bg-yellow-900 h-48">Placeholder 3</div>
      </div>
    </>
  );
}

export default App;
