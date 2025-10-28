const SearchBar = ({ wichPokemon, setWichPokemon, handleSearch }) => {
  return (
    <div className="flex justify-center align-center">
      <input
        className="border-gray-500"
        type="text"
        // 2. O valor é lido do estado "pai"
        value={wichPokemon}
        // 1. A mudança atualiza o estado "pai"
        onChange={(e) => setWichPokemon(e.target.value)}
      />
      <button onClick={handleSearch} type="button" className="bg-gray-500">
        Pesquisar
      </button>
    </div>
  );
};

export default SearchBar;
