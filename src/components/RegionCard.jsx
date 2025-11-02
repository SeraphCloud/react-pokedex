import { useState, useEffect } from "react";

const RegionCard = ({ foundPokemon }) => {
  const [regionInfo, setRegionInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (foundPokemon) {
      fetchRegionInfo();
    } else {
      setRegionInfo(null);
    }
  }, [foundPokemon]);

  const fetchRegionInfo = async () => {
    setLoading(true);
    try {
      // Get species information
      const speciesResponse = await fetch(foundPokemon.species.url);
      const speciesData = await speciesResponse.json();

      // Get generation information
      const generationResponse = await fetch(speciesData.generation.url);
      const generationData = await generationResponse.json();

      // Extract games from species data
      const games = speciesData.pokedex_numbers?.map(pokedex => {
        // Map generation to games
        switch(speciesData.generation.name) {
          case 'generation-i':
            return 'Red/Blue';
          case 'generation-ii':
            return 'Gold/Silver';
          case 'generation-iii':
            return 'Ruby/Sapphire';
          case 'generation-iv':
            return 'Diamond/Pearl';
          case 'generation-v':
            return 'Black/White';
          case 'generation-vi':
            return 'X/Y';
          case 'generation-vii':
            return 'Sun/Moon';
          case 'generation-viii':
            return 'Sword/Shield';
          case 'generation-ix':
            return 'Scarlet/Violet';
          default:
            return 'Unknown';
        }
      })[0] || 'Unknown';

      setRegionInfo({
        generation: generationData.names?.find(name => name.language.name === 'en')?.name || 'Unknown Generation',
        games: games,
        habitat: speciesData.habitat?.names?.find(name => name.language.name === 'en')?.name || 'Unknown'
      });
    } catch (error) {
      console.error("Error fetching region info:", error);
      setRegionInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const getGenerationDisplay = (generationName) => {
    // Convert "generation-i" to "Generation I"
    if (generationName.includes('generation-')) {
      const romanNumeral = generationName.split('-')[1].toUpperCase();
      return `Generation ${romanNumeral}`;
    }
    return generationName;
  };

  return (
    <div className="card-wrapper mx-auto m-10 w-full h-full">
      <div className="card-content flex flex-col items-center justify-center h-48">
        <h3 className="text-white font-bold text-base mb-3 flex items-center">
          Region <span className="ml-2">📍</span>
        </h3>

        {!foundPokemon ? (
          <p className="text-white text-sm">Search a Pokemon</p>
        ) : loading ? (
          <p className="text-white text-sm">Loading...</p>
        ) : regionInfo ? (
          <div className="text-center space-y-2">
            <div className="text-white">
              <span className="font-bold text-base">
                {getGenerationDisplay(regionInfo.generation)}
              </span>
            </div>
            <div className="text-white text-sm">
              <span>{regionInfo.games}</span>
            </div>
            {regionInfo.habitat !== 'Unknown' && (
              <div className="text-white text-xs italic">
                <span>Habitat: {regionInfo.habitat}</span>
              </div>
            )}
          </div>
        ) : (
          <p className="text-white text-sm">Region info not available</p>
        )}
      </div>
    </div>
  );
};

export default RegionCard;