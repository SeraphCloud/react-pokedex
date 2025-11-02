const PokemonCard = ({ foundPokemon }) => {
  return (
    <div className="card-wrapper mx-auto m-10 w-full h-full">
      <div className="card-content">
        {foundPokemon ? (
          // O card principal quando o Pokémon é encontrado
          <div className="flex flex-col items-center mx-auto">
            <img
              className="p-6"
              src={foundPokemon.sprites.front_default
                .replace(
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/", // Procuramos a base do domínio antigo
                  "https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/versions/generation-v/black-white/animated/shiny/" // E trocamos pela base do CDN
                )
                .replace(".png", ".gif")}
              alt={foundPokemon.name}
            />
            <h2 className="text-xl font-bold capitalize text-white">
              {foundPokemon.name}
            </h2>
            <p className="text-white">ID: {foundPokemon.id}</p>
            <p className="text-white">Altura: {foundPokemon.height}</p>

            {/* O <h3> fica fora do .map() */}
            <h3 className="font-semibold mt-2 text-white">Habilidades:</h3>
            {foundPokemon.abilities.map((abilityEntry) => (
              // Usamos o nome da habilidade como key
              <p
                key={abilityEntry.ability.name}
                className="capitalize text-white"
              >
                {abilityEntry.ability.name}
              </p>
            ))}
          </div>
        ) : (
          // Mensagem padrão se nada foi encontrado
          <p className="p-4">Pokemon não encontrado</p>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
