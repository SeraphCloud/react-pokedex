const PokemonCard = ({ foundPokemon }) => {
  return (
    <>
      <div className="flex items-center justify-center">
        {foundPokemon ? (
          // O card principal quando o Pokémon é encontrado
          <div>
            <img
              src={foundPokemon.sprites.front_default}
              alt={foundPokemon.name}
            />
            <h2>Nome: {foundPokemon.name}</h2>
            <p>ID: {foundPokemon.id}</p>
            <p>Altura: {foundPokemon.height}</p>

            {/* O <h3> fica fora do .map() */}
            <h3>Habilidades:</h3>
            {foundPokemon.abilities.map((abilityEntry) => (
              // Usamos o nome da habilidade como key
              <p key={abilityEntry.ability.name}>{abilityEntry.ability.name}</p>
            ))}
          </div>
        ) : (
          // Mensagem padrão se nada foi encontrado
          <p>Pokemon não encontrado</p>
        )}
      </div>
    </>
  );
};

export default PokemonCard;
