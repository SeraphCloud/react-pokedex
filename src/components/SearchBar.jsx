const SearchBar = ({
  wichPokemon,
  setWichPokemon,
  handleSearch,
  className,
}) => {
  return (
    // O Form principal
    <form className={`flex items-center my-6 ${className}`}>
      <div className="w-full">
        <input
          className="border-gray-500"
          type="text"
          // 2. O valor é lido do estado "pai"
          value={wichPokemon}
          // 1. A mudança atualiza o estado "pai"
          onChange={(e) => setWichPokemon(e.target.value)}
        />
      </div>

      <button
        onClick={handleSearch}
        type="button"
        className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          class="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="2"
            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
