import { useState, useEffect } from "react";

const AbilitiesCard = ({ foundPokemon }) => {
  const [abilitiesWithDetails, setAbilitiesWithDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (foundPokemon) {
      fetchAbilityDetails();
    } else {
      setAbilitiesWithDetails([]);
    }
  }, [foundPokemon]);

  const fetchAbilityDetails = async () => {
    setLoading(true);
    try {
      const abilitiesPromises = foundPokemon.abilities.map(async (abilityEntry) => {
        const response = await fetch(abilityEntry.ability.url);
        const data = await response.json();

        // Find English flavor text entry
        const flavorText = data.flavor_text_entries?.find(
          entry => entry.language.name === 'en'
        )?.flavor_text || 'No description available';

        return {
          name: abilityEntry.ability.name,
          effect: flavorText.replace(/[\n\f]/g, ' ').slice(0, 60) + (flavorText.length > 60 ? '...' : '')
        };
      });

      const abilities = await Promise.all(abilitiesPromises);
      setAbilitiesWithDetails(abilities.slice(0, 3)); // Limit to 3 abilities
    } catch (error) {
      console.error("Error fetching ability details:", error);
      setAbilitiesWithDetails([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-wrapper mx-auto m-10 w-full h-full">
      <div className="card-content flex flex-col items-center justify-center h-48">
        <h3 className="text-white font-bold text-base mb-3 flex items-center">
          Abilities <span className="ml-2">⭐</span>
        </h3>

        {!foundPokemon ? (
          <p className="text-white text-sm">Search a Pokemon</p>
        ) : loading ? (
          <p className="text-white text-sm">Loading...</p>
        ) : abilitiesWithDetails.length > 0 ? (
          <div className="space-y-2 text-center">
            {abilitiesWithDetails.map((ability) => (
              <div key={ability.name} className="text-white">
                <span className="font-bold capitalize text-sm">
                  {ability.name}
                </span>
                <p className="text-xs italic text-gray-300 mt-1">
                  {ability.effect}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white text-sm">No abilities found</p>
        )}
      </div>
    </div>
  );
};

export default AbilitiesCard;