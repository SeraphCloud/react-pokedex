import { useState, useEffect } from "react";

const EvolutionCard = ({ foundPokemon }) => {
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (foundPokemon) {
      fetchEvolutionChain();
    } else {
      setEvolutionChain(null);
    }
  }, [foundPokemon]);

  const fetchEvolutionChain = async () => {
    setLoading(true);
    try {
      // Get species URL from foundPokemon
      const speciesResponse = await fetch(foundPokemon.species.url);
      const speciesData = await speciesResponse.json();

      // Get evolution chain URL from species data
      const evolutionResponse = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionResponse.json();

      // Extract evolution stages
      const stages = extractEvolutionStages(evolutionData.chain);
      setEvolutionChain(stages);
    } catch (error) {
      console.error("Error fetching evolution chain:", error);
      setEvolutionChain(null);
    } finally {
      setLoading(false);
    }
  };

  const extractEvolutionStages = (chain) => {
    const stages = [];
    let current = chain;

    while (current) {
      stages.push({
        name: current.species.name,
        url: current.species.url
      });
      current = current.evolves_to[0]; // Simple evolution chain
    }

    return stages.slice(0, 3); // Limit to 3 stages
  };

  return (
    <div className="card-wrapper mx-auto m-10 w-full h-full">
      <div className="card-content flex flex-col items-center justify-center h-48">
        <h3 className="text-white font-bold text-base mb-3 flex items-center">
          Evolution <span className="ml-2">→</span>
        </h3>

        {!foundPokemon ? (
          <p className="text-white text-sm">Search a Pokemon</p>
        ) : loading ? (
          <p className="text-white text-sm">Loading...</p>
        ) : evolutionChain && evolutionChain.length > 1 ? (
          <div className="flex items-center space-x-2">
            {evolutionChain.map((stage, index) => (
              <div key={stage.name} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold capitalize">
                    {stage.name.slice(0, 3)}
                  </span>
                </div>
                <span className="text-white text-xs mt-1 capitalize">
                  {stage.name}
                </span>
                {index < evolutionChain.length - 1 && (
                  <span className="text-white text-xs mx-1">→</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white text-sm">No Evolution</p>
        )}
      </div>
    </div>
  );
};

export default EvolutionCard;